<template>
  <div class="common-layout">
    <el-container>
      <el-header>管理平台</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="active"
            class="el-menu-vertical-demo"
            @select="to"
          >
            <el-menu-item index="user">
              <el-icon><icon-menu /></el-icon>
              <span>用户</span>
            </el-menu-item>

            <el-menu-item index="product">
              <el-icon><icon-menu /></el-icon>
              <span>产品</span>
            </el-menu-item>
            <el-button
              class="logout"
              @click="logout"
            >
              登出
            </el-button>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { localSet } from '@/common/utils';

const route = useRoute();
const active = ref(route.path.split('/')[2]);

const router = useRouter();
// * 路由跳转
function to(v) {
  router.push(v);
}

// * 登出
function logout() {
  localSet('user', null);
  router.push('/login');
}

</script>

<style lang="scss" scoped>
.common-layout{
  height:100vh;
}
::v-deep(.el-header){
  border-bottom : 1px solid var(--el-menu-border-color);
  display:flex;
  justify-content:center;
  align-items:center;
}

::v-deep(.el-container){
  height:100%;
  .el-aside{
      height:100%;
      .el-menu{
        height: 100%;
      }
  }
}

.el-menu-vertical-demo{
  position:relative;
}

.logout{
  position:absolute;
  bottom:20px;
  left:50%;
  transform:translateX(-50%)
}
</style>
