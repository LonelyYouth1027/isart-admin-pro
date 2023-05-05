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
  import { SearchFormConfig } from '@/types/proComponents';
  import ProForm from '@/components/pro/pro-form/index.vue';
  import { ref, toRefs } from 'vue';
  import useLoading from '@/hooks/loading';

  const props = defineProps<{
    searchFormConfig: SearchFormConfig;
  }>();
  const emits = defineEmits(['handleReset']);
  const { loading, setLoading } = useLoading();
  const { searchFormConfig } = toRefs(props);
  const { formModel, formItems } = searchFormConfig.value;
  const searchForm = ref();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (values: any) => {
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
