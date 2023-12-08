import { reactive, ref } from 'vue';
const getInitColumns = () => {
    return [
        {
            title: '项目名称',
            dataIndex: 'name',
            ellipsis: true,
            tooltip: { position: 'bottom' },
            width: 200,
            fixed: 'left',
            show: true,
        },
        {
            title: '项目类型',
            dataIndex: 'projectType.message',
            width: 120,
            show: true,
        },
        {
            title: '备注',
            dataIndex: 'type',
            slotName: 'type',
            width: 100,
            show: true,
        },
        {
            title: '项目负责人',
            dataIndex: 'leaderName',
            width: 120,
            show: true,
        },
        {
            title: '预算',
            dataIndex: 'budget',
            width: 100,
            show: true,
        },
        {
            title: '是否立项',
            dataIndex: 'generalState',
            slotName: 'generalState',
            width: 100,
            show: true,
        },
        {
            title: '状态',
            dataIndex: 'status',
            slotName: 'status',
            width: 100,
            show: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: 200,
            show: true,
        },
        {
            title: '操作',
            align: 'center',
            fixed: 'right',
            width: 250,
            show: true,
            slotName: 'operation',
            dataIndex: 'operation',
        },
    ];
};
const columns = ref(getInitColumns());
// 表单控件
const formSearch = reactive({
    name: '',
    name1: '',
    name2: '',
    name3: '',
    type: '',
});
const formItems = [
    {
        label: '项目名称',
        field: 'name',
        placeholder: '请输入项目名称',
        type: 'input',
        span: 8,
    },
    {
        label: '搜索1',
        field: 'name1',
        placeholder: '请输入搜索1',
        type: 'input',
        span: 8,
    },
    {
        label: '搜索2',
        field: 'name2',
        placeholder: '请输入搜索2',
        type: 'input',
        span: 8,
    },
    {
        label: '搜索3',
        field: 'name3',
        placeholder: '请输入搜索3',
        type: 'input',
        span: 8,
    },
    {
        label: '备注',
        field: 'type',
        placeholder: '请选择',
        type: 'select',
        fieldNames: { value: 'value', label: 'name' },
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
const getInit = () => {
    return {
        name: '',
        type: '',
        textArea: '',
        dateRangePicker: [],
        editPassword: '',
        mention: '',
        textAreaEditor: '',
        id: null,
    };
};
const formModel = ref(getInit());
const modalFormItems = [
    {
        label: '项目名称',
        field: 'name',
        placeholder: '请输入项目名称',
        type: 'input',
        span: 12,
        rules: [{ required: true, message: '必填' }],
    },
    {
        label: '备注',
        field: 'type',
        placeholder: '请选择',
        type: 'select',
        span: 12,
        fieldNames: { value: 'value', label: 'name' },
        options: [
            { value: 0, name: '不填' },
            { value: 1, name: '填' },
        ],
        rules: [{ required: true, message: '必填' }],
    },
    {
        label: '密码',
        field: 'editPassword',
        placeholder: '请输入密码',
        type: 'password',
        span: 12,
        rules: [{ required: true, message: '必填' }],
    },
    {
        label: '时间',
        field: 'dateRangePicker',
        placeholder: ['请输入开始时间', '请输入结束时间'],
        type: 'dateRangePicker',
        span: 12,
        rules: [{ required: true, message: '必填' }],
    },
    {
        label: '描述',
        field: 'textArea',
        placeholder: '请输入项目描述',
        type: 'textArea',
        span: 12,
        rules: [{ required: true, message: '必填' }],
    },
    {
        label: '提及',
        field: 'mention',
        placeholder: '请输入内容',
        type: 'mention',
        span: 12,
        options: ['小明同学', '校长', '王主任', '崔佛', '老麦', '小富', '小茶'],
        rules: [{ required: true, message: '必填' }],
    },
    {
        label: '富文本',
        field: 'textAreaEditor',
        type: 'textAreaEditor',
        rules: [{ required: true, message: '必填' }],
        span: 20,
        labelConfig: {
            span: 3,
        },
    },
    {
        type: 'slot',
        slotName: 'operate',
    },
];
const data = reactive([]);
for (let i = 0; i < 99; i += 1) {
    const obj = {
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
export { columns, formSearch, formModel, data, formItems, modalFormItems, getInit, getInitColumns, };
//# sourceMappingURL=config.js.map