<template>
  <el-table
    v-loading="loading"
    :data="users.slice((page-1)*limit,page*limit)"
    style="width: 100%"
  >
    <el-table-column
      prop="username"
      label="用户名"
    />
    <el-table-column
      prop="nickname"
      label="昵称"
    />
    <el-table-column
      prop="age"
      label="年龄"
    />
    <el-table-column
      prop="school"
      label="学校"
    />
    <el-table-column
      prop="integration"
      label="积分"
    />

    <el-table-column
      label="操作"
    >
      <template #default="scope">
        <el-button
          type="primary"
          @click="openDialog(scope.row)"
        >
          操作
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="isShow"
    title="修改"
  >
    <div class="dialog-container">
      <el-input v-model="dialogData.integration" />
      <el-button
        type="primary"
        @click="updateUserIntegration"
      >
        修改
      </el-button>
    </div>
  </el-dialog>
  <el-pagination
    small
    background
    layout="prev, pager, next"
    :total="total"
    :current-page="page"
    :page-size="limit"
    class="mt-4"
    @update:current-page="updatePage"
  />
</template>

<script setup>
import useUsers from '@/views/user/hooks/useUsers';
import usePage from '@/views/user/hooks/usePage';
import useModal from '@/views/user/hooks/useDialog';
import useLoading from '@/hooks/useLoading';

// * loading
const { loading, showLoading, hideLoading } = useLoading();
// * 页码
const { page, limit, updatePage } = usePage();
// * 弹窗
const {
  isShow, dialogData, openDialog, closeDialog,
} = useModal();
// * 获取用户
const { users, total, updateUserIntegration } = useUsers({
  dialogData, showLoading, hideLoading, closeDialog,
});

</script>

<style lang="scss" scoped>
  .dialog-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
  }
</style>
