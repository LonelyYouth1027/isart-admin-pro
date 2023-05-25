<template>
  <div class="container">
    <Breadcrumb :items="['menu.demo', 'menu.demo.responsive']" />
    <a-card class="general-card" :title="$t('menu.demo.responsive')">
      <template #extra>
        <a-button type="primary" @click="handleCheckout">
          {{ show ? '切换到布局1' : '切换到布局2' }}
        </a-button>
      </template>
      <search-form
        v-if="!show"
        :search-form-config="searchFormConfig"
      ></search-form>
      <responsive-form
        v-else
        :search-form-config="searchFormConfig"
      ></responsive-form>
      <a-divider style="margin-top: 0" />
      <a-row>
        <a-col :flex="1">
          <a-space>
            <a-button type="primary" @click="handleClick">
              <template #icon>
                <icon-plus />
              </template>
              <template #default>新建</template>
            </a-button>
            <a-tooltip content="刷新" mini>
              <a-button type="text" shape="circle">
                <icon-refresh :size="20" @click="handleGetData" />
              </a-button>
            </a-tooltip>
            <a-tooltip content="密度" mini>
              <a-dropdown @select="handleSelect">
                <a-button type="text" shape="circle">
                  <icon-shrink :size="20" />
                </a-button>
                <template #content>
                  <a-doption value="default"> 默认 </a-doption>
                  <a-doption value="medium"> 中等 </a-doption>
                  <a-doption value="large"> 大号 </a-doption>
                </template>
              </a-dropdown>
            </a-tooltip>
            <a-tooltip content="列设置" mini>
              <a-dropdown>
                <a-button type="text" shape="circle">
                  <icon-settings :size="20" />
                </a-button>
                <template #content>
                  <a-space fill style="justify-content: space-around">
                    <a-checkbox
                      v-model="checkAll"
                      :indeterminate="indeterminate"
                      @change="handleChangeAll"
                      >全选</a-checkbox
                    >
                    <a-button type="text" @click="handleChangeReset"
                      >重置</a-button
                    >
                  </a-space>
                  <a-divider style="margin: 10px 0 !important" />
                  <a-row style="width: 200px" justify="center">
                    <a-col
                      v-for="item in columns"
                      :key="item.dataIndex"
                      :span="13"
                      style="height: 20px"
                    >
                      <a-checkbox v-model="item.show">{{
                        item.title
                      }}</a-checkbox>
                    </a-col>
                  </a-row>
                </template>
              </a-dropdown>
            </a-tooltip>
          </a-space>
        </a-col>
      </a-row>
      <a-row v-show="selectedKeys.length > 0" class="m-t-25">
        <a-col :flex="1">
          <a-alert>
            已选择 {{ selectedKeys.length }} 项
            <template #action>
              <a-button
                size="small"
                type="text"
                @click="selectedKeys.length = 0"
                >取消选择</a-button
              >
            </template>
          </a-alert>
        </a-col>
      </a-row>
      <a-table
        v-model:selectedKeys="selectedKeys"
        row-key="id"
        :columns="columnsFilter"
        :data="data"
        :row-selection="rowSelection"
        :loading="loading"
        :pagination="pagination"
        column-resizable
        style="margin-top: 20px"
        :bordered="true"
        @page-change="handlePage"
        @page-size-change="handlePageSize"
      >
        <template #type="{ record }">
          <a-tag v-if="record.type === 0">不填</a-tag>
          <a-tag v-if="record.type === 1">填</a-tag>
        </template>
        <template #generalState="{ record }">
          <a-tag v-if="record.generalState">是</a-tag>
          <a-tag v-else>否</a-tag>
        </template>
        <template #status="{ record }">
          <a-badge v-if="record.status === '1'" status="success" text="有效" />
          <a-badge v-if="record.status === '0'" status="danger" text="无效" />
        </template>
        <template #operation="{ record }">
          <a-button type="text" size="small" @click="handleEdit(record)">
            编辑
          </a-button>
          <a-popconfirm
            :content="record.status === '1' ? '是否禁用?' : '是否启用?'"
            @ok="handleSetStatus(record)"
          >
            <a-button type="text" size="small">
              {{ record.status === '1' ? '禁用' : '启用' }}
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
    <drawer-form
      :drawer-form-config="drawerFormConfig"
      :title="formModel.id ? '编辑' : '新建'"
      @handle-reset="handleReset"
    >
    </drawer-form>
    <div v-show="selectedKeys.length > 0" class="actions">
      <a-row style="background: var(--color-bg-2); height: 100%" align="center">
        <a-col :span="12" style="color: var(--color-text-1)">
          已选择
          <span style="color: rgb(var(--arcoblue-6))">{{
            selectedKeys.length
          }}</span>
          项
        </a-col>
        <a-col :span="12">
          <a-space fill style="justify-content: end">
            <a-button> 批量删除 </a-button>
            <a-button type="primary"> 批量审批 </a-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from 'vue';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import SearchForm from '@/components/pro/responsive/search-form.vue';
  import DrawerForm from '@/components/pro/drawer-form/index.vue';
  import { DrawerFormConfig, SearchFormConfig } from '@/types/proComponents';
  import controlObj from '@/utils/control-obj';
  import { Notification } from '@arco-design/web-vue';
  import ResponsiveForm from './components/responsive-form.vue';
  import {
    columns,
    formSearch,
    formModel,
    data,
    formItems,
    modalFormItems,
    getInitColumns,
  } from './config';

  // 过滤之后的columns
  const columnsFilter = computed(() => {
    return columns.value.filter((item: any) => item.show);
  });

  // 是否为半选状态
  const indeterminate = computed(() => {
    return (
      columnsFilter.value.length !== 0 &&
      columnsFilter.value.length !== columns.value.length
    );
  });

  // 是否为全选状态
  const checkAll = computed(() => {
    return columnsFilter.value.length === columns.value.length;
  });

  /**
   * 改变全选列
   * @param value
   */
  const handleChangeAll = (value: any) => {
    if (value) {
      columns.value.map((item: any) => {
        item.show = true;
        return item;
      });
    } else {
      columns.value.map((item: any) => {
        item.show = false;
        return item;
      });
    }
  };
  /**
   * 重置全选列
   */
  const handleChangeReset = () => {
    columns.value.map((item: any) => {
      item.show = true;
      return item;
    });
  };

  const { loading, setLoading } = useLoading(false); // 表格loading
  const show = ref<boolean>(false);
  const drawerFormConfig = reactive<DrawerFormConfig>({
    visible: false,
    footer: false,
    width: '1100px',
    formItems: modalFormItems,
    formModel,
  });
  const searchFormConfig = reactive<SearchFormConfig>({
    formItems,
    formModel: formSearch,
    labelColProps: {
      span: 6,
    },
    wrapperColProps: {
      span: 18,
    },
    labelAlign: 'left',
  });
  // 分页控件
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
    total: 100,
  };
  // 分页器
  const pagination = reactive({
    ...basePagination,
    showTotal: true,
    showJumper: true,
    showPageSize: true,
    pageSizeOptions: [10, 20, 30, 40, 50],
  });

  const selectedKeys = ref([]); // 选中的数组

  // 多选控件
  const rowSelection: any = reactive({
    type: 'checkbox',
    showCheckedAll: true,
  });
  // 设置表格滚动
  // const scrollbar = ref(true);
  // 表格滚动参数
  // const scroll = {
  //   x: 0,
  //   y: 430,
  // };
  /**
   * 获取数据  todo 要把搜索参数带上
   */
  const handleGetData = async (params: any = {}) => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 1000);
    console.log(params);
  };

  /**
   * 分页获取数据
   * @param page 当前页
   */
  const handlePage = (page: number) => {
    pagination.current = page;
    handleGetData();
  };

  /**
   * 更改每页条数
   * @param pageSize 当前条数
   */
  const handlePageSize = (pageSize: number) => {
    pagination.pageSize = pageSize;
    handleGetData();
  };

  // 打开modal框
  const handleClick = () => {
    drawerFormConfig.visible = true;
  };

  // 编辑表单
  const handleEdit = (row: any) => {
    controlObj(drawerFormConfig.formModel, row);
    drawerFormConfig.visible = true;
  };

  // 禁用启用
  const handleSetStatus = async (row: any) => {
    console.log(row);
  };

  const handleReset = () => {
    formModel.id = null;
  };

  const handleCheckout = () => {
    show.value = !show.value;
    Notification.info({
      title: show.value ? '布局2' : '布局1',
      content: '布局1和布局2的区别就在于按钮位置不同',
    });
  };

  const handleSelect = (val: any) => {
    switch (val) {
      case 'default':
        columns.value = getInitColumns();
        break;
      case 'medium':
        columns.value = getInitColumns().map((item: any) => {
          item.width += 20;
          item.cellStyle = { height: '50px' };
          return item;
        });
        break;
      case 'large':
        columns.value = getInitColumns().map((item: any) => {
          item.width += 50;
          item.cellStyle = { height: '80px' };
          return item;
        });
        break;
      default:
        columns.value = getInitColumns();
        break;
    }
  };

  /**
   * 动态控制底部操作栏宽度
   */
  const handleActionsWidth = () => {
    const menuHtml: any = document.getElementsByClassName('arco-menu-inner')[0];
    const actionsHtml: any = document.getElementsByClassName('actions')[0];
    const callback = (mutations: any) => {
      mutations.forEach((item: any) => {
        const additionalWidth = item.contentRect.width > 200 ? 5 : 1;
        const menuWidth: number =
          item.contentRect.x +
          item.contentRect.y +
          item.contentRect.width +
          additionalWidth;
        actionsHtml.style.width = `calc(100% - ${menuWidth}px)`;
        // actionsHtml.style.left = `${menuWidth}px)`;
      });
    };
    const observer = new ResizeObserver(callback);
    observer.observe(menuHtml);
  };

  onMounted(() => {
    handleGetData();
    handleActionsWidth();
  });
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px;
  }

  :deep(.arco-table-container) {
    min-height: 430px !important;
  }

  .actions {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 60px;
    padding: 0 20px;
    //text-align: right;
    background: var(--color-bg-2);
    z-index: 999;
    box-shadow: 0 -6px 16px -8px rgba(0, 0, 0, 0.08),
      0 -9px 28px 0 rgba(0, 0, 0, 0.05), 0 -12px 48px 16px rgba(0, 0, 0, 0.03);
  }
</style>
