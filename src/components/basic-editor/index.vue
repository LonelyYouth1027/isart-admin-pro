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
  // import * as qiniu from 'qiniu-js'; todo 七牛上传示例
  // import useQiniuToken from '@/hooks/qiniu-token' todo 获取七牛token的hooks

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();
  const mode = ref('default');
  const props = defineProps<{
    value: string;
  }>();
  const emits = defineEmits(['update:value']);
  // const { token } = useQiniuToken(); todo 七牛token
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
    // MENU_CONF: {
    //   uploadImage: {
    //     maxFileSize: 2 * 1024 * 1024,
    //     timeout: 5 * 1000,
    //     customUpload(file: File, insertFn: InsertFnType) {
    //       const uploadKey = new Date().getTime(); // 上传七牛云需要的key
    //       return new Promise<any>((resolve) => {
    //         // 向七牛云发起上传
    //         const observable = qiniu.upload(file, uploadKey, token.value);
    //         observable.subscribe(
    //           (event: any): void => {
    //             // console.log(event);
    //           },
    //           (err: any): void => {
    //             // console.log(err);
    //           },
    //           (result: any) => {
    //             const responseUrl = `https://dstc-qn.isart.me/${result.key}`; // https://dstc-qn.isart.me 地址
    //             insertFn(responseUrl, '', responseUrl);
    //             Message.success({
    //               content: '上传成功',
    //               duration: 2 * 1000,
    //             });
    //             resolve(true);
    //           }
    //         );
    //       });
    //     },
    //   },
    // },
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
    if (!editor.getText()) {
      emits('update:value', editor.getText());
      return;
    }
    emits('update:value', editor.getHtml());
  };

  const handleFocus = (editor: any) => {
    if (!editor.getText()) {
      emits('update:value', editor.getText());
      return;
    }
    emits('update:value', editor.getHtml());
  };
  const handleBlur = (editor: any) => {
    if (!editor.getText()) {
      emits('update:value', editor.getText());
      return;
    }
    emits('update:value', editor.getHtml());
  };
</script>

<style lang="less" scoped></style>
