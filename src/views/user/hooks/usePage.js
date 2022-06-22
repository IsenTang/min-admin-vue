import { reactive, toRefs } from 'vue';

// * 页数
export default function usePage() {
  const state = reactive({
    page: 1,
    limit: 10,
  });

  function updatePage(v) {
    state.page = v;
  }

  // * 保持响应性
  return {
    ...toRefs(state),
    updatePage,
  };
}
