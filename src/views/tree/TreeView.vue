<template>
  <div>
    学生推荐关系图
    <el-tree :data="state.treeList">
      <template #default="{ node,data }">
        <div class="custom-tree-node">
          <div>{{ node.label }}</div>
          <div class="btn-container">
            <el-button
              type="primary"
              :icon="Edit"
              circle
              @click.stop="edit(node,data)"
            />
            <el-button
              type="primary"
              :icon="Plus"
              circle
              @click.stop="append(node,data)"
            />
            <el-button
              type="primary"
              :icon="Delete"
              circle
              @click.stop="remove(node,data)"
            />
          </div>
        </div>
      </template>
    </el-tree>
  </div>

  <el-dialog
    v-model="state.dialogVisible"
    :title="state.title"
    width="30%"
  >
    <div>
      <el-input v-model="state.name" />
    </div>
    <div class="confirm-container">
      <el-button @click="confirm">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { reactive } from 'vue';
import {
  Delete,
  Edit,
  Plus,
} from '@element-plus/icons-vue';

const state = reactive({
  treeList: [
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
  ],
  dialogVisible: false,
  title: '',
  name: '',
  treeData: {},
});

let id = 1000;

// * 编辑
function edit(node, data) {
  state.dialogVisible = true;
  state.title = '编辑';
  state.treeData = data;
  state.name = data.label;
}

// * 确认
function confirm() {
  if (state.title === '编辑') {
    state.treeData.label = state.name;
  }

  if (state.title === '添加') {
    id += 1;
    state.treeData.children.push({
      $treeNodeId: id, label: state.name, children: [],
    });
  }
  state.treeData = {};
  state.name = '';
  state.dialogVisible = false;
}

// * 添加
function append(node, data) {
  state.dialogVisible = true;
  state.title = '添加';
  state.treeData = data;
  state.name = '';
}

// * 删除
function remove(node, data) {
  // ? 获取父节点
  const { parent } = node;
  // ? 如果是有父节点，则有parent.data.children
  // ? 如果没有父节点，则获取自己
  const children = parent.data.children || parent.data;

  // ? 找到数组下标
  const index = children.findIndex((item) => item.$treeNodeId === data.$treeNodeId);

  children.splice(index, 1);
}
</script>

<style lang="scss" scoped>

  ::v-deep(.el-tree-node__content){
    height:50px;
  }
  .custom-tree-node{
    display: flex;
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
  .btn-container{
    width:100px;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .confirm-container{
    width:100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
