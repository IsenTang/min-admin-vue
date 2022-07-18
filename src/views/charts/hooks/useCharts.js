import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as echarts from 'echarts';

export default function useChart(className) {
  const chart = ref(null);
  onMounted(() => {
    chart.value = echarts.init(document.getElementById(className));
  });

  // ? 在销毁之前，清空实例
  onBeforeUnmount(() => {
    // ? 释放echart 实例 ，清空实例
    chart.value.dispose();
    // ? 清空实例内的内容，并不删除实例
    // chart.value.clear();
  });
  return {
    chart,
  };
}
