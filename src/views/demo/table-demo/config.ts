import { ProFormItem } from '@/components/plus/type';
import { ref } from 'vue';

const columns: any = [
  {
    title: '项目名称',
    dataIndex: 'name',
    ellipsis: true,
    tooltip: { position: 'bottom' },
    width: 200,
    fixed: 'left',
  },
  {
    title: '项目类型',
    dataIndex: 'projectType.message',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'type',
    slotName: 'type',
    width: 100,
  },
  {
    title: '项目负责人',
    dataIndex: 'leaderName',
    width: 120,
  },
  {
    title: '预算',
    dataIndex: 'budget',
    width: 100,
  },
  {
    title: '是否立项',
    dataIndex: 'generalState',
    slotName: 'generalState',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 200,
  },
  {
    title: '操作',
    align: 'center',
    width: 250,
    fixed: 'right',
    slotName: 'operation',
    dataIndex: 'operation',
  },
];

const formItems = ref<ProFormItem[]>([
  {
    label: '项目名称',
    field: 'name',
    component: 'AInput',
    props: {
      placeholder: '请输入项目名称',
    },
  },
  {
    label: '项目名称1',
    field: 'name1',
    component: 'AInput',
    props: {
      placeholder: '请输入项目名称',
    },
  },
  {
    label: '项目名称2',
    field: 'name2',
    component: 'AInput',
    props: {
      placeholder: '请输入项目名称',
    },
  },
  {
    label: '项目名称3',
    field: 'name3',
    component: 'AInput',
    props: {
      placeholder: '请输入项目名称',
    },
  },
  {
    label: '项目名称4',
    field: 'name4',
    component: 'AInput',
    props: {
      placeholder: '请输入项目名称',
    },
  },
  {
    label: '是否备注',
    field: 'select',
    component: 'ASelect',
    props: {
      placeholder: '请选择',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
  },
]);

const modalFormItems: ProFormItem[] = [
  {
    label: '项目名称',
    field: 'name',
    component: 'AInput',
    span: 24,
    formItemProps: {
      rules: [{ required: true, message: '必填', trigger: 'change' }],
    },
    props: {
      placeholder: '请输入项目名称',
    },
  },
  {
    label: '备注',
    field: 'type',
    component: 'ASelect',
    span: 24,
    props: {
      placeholder: '请选择',
      fieldNames: { value: 'value', label: 'name' },
      options: [
        { value: 0, name: '不填' },
        { value: 1, name: '填' },
      ],
    },
  },
];
const data: any = [];

for (let i = 0; i < 99; i += 1) {
  const obj: any = {
    id: i + 1,
    name: `小明的测试项目${i}`,
    projectType: {
      message: '测试项目',
    },
    type: i % 2 === 0 ? 1 : 0,
    leaderName: '小明童鞋',
    budget: '100',
    generalState: i % 2 === 0 ? 1 : 0,
    status: i % 2 === 0 ? '1' : '0',
    createdAt: '2023-2-28 11:27:11',
  };

  data.push(obj);
}

export { columns, data, formItems, modalFormItems };
