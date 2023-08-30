<template>
  <van-row gutter="20" @click="toUserDetail">
    <van-col span="7">
      <van-image
          width="100"
          height="100"
          round
          :src="store.state.loginUser.userAvatar"/>
    </van-col>
    <van-col span="17">
      <van-row style="margin-top: 20px;padding: 5px;font-size: 20px">{{ store.state.loginUser.userName }}</van-row>
      <van-row gutter="4">
        <van-col v-for="tag in store.state.loginUser.tags">
          <van-tag plain type="primary">{{tag}}</van-tag>
        </van-col>
      </van-row>
      <van-row style="font-size: 15px;color: #737777;padding: 5px">账号：{{ store.state.loginUser.userAccount }}</van-row>
    </van-col>
  </van-row>
  <van-row>
    <van-cell style="font-size: 15px" title="个人信息" is-link icon="contact"
      to="/user/detail"/>
  </van-row>
  <van-row>
    <van-cell style="font-size: 15px" title="我创建的队伍" is-link icon="friends-o" to="/team/create"/>
  </van-row>
  <van-row>
    <van-cell style="font-size: 15px" title="我加入的队伍" is-link icon="friends-o" to="/team/join"/>
  </van-row>

  <van-row>
    <van-button @click="logout" type="primary" round style="width: 100%;">退出登陆</van-button>
  </van-row>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import myAxios from "../../plugins/myAxios.js";
import {errorNotify, successNotify} from "../../utils/notifyUtil";

const router = useRouter();
//获取当前登陆用户
const store = useStore()

onMounted(async () => {
  await store.dispatch('changeActive', 'user')
  if (!store.state.loginUser.id) {
    await router.push('/userLogin')
    errorNotify('请登陆~')
  }
})

const toUserDetail = () => {
  router.push('/user/detail')
}
/**
 * 退出登陆
 */
const logout = async () => {
  const resp: any = await myAxios.post('/user/logout')
  if (resp.code === 0) {
    await router.push('/userLogin')
    successNotify('退出成功')
  } else {
    errorNotify(resp.message)
  }
}
</script>

<style scoped>

</style>