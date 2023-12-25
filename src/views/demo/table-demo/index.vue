<template>
  <div class="container">
    <!--    <Breadcrumb :items="['menu.demo', 'menu.list']" />-->
    <a-card class="general-card" :title="$t('menu.list')">
      <search-form
        :model="form"
        :form-options="formItems"
        :loading="loading"
        @submit="handleSubmit"
        @reset="handleGetData"
      ></search-form>
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
      v-model:visible="visible"
      title="新建"
      :model="editForm"
      :form-options="modalFormItems"
      :loading="loading"
      @cancel="handleCancel"
      @ok="handleOk"
    ></modal-form>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import controlObj from '@/utils/control-obj';
  import useVisible from '@/hooks/visible';
  import { columns, data, formItems, modalFormItems } from './config';

  const form = ref<any>({});
  const editForm = ref<any>({});
  const { loading, setLoading } = useLoading(false); // 表格loading
  const { visible, setVisible } = useVisible(false); // 表格loading

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
   * 获取数据 todo 要把搜索参数带上
   */
  const handleGetData = async (params: any = {}) => {
    console.log(params);
  };

  const handleSubmit = ({ errors, values }: any) => {
    setLoading(true);
    console.log(values, errors);
    const timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 1000);
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
    setVisible(true);
  };

  // 编辑表单
  const handleEdit = (row: any) => {
    // controlObj(formModel, row);
  };

  // 禁用启用
  const handleSetStatus = async (row: any) => {
    console.log(row);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = (callBack: any) => {
    setLoading(true);
    console.log(1111, editForm.value);
    const timer = setTimeout(() => {
      setLoading(false);
      setVisible(false);
      callBack();
      clearTimeout(timer);
    }, 1500);
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
