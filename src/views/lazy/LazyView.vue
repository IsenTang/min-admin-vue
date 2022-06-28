<template>
  <div>
    懒加载图片
    <div class="container" />
    <img
      v-lazy="{ src: url}"
      alt=""
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';

const url = ref('https://images.unsplash.com/photo-1527960669566-f882ba85a4c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXdlc29tZSUyMHBpY3xlbnwwfHwwfHw%3D&w=1000&q=80');
</script>

<style lang="scss" scoped>
  .container{
    height: 100vh;
    background-color: aquamarine;
  }
</style>
