import { DEFAULT_LAYOUT } from '../base';
const DEMO = {
    path: '/demo',
    name: 'Demo',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.demo',
        requiresAuth: true,
        icon: 'icon-list',
        order: 0,
    },
    children: [
        {
            path: 'demo-table',
            name: 'DemoTable',
            component: () => import('@/views/demo/table-demo/index.vue'),
            meta: {
                locale: 'menu.list',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'table-responsive',
            name: 'ResponsiveTable',
            component: () => import('@/views/demo/table-responsive/index.vue'),
            meta: {
                locale: 'menu.demo.responsive',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ],
};
export default DEMO;
//# sourceMappingURL=demo.js.map