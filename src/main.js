import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import moment from 'moment';
import VueLazyLoad from 'vue3-lazyload';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-plus/dist/index.css';

// ? Vue3.0 不再支持过滤器,建议使用计算属性/方法
// ? 也可以使用以下方法

const app = createApp(App).use(store).use(router).use(ElementPlus, {
  locale: zhCn,
})
  .use(VueLazyLoad);
app.config.globalProperties.$filters = {
  formatTime(v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss');
  },
};

app.mount('#app');
