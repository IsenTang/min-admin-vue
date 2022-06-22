import { reactive, onBeforeMount, toRefs } from 'vue';
import { getUsers, updateUser } from '@/api/user';
import { ElMessage } from 'element-plus';

// * 用户钩子
export default function useUsers({
  dialogData, showLoading, hideLoading, closeDialog,
}) {
  const state = reactive({
    users: [],
    total: 0,
  });

  async function loadUsers() {
    try {
      showLoading();
      const result = await getUsers();

      state.users = result;
      state.total = result.length;
    } catch (error) {
      ElMessage.error(error.message);
    } finally {
      hideLoading();
    }
  }

  onBeforeMount(async () => {
    await loadUsers();
  });

  async function updateUserIntegration() {
    try {
      showLoading();
      // * 更新数据
      await updateUser({
        // eslint-disable-next-line no-underscore-dangle
        id: dialogData.value._id,
        integration: dialogData.value.integration,
      });

      // * 获取最新数据
      await loadUsers();
      ElMessage({
        message: '修改成功',
        type: 'success',
      });
      // * 关闭弹窗
      closeDialog();
    } catch (error) {
      ElMessage.error(error.message);
    } finally {
      hideLoading();
    }
  }
  // * 保持响应性
  return {
    ...toRefs(state),
    updateUserIntegration,
  };
}
