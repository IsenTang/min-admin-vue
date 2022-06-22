import _ from 'lodash';
import { reactive, toRefs } from 'vue';

// * 弹窗
export default function useDialog() {
  const state = reactive({
    isShow: false,
    dialogData: {},
    status: 'change', // * change / add
  });

  function openDialog(v) {
    state.isShow = true;
    if (v) {
      state.status = 'change';
      state.dialogData = _.cloneDeep(v);
    } else {
      state.status = 'add';
      state.dialogData = {};
    }
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
