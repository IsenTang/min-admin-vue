import { reactive, toRefs } from 'vue';

export default function usePage() {
  const state = reactive({
    page: 1,
    limit: 10,
  });

  function updatePage(v) {
    state.page = v;
  }

  return {
    ...toRefs(state),
    updatePage,
  };
}
