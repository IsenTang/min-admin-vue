import { localGet } from '@/common/utils';
import { createRouter, createWebHistory } from 'vue-router';

const login = () => import(/* webpackChunkName: "login" */ '@/views/login/LoginView.vue');
const admin = () => import(/* webpackChunkName: "admin" */ '@/views/admin/AdminView.vue');
const user = () => import(/* webpackChunkName: "user" */ '@/views/user/UserView.vue');
const product = () => import(/* webpackChunkName: "product" */ '@/views/product/ProductView.vue');

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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
