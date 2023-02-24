import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DEMO: AppRouteRecordRaw = {
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
  ],
};

export default DEMO;
