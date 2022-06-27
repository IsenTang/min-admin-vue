import api from '@/common/request';

// * 获取所有商品信息
export async function getShopList({ page, limit }) {
  const result = await api.get('/api/admin/shopList', {
    params: {
      page,
      limit,
    },
  });
  return result;
}

// * 更新商品信息
export async function updateShopList(data) {
  await api.put('/api/admin/shopItem', data);
}

// * 删除商品信息
export async function deleteShopList(data) {
  await api.delete('/api/admin/shopItem', { data: { ...data } });
}

// * 插入商品信息
export async function insertShopList(data) {
  await api.post('/api/admin/shopItem', data);
}

// * 获取搜索的商品信息
export async function getSearchShopList(data) {
  const result = await api.get('/api/search/content', {
    params: {
      ...data,
    },
  });
  return result;
}
