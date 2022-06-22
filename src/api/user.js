import api from '@/common/request';

// * 登陆
export async function userLogin(data) {
  const result = await api.post('/api/user/login', data);
  return result;
}

// * 获取所有用户
export async function getUsers() {
  const result = await api.get('/api/user/users');
  return result;
}

// * 更新用户积分
export async function updateUser(data) {
  const result = await api.put('/api/user', data);
  return result;
}
