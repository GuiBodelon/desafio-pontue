import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { Notify } from 'quasar';
import { useUserStore } from 'src/stores/user-store';

import routes from './routes';
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
  }
}
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (to.meta.requiresAuth) {
      if (!userStore.user.access_token) {
        next({ name: 'Login', query: { next: to.fullPath } });
        Notify.create({
          progress: true,
          textColor: 'white',
          icon: 'warning',
          color: 'red-6',
          message: 'Você precisa estar logado para acessar esta página.',
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return Router;
});
