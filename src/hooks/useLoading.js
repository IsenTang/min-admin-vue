import { reactive, toRefs } from 'vue';

// * 页数
export default function useLoading() {
  const state = reactive({
    loading: false,
  });

  function showLoading() {
    state.loading = true;
  }

  function hideLoading() {
    state.loading = false;
  }

  // * 保持响应性
  return {
    ...toRefs(state),
    showLoading,
    hideLoading,
  };
}
