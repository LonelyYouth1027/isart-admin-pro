<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="width: 100%; height: 500px; overflow-y: hidden"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
      @on-change="handleChange"
      @on-focus="handleFocus"
      @on-blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css
  import { onBeforeUnmount, ref, shallowRef, watch } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();
  const mode = ref('default');
  const props = defineProps<{
    value: string;
  }>();
  const emits = defineEmits(['update:value']);

  const valueHtml = ref(props.value);
  watch(
    () => props.value,
    (newVal) => {
      emits('update:value', newVal);
      valueHtml.value = newVal;
    },
    {
      deep: true,
      immediate: true,
    }
  );

  const toolbarConfig = {};
  const editorConfig = {
    placeholder: '请输入内容...',
  };

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };

  const handleChange = (editor: any) => {
    emits('update:value', editor.getHtml());
  };

  const handleFocus = (editor: any) => {
    emits('update:value', editor.getHtml());
  };
  const handleBlur = (editor: any) => {
    emits('update:value', editor.getHtml());
  };
</script>

<style lang="less" scoped></style>
