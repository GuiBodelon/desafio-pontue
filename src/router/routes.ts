import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Login',
        component: () => import('src/pages/LoginPage/index.vue'),
      },
      {
        path: '/',
        name: 'App',
        component: () => import('src/layouts/AppLayout.vue'),
        meta: {
          requiresAuth: true,
          //breadcrumb: [{ name: 'Dashboard', icon: 'fa-solid fa-gauge' }],
        },
        children: [
          {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('src/pages/DashboardPage/index.vue'),
            meta: {
              requiresAuth: true,
              breadcrumb: [{ name: 'Dashboard', icon: 'dashboard' }],
            },
          },
          {
            path: '/redacoes',
            name: 'Redações',
            component: () => import('src/pages/RedacoesPage/index.vue'),
            meta: {
              requiresAuth: true,
              breadcrumb: [{ name: 'Redações', icon: 'rate_review' }],
            },
          },
          {
            path: '/redacoes/:id',
            name: 'Visualizar Redação',
            component: () =>
              import('src/pages/VisualizarRedacaoPage/index.vue'),
            meta: {
              requiresAuth: true,
              breadcrumb: [
                { name: 'Redações', icon: 'rate_review' },
                { name: 'Visualizar', icon: 'visibility' },
              ],
            },
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
