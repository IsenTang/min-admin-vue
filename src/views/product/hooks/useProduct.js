import {
  reactive, onBeforeMount, toRefs, watch,
} from 'vue';
import { ElMessage } from 'element-plus';
import {
  getShopList, updateShopList, deleteShopList, insertShopList,
} from '@/api/shop';

// ! 钩子函数最好不要是async函数
export default function useProduct({
  showLoading, hideLoading, closeDialog, page, limit, dialogData,
}) {
  const state = reactive({
    list: [],
    total: 0,
  });

  // * 获取所有商品
  async function loadProducts() {
    try {
      showLoading();
      const result = await getShopList({ page: page.value, limit: limit.value });
      state.list = result.list;
      state.total = result.total;
    } catch (error) {
      ElMessage.error(error.message);
    } finally {
      hideLoading();
    }
  }

  // ? 当page或者limit改变，发送新的请求获取分页信息
  watch([page, limit], () => {
    loadProducts();
  });

  // * 更新商品
  async function updateProduct() {
    try {
      showLoading();
      await updateShopList({
        data: {
          // eslint-disable-next-line no-underscore-dangle
          _id: dialogData.value._id,
          name: dialogData.value.name,
          price: dialogData.value.price,
          image: dialogData.value.image,
        },
      });
      ElMessage({
        message: '更新成功',
        type: 'success',
      });
    } catch (error) {
      ElMessage.error(error.message);
    } finally {
      await loadProducts();
      closeDialog();
      hideLoading();
    }
  }

  // * 添加商品
  async function addProduct() {
    try {
      showLoading();
      await insertShopList({

        name: dialogData.value.name,
        price: dialogData.value.price,
        image: dialogData.value.image,

      });

      ElMessage({
        message: '添加成功',
        type: 'success',
      });
    } catch (error) {
      ElMessage.error(error.message);
    } finally {
      await loadProducts();
      closeDialog();
      hideLoading();
    }
  }

  // * 下架
  async function offShelf(id, isDeleted) {
    try {
      showLoading();
      await deleteShopList({
        id,
        isDeleted,
      });
    } catch (error) {
      ElMessage.error(error.message);
    } finally {
      await loadProducts();
      hideLoading();
    }
  }

  onBeforeMount(() => {
    loadProducts();
  });

  return {
    ...toRefs(state),
    updateProduct,
    addProduct,
    offShelf,
  };
}
