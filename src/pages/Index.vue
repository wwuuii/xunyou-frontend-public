<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="checked" size="24" @change="changeModel"/>
    </template>
  </van-cell>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <UserCardList :user-list="userList"/>
  </van-list>
</template>

<script setup lang="ts">
import {useStore} from 'vuex'
import {onMounted, ref, watch} from "vue";
import UserCardList from "../components/UserCardList.vue";
import myAxios from "../plugins/myAxios.ts";
import {errorNotify} from "../utils/notifyUtil.ts";
import {useRouter} from "vue-router";

const store = useStore()
const userList = ref([])
const router = useRouter();
const checked = ref(false);
const loading = ref(false);
const finished = ref(false);
const pageNum = ref(1)

const onLoad = async () => {
  await getUserList()
  pageNum.value = pageNum.value + 1
  loading.value = false;
}
onMounted(async () => {
  await store.dispatch('changeActive', 'index')
})
const changeModel = () => {
  pageNum.value = 1
  userList.value = []
  getUserList()
}
const getUserList = async () => {
  let url = ''
  if (checked.value) {
    url = '/user/match'
  } else {
    url = '/user/recommend'
  }
  const resp: any = await myAxios.get(url + `?pageNum=${pageNum.value}`)
  if (resp.code === 0) {
    if (resp.data.length === 0) {
      finished.value = true
    }
    userList.value = [...userList.value, ...resp.data]
  } else {
    errorNotify(resp.message)
    if (resp.code === 40100) {
      await router.push('/userLogin')
    }
  }
}
</script>

<style scoped>

</style>
