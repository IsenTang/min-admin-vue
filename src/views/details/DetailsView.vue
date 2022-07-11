<template>
  <div>
    <div>
      商品名字:{{ info.name }}
    </div>

    <div>
      创建时间:{{ $filters.formatTime(info.createdAt) }}
    </div>

    <div>
      <el-image
        style="width: 150px; height: 150px"
        :src="info.image"
      />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getShopItem } from '@/api/shop';

const route = useRoute();
const info = ref({});

onBeforeMount(async () => {
  // * 请求单条数据
  const { id } = route.query;
  const result = await getShopItem({ id });
  info.value = result.data;
});

</script>

<style lang="scss" scoped>

</style>
