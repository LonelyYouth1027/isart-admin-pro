<template>
  <a-drawer
    v-model:visible="drawerFormConfig.visible"
    :width="drawerFormConfig.width"
    :title="title"
    :footer="drawerFormConfig.footer"
    @cancel="handleReset"
  >
    <pro-form
      ref="drawerForm"
      :form-config="drawerFormConfig"
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
  </a-drawer>
</template>

<script setup lang="ts">
  import { DrawerFormConfig } from '@/types/proComponents';
  import ProForm from '@/components/pro/pro-form/index.vue';
  import { ref, toRefs } from 'vue';
  import useLoading from '@/hooks/loading';

  const props = defineProps<{
    drawerFormConfig: DrawerFormConfig;
    title: string;
  }>();
  const emits = defineEmits(['handleReset', 'handleSuccess']);
  const { loading, setLoading } = useLoading();
  const { drawerFormConfig } = toRefs(props);
  const { formModel, formItems } = drawerFormConfig.value;
  const drawerForm = ref();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (values: any) => {
    setLoading(true);
    console.log(1111, values);
    const timer = setTimeout(() => {
      setLoading(false);
      emits('handleSuccess');
      clearTimeout(timer);
    }, 2000);
  };
  const handleReset = () => {
    drawerFormConfig.value.visible = false;
    drawerForm.value.$refs.formRef.resetFields(); // todo 如果这个方法失效的话，可以使用下面的事件手动重置默认值
    emits('handleReset');
  };
</script>

<style lang="less" scoped></style>
