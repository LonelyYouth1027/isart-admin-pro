<template>
  <div class="container">
    <Breadcrumb :items="['menu.demo', 'menu.list']" />
    <a-card class="general-card" :title="$t('menu.list')">
      <a-row>
        <a-col :flex="1">
          <a-form
            ref="formSearchRef"
            :model="formSearch"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
            @submit="handleSearch"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="name_Like" label="项目名称">
                  <a-input
                    v-model="formSearch.name_Like"
                    placeholder="请输入项目名称"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" label="项目状态">
                  <a-select
                    v-model="formSearch.status"
                    placeholder="请选择项目状态"
                  >
                    <a-option value="0">无效</a-option>
                    <a-option value="1">有效</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item>
                  <a-space>
                    <a-button html-type="submit" type="primary">
                      <template #icon>
                        <icon-search />
                      </template>
                      <template #default>查询</template>
                    </a-button>
                    <a-button @click="handleReset">
                      <template #icon>
                        <icon-refresh />
                      </template>
                      <template #default>重置</template>
                    </a-button>
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
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
        z
        :pagination="pagination"
        style="margin-top: 20px"
        :bordered="true"
        @page-change="handlePage"
      >
        <template #projectType="{ record }">
          {{ record.projectType?.message }}
        </template>
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
          <a-button type="text" size="small" @click="handleBudget(record)"
            >预算</a-button
          >
          <a-button type="text" size="small" @click="handleModalTable(record)"
            >预算记录</a-button
          >
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import { columns, form } from './config';

  const { loading } = useLoading(false); // 表格loading
  const formSearchRef = ref(); // 搜索表单实例
  // 搜索表单
  const formSearch = reactive({
    name_Like: '',
    status: '',
  });
  const data = reactive([]); // 表格数据
  // 分页控件
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  // 分页器
  const pagination = reactive({
    ...basePagination,
  });
  // 设置表格滚动
  const scrollbar = ref(true);
  // 表格滚动参数
  const scroll = {
    x: 0,
    y: 447,
  };
  /**
   * 获取数据
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
    handleGetData(formSearch);
  };

  /**
   * 搜索
   * @param values 搜索参数 {name_Like,status}
   */
  const handleSearch = async ({ values }: any) => {
    pagination.current = 1;
    await handleGetData(values);
  };

  const handleReset = () => {
    formSearchRef.value.resetFields();
    handleGetData();
  };

  const visible = ref(false); // modal控件
  // 打开modal框
  const handleClick = () => {
    visible.value = true;
  };

  // 编辑表单
  const handleEdit = (row: any) => {
    form.name = row.name;
    form.type = row.type;
    form.leaderId = row.leaderId;
    form.projectType = row.projectType.code;
    form.parentId = row.parentId || null;
    form.id = row.id;
    visible.value = true;
  };

  // 禁用启用
  const handleSetStatus = async (row: any) => {
    console.log(row);
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
