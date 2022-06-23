// ? 公司自己封装的请求函数
// ? 基于 axios
import { create } from 'axios';
import _ from 'lodash';
import { localGet } from '@/common/utils';
import router from '@/router';
import CustomError from './error';

// ? 创建基本server
const api = create({
  // ? 配置请求
  timeout: 30000,
});

// ? 拦截器
// ? 请求拦截器
// ? 发送请求之前，所做的逻辑
api.interceptors.request.use(
  (request) => {
    const user = localGet('user');
    const token = _.get(user, 'token', '');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

// ? 响应拦截器
// ? 获取响应之后，所做的逻辑
api.interceptors.response.use(
  // ? 通过响应拦截器，自定义响应数据
  (response) => response.data,
  // ? 如果响应错误
  // ? 自定义错误,把error进行再封装
  (error) => {
    const cusError = new CustomError(error);
    if (cusError.code === 'auth-failed') {
      router.push('/login');
    }
    return Promise.reject(cusError);
  },
);

export default api;
