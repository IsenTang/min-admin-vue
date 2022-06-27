<template>
  <div
    ref="searchContainer"
    class="search-container"
  >
    <div class="input-container">
      <el-input
        v-model="state.keyword"
        @keyup="search"
        @focus="show"
      />
      <div
        v-if="state.isShow"
        class="history-keyword-container"
      >
        <el-tag
          v-for="{keyword} in state.keywordList"
          :key="keyword"
          @click="searchContent(keyword)"
        >
          {{ keyword }}
        </el-tag>
      </div>
      <el-card
        v-if="state.isShow"
        class="box-card"
      >
        <div
          v-for="item in state.list"
          :key="item._id"
          class="search-item"
          :title="item.name"
        >
          {{ item.name }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import _ from 'lodash';
import { ElLoading, ElMessage } from 'element-plus';
import { getSearchShopList } from '@/api/shop';
import { localGet, localSet } from '@/common/utils';

// * 获取历史记录，并排序
function getKeywordList() {
  let list = localGet('keywordList') || [];
  list = _.orderBy(list, ['count'], ['desc']);
  return list;
}

const searchContainer = ref(null);

const state = reactive({
  keyword: '', // * 关键字
  list: [], // * 搜索结果
  isShow: false,
  keywordList: getKeywordList(),
});

const hide = (e) => {
  // ? 不包含，就隐藏
  if (searchContainer.value && !searchContainer.value.contains(e.target)) {
    state.isShow = false;
    document.removeEventListener('click', hide);
  }
};

const show = () => {
  state.isShow = true;
  state.keywordList = getKeywordList();
  // * 监听
  document.addEventListener('click', hide);
};

// * 添加keyword历史记录
function setKeyword() {
  const { keyword } = state;
  let list = localGet('keywordList');
  if (list) {
    // * 如果存在
    // * 查看是否出现过
    const index = _.findIndex(list, (item) => item.keyword === keyword);
    // * 不存在，添加
    if (index === -1) {
      list.push({
        keyword,
        count: 1,
      });
    } else {
      list[index].count += 1;
    }
  } else {
    // * 新建
    list = [];
    list.push({
      keyword,
      count: 1,
    });
  }
  // * 放回localstorage
  localSet('keywordList', list);
}

async function getContent() {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  try {
    // * keyword历史记录保留在localstorage
    state.list = await getSearchShopList({
      keyword: state.keyword,
    });
    setKeyword();
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loading.close();
  }
}

// ? 防抖，减少请求数量
const search = _.debounce(async () => {
  // * 非空判断
  if (state.keyword) {
    await getContent();
  } else {
    state.list = [];
  }
}, 1000);

const searchContent = async (v) => {
  state.keyword = v;
  await getContent();
};

</script>

<style lang="scss" scoped>

  .search-container{
    width: 550px;
  }
  .input-container{
    width: 500px;
  }

  .box-card {
    width: 500px;
    height:600px;
    overflow: auto;
  }

  .search-item{
    width: 100%;
    height:30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  ::v-deep(.el-tag){
    cursor: pointer;
  }
</style>
