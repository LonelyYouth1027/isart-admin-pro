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
    dataIndex: 'projectType',
    slotName: 'projectType',
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
const form = reactive({
  name: '',
  type: '',
  id: null,
  parentId: null,
  leaderId: '',
  projectType: '',
  name4: '',
  name5: '',
  name6: '',
});
// 表单验证规则
const rules: any = reactive({
  name: [{ required: true, message: '项目名称必填' }],
  // parentId: [{ required: true, message: '上级项目必填' }],
  leaderId: [{ required: true, message: '项目负责人必填' }],
  projectType: [{ required: true, message: '项目类型必填' }],
  type: [{ required: true, message: '备注必填' }],
});

export { columns, form, rules };
