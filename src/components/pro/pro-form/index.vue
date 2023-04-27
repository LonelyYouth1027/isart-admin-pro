<template>
  <a-row>
    <a-col :flex="1">
      <a-form
        ref="formRef"
        :model="formModel"
        :label-col-props="formConfig.labelColProps"
        :wrapper-col-props="formConfig.wrapperColProps"
        :label-align="formConfig.labelAlign"
        :layout="formConfig.layout"
        :rules="formConfig.rules"
        :disabled="formConfig.disabled"
        :auto-label-width="formConfig.autoLabelWidth"
        :size="formConfig.size"
        @submit="handleSubmit"
      >
        <a-row :gutter="16">
          <a-col
            v-for="item in formItems"
            :key="item.field"
            :span="item.span"
            :offset="item.offset"
          >
            <a-form-item
              :field="item.field"
              :label="item.label"
              :rules="item.rules"
              :label-col-props="item.labelConfig"
              :wrapper-col-props="item.wrapperConfig"
            >
              <template v-if="item.type === 'input'">
                <a-input
                  v-model="formModel[item.field]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'password'">
                <a-input-password
                  v-model="formModel[item.field]"
                  :placeholder="item.placeholder"
                  allow-clear
                />
              </template>
              <template v-if="item.type === 'select'">
                <a-select
                  v-model="formModel[item.field]"
                  :placeholder="item.placeholder"
                  :options="item.options"
                  :field-names="item.fieldNames"
                  allow-search
                >
                </a-select>
              </template>
              <template v-if="item.type === 'textArea'">
                <a-textarea
                  v-model="formModel[item.field]"
                  :placeholder="item.placeholder"
                  allow-clear
                />
              </template>
              <template v-if="item.type === 'mention'">
                <a-mention
                  v-model="formModel[item.field]"
                  :data="item.options"
                  type="textarea"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'datePicker'">
                <a-date-picker
                  v-model="formModel[item.field]"
                  value-format="YYYY-MM-DD"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'dateRangePicker'">
                <a-range-picker
                  v-model="formModel[item.field]"
                  value-format="YYYY-MM-DD"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                />
              </template>
              <template v-if="item.type === 'textAreaEditor'">
                <basic-editor v-model:value="formModel[item.field]" />
              </template>
              <template v-if="item.type === 'upload'">
                <a-upload
                  v-model:file-list="formModel[item.field]"
                  :custom-request="customRequest"
                  @success="handleUploadSuccess"
                />
              </template>

              <template v-if="item.type === 'slot'">
                <slot :name="item.slotName"></slot>
              </template>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
  import { ref, toRefs, watch } from 'vue';
  import { ProFormItem, ProFormConfig } from '@/types/proComponents';
  import BasicEditor from '@/components/basic-editor/index.vue';
  // import * as qiniu from 'qiniu-js'; todo 七牛上传示例
  // import useQiniuToken from '@/hooks/qiniu-token' todo 获取七牛token的hooks

  const props = defineProps<{
    formModel: any;
    formItems: ProFormItem[];
    formConfig: ProFormConfig;
    // request: any | null;
  }>();
  // const { token } = useQiniuToken();
  const emits = defineEmits(['update:formModel', 'handleSubmit']);
  const { formModel, formItems, formConfig } = toRefs(props);
  const formRef = ref();
  watch(
    formModel,
    (newVal) => {
      emits('update:formModel', newVal);
    },
    {
      deep: true,
      immediate: true,
    }
  );
  const handleSubmit = async ({ values, errors }: any) => {
    if (!errors) {
      emits('handleSubmit', values);
    }
  };

  const customRequest = (option: any): any => {
    console.log(111, option);
    //   const { onProgress, onError, onSuccess, fileItem } = option;
    //   const uploadKey = new Date().getTime() + fileItem.name; // 上传七牛云需要的key
    //   return new Promise<any>((resolve) => {
    //     // 向后台获取到上传七牛云的token；
    //     uploadGetQiniuToken().then((res: any) => {
    //       const qiniuToken = res.result.token;
    //       // 向七牛云发起上传
    //       const observable = qiniu.upload(fileItem.file, uploadKey, token.value);
    //       observable.subscribe(
    //         (event: any) => {
    //           onProgress(event.total.percent);
    //         },
    //         (err: any) => {
    //           onError(err);
    //         },
    //         (result: any) => {
    //           // uploadResult 就是你文件存储在七牛云地址了
    //           // resolve(true);
    //           onSuccess(`https://dstc-qn.isart.me/${result.key}`);
    //           Message.success({
    //             content: '上传成功',
    //             duration: 2 * 1000,
    //           });
    //         }
    //       );
    //     });
    //   });
  };
  const handleUploadSuccess = (fileItem: any) => {
    fileItem.url = fileItem.response;
  };
</script>

<style lang="less" scoped></style>
