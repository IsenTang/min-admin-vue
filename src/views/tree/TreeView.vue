<template>
  <div>
    学生推荐关系图
    <el-tree :data="data" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  {
    label: 'isen',
    children: [
      {
        label: 'lucy',
        children: [
          {
            label: 'lily',
          },
          {
            label: 'tom',
          },
        ],
      },
      {
        label: 'tomy',
        children: [
          {
            label: 'jerry',
          },
          {
            label: 'anna',
          },
        ],
      },
    ],
  },

]);
</script>

<style lang="scss" scoped>

</style>
