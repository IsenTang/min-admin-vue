<template>
  <div class="container">
    <el-form
      ref="ruleForm"
      label-position="left"
      :rules="rules"
      label-width="100px"
      :model="formData"
      style="max-width: 360px"
    >
      <el-form-item
        label="Name"
        prop="name"
      >
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
      >
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="login"
        >
          登陆
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { userLogin } from '@/api/user';
import { localSet } from '@/common/utils';

const ruleForm = ref();
const router = useRouter();

// * form信息
const formData = reactive({
  name: '',
  password: '',
});

// * 规则
const rules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],

});

async function login() {
  // * 先检测
  await ruleForm.value.validate(async (valid) => {
    if (valid) {
      try {
        const result = await userLogin({
          username: formData.name,
          password: formData.password,
        });

        // * 登陆成功后，将用户信息存入localstorage
        localSet('user', result.user);

        // * 跳转到admin页面
        router.push('/admin');
      } catch (error) {
        ElMessage.error(error.message);
      }
    }
  });
}
</script>

<style lang="scss" scoped>
  .container{
    width: 100vw;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
