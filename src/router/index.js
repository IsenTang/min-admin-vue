import { localGet } from '@/common/utils';
import { createRouter, createWebHistory } from 'vue-router';

const login = () => import(/* webpackChunkName: "login" */ '@/views/login/LoginView.vue');
const admin = () => import(/* webpackChunkName: "admin" */ '@/views/admin/AdminView.vue');
const user = () => import(/* webpackChunkName: "user" */ '@/views/user/UserView.vue');
const product = () => import(/* webpackChunkName: "product" */ '@/views/product/ProductView.vue');
const search = () => import(/* webpackChunkName: "search" */ '@/views/search/SearchView.vue');
const tree = () => import(/* webpackChunkName: "tree" */ '@/views/tree/TreeView.vue');
const lazy = () => import(/* webpackChunkName: "lazy" */ '@/views/lazy/LazyView.vue');
const details = () => import(/* webpackChunkName: "details" */ '@/views/details/DetailsView.vue');
const charts = () => import(/* webpackChunkName: "charts" */ '@/views/charts/ChartsView.vue');

const routes = [
  {
    path: '/',
    redirect: '/admin',
  },
  {
    path: '/login',
    name: 'home',
    component: login,
  },
  {
    path: '/admin',
    component: admin,
    beforeEnter: (to, from, next) => {
      // * 检测token
      const userInfo = localGet('user');

      if (userInfo) {
        next();
      } else {
        next('/login');
      }
    },
    children: [
      {
        path: '',
        name: 'admin',
        redirect: '/admin/user',
      },
      {
        path: 'user',
        component: user,
      },
      {
        path: 'product',
        component: product,
      },
      {
        path: 'search',
        component: search,
      },
      {
        path: 'tree',
        component: tree,
      },
      {
        path: 'lazy',
        component: lazy,
      },
      {
        path: 'details',
        component: details,
      },
      {
        path: 'charts',
        component: charts,
      },

    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
