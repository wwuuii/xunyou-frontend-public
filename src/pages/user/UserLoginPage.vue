<template>
  <van-cell-group>
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
  </van-cell-group>
  <van-cell-group>
    <van-button type="primary" round style="width: 100%" text="登陆" @click="onClick"></van-button>
  </van-cell-group>
  <van-cell-group>
    <router-link to="/userRegister" style="float: right;padding-right: 5px;color: #8db5b7">注册</router-link>
  </van-cell-group>
</template>

<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import {successNotify, errorNotify} from "../../utils/notifyUtil.ts";
import {useStore} from "vuex";

const store = useStore()
const userAccount = ref()
const userPassword = ref()
const router = useRouter()

const onClick = async () => {
  const resp: any = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  if (resp.code === 0) {
    await successNotify('登陆成功')
    //存储token
    window.localStorage.setItem('token', resp.data.token)
    store.commit('changeLoginUser', resp.data)
    await router.push('/index')
  } else {
    errorNotify(resp.message)
  }
}

</script>

<style scoped>

</style>