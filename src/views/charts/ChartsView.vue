<template>
  <div>
    <!-- 时间选择器 -->
    <div class="block">
      <el-date-picker
        v-model="value"
        type="daterange"
        unlink-panels
        range-separator="To"
        start-placeholder="开始"
        end-placeholder="结束"
        :shortcuts="shortcuts"
        :size="size"
        @change="change"
      />
    </div>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-card v-loading="loading">
          <div
            id="line"
          />
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card v-loading="loading">
          <div
            id="pie"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import _ from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { getData } from '@/api/charts';

// * hooks
import useLoading from '@/hooks/useLoading';
import useCharts from '@/views/charts/hooks/useCharts';

const moment = extendMoment(Moment);

const { loading, showLoading, hideLoading } = useLoading();
const { chart: lineChart } = useCharts('line');
const { chart: pieChart } = useCharts('pie');

const value = ref([]);
const size = ref('');
const shortcuts = [
  {
    text: '上1周',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: '上1个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: '上3个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

function organizeLineData({ data, start, end }) {
  const range = moment.range(start, end);
  let days = Array.from(range.by('days'));
  days = days.map((m) => m.format('YYYY-MM-DD'));

  let result = _.map(data, (item) => {
    // eslint-disable-next-line no-param-reassign
    item.time = moment(item.createdAt).format('YYYY-MM-DD');
    return item;
  });
  result = _.groupBy(result, 'time');

  const countArray = [];
  days.forEach((item) => {
    // * 如果有单，则放入几单
    if (result[item]) {
      countArray.push(result[item].length);
    } else {
      // * 如果没有，则是0
      countArray.push(0);
    }
  });
  const option = {
    xAxis: {
      type: 'category',
      data: days,
    },
    yAxis: {
      type: 'value',
    },

    tooltip: {
      trigger: 'item',
      // ? 格式化输出信息
      // ? https://echarts.apache.org/zh/option.html#tooltip.formatter
      formatter: '时间:{b0},订单:{c0}',
    },
    series: [
      {
        data: countArray,
        type: 'line',
      },
    ],
  };
  return option;
}

function organizePieChart({ data, start, end }) {
  // * 整理时间
  const range = moment.range(start, end);
  let days = Array.from(range.by('days'));
  days = days.map((m) => m.format('YYYY-MM-DD'));

  // * 整理每天订单量
  // * 重构数据源,写出当天
  let result = _.map(data, (item) => {
    // eslint-disable-next-line no-param-reassign
    item.time = moment(item.createdAt).format('YYYY-MM-DD');
    return item;
  });

  result = _.groupBy(result, 'time');// { '2021-11-26' : [{...},{...}] }

  const pieData = days.map((item) => {
    const d = {};

    d.name = item;
    d.value = result[item] ? result[item].length : 0;
    return d;
  });

  const pieOption = {
    series: [
      {
        name: '订单量',
        type: 'pie',
        radius: '50%',
        data: pieData,
        // emphasis: {
        //   itemStyle: {
        //     shadowBlur: 10,
        //     shadowOffsetX: 0,
        //     shadowColor: 'rgba(0, 0, 0, 0.5)',
        //   },
        // },
      },
    ],
  };

  return pieOption;
}

async function change([start, end]) {
  try {
    showLoading();
    const result = await getData({
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
    });

    const lineOption = organizeLineData({
      data: result,
      start,
      end,
    });

    const pieOption = organizePieChart({
      data: result,
      start,
      end,
    });

    lineChart.value.setOption({
      title: {
        text: '每日单量柱状图',
      },
      tooltip: {},
      // ? x轴坐标
      ...lineOption,
    });

    pieChart.value.setOption({
      title: {
        text: '订单量',
        // subtext: '',
        // left: 'center',
      },
      tooltip: {
        // trigger: 'item',
      },
      legend: {
        show: false,
        data: [],
      },
      ...pieOption,
    });
  } catch (error) {
    ElMessage.error(error.messsage);
  } finally {
    hideLoading();
  }
}

onMounted(async () => {
  value.value = [new Date(), moment().subtract(1, 'day').toDate()];
  await change([new Date(), moment().subtract(1, 'day').toDate()]);
});

</script>

<style lang="scss" scoped>
    ::v-deep .el-row {
        margin-top:20px;
        margin-bottom: 20px;
    }

    #line{
        width: 100%;
        height: 200px;
    }

    #pie{
        width: 100%;
        height: 200px;
    }
</style>
