# Guide

> pro-form 是基于arco design中form组件的二次封装 详细内容请参考: https://arco.design/vue/docs/start

### 基本使用

配置 formItems(必填),formModel(必填),formConfig(非必填) 即可使用 (具体可参考SearchForm组件和ModalForm组件)

```html
<!-- /src/views/demo/table-demo/index.vue-->
<template>
  <search-form
    :form-model="formSearch"
    :form-items="formItems"
  ></search-form>
</template>
<script lang="ts" setup>
  import SearchForm from '@/components/pro/search-form/index.vue';
</script>
```

```ts
// /src/views/demo/table-demo/config.ts

// 表单控件
const formSearch = reactive({
  name: '',
  type: '',
});

const formItems: any = [
  {
    label: '项目名称',
    field: 'name',
    placeholder: '请输入项目名称',
    type: 'input',
    span: 8,
  },
  {
    label: '备注',
    field: 'type',
    placeholder: '请选择',
    type: 'select',
    options: [
      { value: 0, name: '不填' },
      { value: 1, name: '填' },
    ],
    span: 8,
  },
  {
    type: 'slot',
    slotName: 'operate',
    span: 8,
  },
];
// 具体详情请查看demo
```

### API

pro-form Props属性

| 参数名       | 描述     | 类型                          |
|-----------|--------|-----------------------------|
| formModel | 表单数据模型 | any 任意类型                    |
| formItems | 表单项数组  | ProFormItem [ ] 数组 array    |
| formConfig | 表单配置   | ProFormConfig { } 对象 object |

pro-form Events事件

| 参数名    | 描述         | 类型       |
|--------------|------------|----------|
| handleSubmit | 提交表单的方法    | function |                  |


