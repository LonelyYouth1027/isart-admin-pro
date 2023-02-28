import { reactive } from 'vue';

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

// 表单控件
const formSearch = reactive({
  name: '',
  type: '',
});

const formModal = reactive({
  name: '',
  type: '',
  id: null,
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

const modalFormItems: any = [
  {
    label: '项目名称',
    field: 'name',
    placeholder: '请输入项目名称',
    type: 'input',
    rules: [{ required: true, message: '必填' }],
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
    rules: [{ required: true, message: '必填' }],
  },
  {
    type: 'slot',
    slotName: 'operate',
  },
];
const data: any = [];

for (let i = 0; i < 20; i += 1) {
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

export { columns, formSearch, formModal, data, formItems, modalFormItems };
