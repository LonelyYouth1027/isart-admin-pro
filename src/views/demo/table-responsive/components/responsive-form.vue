<template>
  <pro-form
    ref="searchForm"
    :form-config="searchFormConfig"
    :form-model="formModel"
    :form-items="formItems"
  >
    <template #responsive>
      <a-divider style="height: 84px" direction="vertical" />
      <a-row>
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" :loading="loading" @click="handleSubmit">
              <template #icon>
                <icon-search />
              </template>
              搜索
            </a-button>
            <a-button @click="handleReset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </template>
  </pro-form>
</template>

<script setup lang="ts">
  import { SearchFormConfig } from '@/types/proComponents';
  import ProForm from '@/components/pro/responsive/form.vue';
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
  const handleSubmit = () => {
    console.log(1111, formModel);
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
