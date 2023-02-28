<template>
  <pro-form
    ref="searchForm"
    :form-config="searchFormConfig"
    :form-model="formModel"
    :form-items="formItems"
    @handle-submit="handleSubmit"
  >
    <template #operate>
      <a-space>
        <a-button html-type="submit" type="primary" :loading="loading">
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
    </template>
  </pro-form>
</template>

<script setup lang="ts">
  import { ProFormConfig, ProFormItem } from '@/types/proComponents';
  import ProForm from '@/components/pro/pro-form/index.vue';
  import { ref, toRefs } from 'vue';
  import useLoading from '@/hooks/loading';

  const props = defineProps<{
    formModel: any;
    formItems: ProFormItem[];
  }>();
  const emits = defineEmits(['handleReset']);
  const { loading, setLoading } = useLoading();
  const { formModel, formItems } = toRefs(props);
  const searchFormConfig: ProFormConfig = {
    labelColProps: {
      span: 6,
    },
    wrapperColProps: {
      span: 18,
    },
    labelAlign: 'left',
  };
  const searchForm = ref();
  const handleSubmit = (values: any) => {
    console.log(111, values);
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 2000);
  };
  const handleReset = () => {
    // $refs.searchForm.$refs.formRef.resetFields()
    searchForm.value.$refs.formRef.resetFields();
    emits('handleReset');
  };
</script>

<style lang="less" scoped></style>
