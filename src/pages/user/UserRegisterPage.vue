<template>
  <van-cell-group>
    <van-field
        v-model="userName"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
    />
    <van-field
        v-model="userAccount"
        required
        clearable
        label="账号"
        placeholder="请输入账号"
    />
    <van-field
        v-model="userPassword"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
    />
    <van-field
        v-model="checkPassword"
        type="password"
        label="确认密码"
        placeholder="请输入确认密码"
        required
    />
  </van-cell-group>
  <van-radio-group style="padding: 10px" v-model="status" direction="horizontal">
    <van-radio :name="0">别人可见</van-radio>
    <van-radio :name="1">别人不可见</van-radio>
  </van-radio-group>
  <van-cell-group>
    <van-button type="primary" style="width: 100%" text="注册" @click="onClick"></van-button>
  </van-cell-group>
  <van-cell-group>
    <router-link to="/userLogin" style="float: right;padding-right: 5px;color: #8db5b7">登陆</router-link>
  </van-cell-group>
</template>

<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import {successNotify, errorNotify} from "../../utils/notifyUtil.ts";

const userAccount = ref()
const userPassword = ref()
const checkPassword = ref()
const userName = ref()
const status = ref(0)
const router = useRouter()

const onClick = async () => {
  const resp:any = await myAxios.post('/user/register', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
    userName: userName.value,
    status: status.value
  })
    if (resp.code === 0) {
      successNotify('注册成功')
      await router.push('/userLogin')
    } else {
      errorNotify(resp.message)
    }
}

</script>

<style scoped>

</style>