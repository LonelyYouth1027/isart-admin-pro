<template>
  <a-modal
    v-model:visible="modalFormConfig.visible"
    :top="modalFormConfig.top"
    :align-center="modalFormConfig.alignCenter"
    :width="modalFormConfig.width"
    :title="title"
    :footer="modalFormConfig.footer"
    @cancel="handleReset"
  >
    <pro-form
      ref="modalForm"
      :form-config="modalFormConfig"
      :form-model="formModel"
      :form-items="formItems"
      @handle-submit="handleSubmit"
    >
      <template #operate>
        <a-space style="justify-content: flex-end !important; width: 100%">
          <a-button @click="handleReset">取消</a-button>
          <a-button :loading="loading" html-type="submit" type="primary"
            >确认</a-button
          >
        </a-space>
      </template>
    </pro-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { ModalFormConfig } from '@/types/proComponents';
  import ProForm from '@/components/pro/pro-form/index.vue';
  import { ref, toRefs } from 'vue';
  import useLoading from '@/hooks/loading';

  const props = defineProps<{
    modalFormConfig: ModalFormConfig;
  }>();
  const emits = defineEmits(['handleReset']);
  const { loading, setLoading } = useLoading();
  const { modalFormConfig } = toRefs(props);
  const { formModel, formItems, title } = modalFormConfig.value;
  const modalForm = ref();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (values: any) => {
    setLoading(true);
    console.log(1111, values);
    const timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 2000);
  };
  const handleReset = () => {
    modalFormConfig.value.visible = false;
    modalForm.value.$refs.formRef.resetFields(); // todo 如果这个方法失效的话，可以使用下面的事件手动重置默认值
    emits('handleReset');
  };
</script>

<style lang="less" scoped></style>
