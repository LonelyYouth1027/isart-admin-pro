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
          <a-button type="primary" @click="handleClick">
            <template #icon>
              <icon-plus />
            </template>
            <template #default>新建</template>
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :scroll="scroll"
        :scrollbar="scrollbar"
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
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
    <modal-form
      :modal-form-config="modalFormConfig"
      @handle-reset="handleReset"
    >
    </modal-form>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import SearchForm from '@/components/pro/responsive/search-form.vue';
  import ModalForm from '@/components/pro/modal-form/index.vue';
  import { ModalFormConfig, SearchFormConfig } from '@/types/proComponents';
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
  } from './config';

  const { loading } = useLoading(false); // 表格loading
  const show = ref<boolean>(false);
  const modalFormConfig = reactive<ModalFormConfig>({
    visible: false,
    footer: false,
    width: '1100px',
    formItems: modalFormItems,
    formModel,
    title: formModel.id ? '编辑' : '新建',
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
  // 设置表格滚动
  const scrollbar = ref(true);
  // 表格滚动参数
  const scroll = {
    x: 0,
    y: 447,
  };
  /**
   * 获取数据  todo 要把搜索参数带上
   */
  const handleGetData = async (params: any = {}) => {
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
    modalFormConfig.visible = true;
  };

  // 编辑表单
  const handleEdit = (row: any) => {
    controlObj(formModel, row);
    modalFormConfig.visible = true;
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

  onMounted(() => {
    handleGetData();
  });
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px;
  }

  :deep(.arco-table-container) {
    min-height: 447px !important;
  }
</style>
