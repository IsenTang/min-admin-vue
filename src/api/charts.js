import api from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function getData({ start, end }) {
  const result = await api.get(`/api2/order?start=${start}&end=${end}`);
  return result;
}
