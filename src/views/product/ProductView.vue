<template>
  <div>
    <el-button
      type="success"
      @click="openDialog(null)"
    >
      添加
    </el-button>
    <el-table
      v-loading="loading"
      :data="list"
    >
      <el-table-column
        prop="name"
        label="商品名"
      />

      <el-table-column
        label="图片"
      >
        <template #default="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.image"
          />
        </template>
      </el-table-column>

      <el-table-column
        prop="price"
        label="积分价格"
      />

      <el-table-column
        label="上架时间"
      >
        <template #default="scope">
          <div>{{ $filters.formatTime(scope.row.createdAt) }}</div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <el-button @click="openDialog(scope.row)">
            修改
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="下架"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.isDeleted"
            @change="offShelf(scope.row._id,scope.row.isDeleted)"
          />
        </template>
      </el-table-column>
    </el-table>

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

    <el-dialog
      v-model="isShow"
      title="修改"
    >
      <div class="dialog-container">
        <div>
          商品名:<el-input v-model="dialogData.name" />
        </div>
        <div>
          积分:<el-input v-model="dialogData.price" />
        </div>
        <div>
          图片:<el-input v-model="dialogData.image" />
        </div>
        <div class="img-container">
          <el-image
            style="width: 100px; height: 100px"
            :src="dialogData.image"
          />
        </div>
        <el-button
          v-if="status === 'change'"
          type="primary"
          @click="updateProduct"
        >
          修改
        </el-button>

        <el-button
          v-if="status === 'add'"
          type="success"
          @click="addProduct"
        >
          添加
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import useLoading from '@/hooks/useLoading';
import useProduct from '@/views/product/hooks/useProduct';
import usePage from '@/views/product/hooks/usePage';
import useModal from '@/views/product/hooks/useDialog';

// * loading
const { loading, showLoading, hideLoading } = useLoading();
// * dialog
const {
  isShow, dialogData, status, openDialog, closeDialog,
} = useModal();
// * 页码
// eslint-disable-next-line no-use-before-define
const { page, limit, updatePage } = usePage();
// * 商品
const {
  list, total, updateProduct, offShelf, addProduct,
} = useProduct({
  showLoading, hideLoading, closeDialog, page, limit, dialogData,
});

</script>

<style lang="scss" scoped>
  .img-container{
    display: flex;
    align-items: center;
    justify-content:center;
  }
</style>
