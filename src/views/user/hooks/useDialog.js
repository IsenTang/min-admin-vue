import _ from 'lodash';
import { reactive, toRefs } from 'vue';

// * 弹窗
export default function useDialog() {
  const state = reactive({
    isShow: false,
    dialogData: {},
  });

  function openDialog(v) {
    state.isShow = true;
    state.dialogData = _.cloneDeep(v);
  }

  function closeDialog() {
    state.isShow = false;
  }

  // * 保持响应性
  return {
    ...toRefs(state),
    openDialog,
    closeDialog,
  };
}
