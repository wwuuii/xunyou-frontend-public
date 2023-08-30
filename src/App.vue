<template>
  <BasicLayout>
  </BasicLayout>
</template>
<script setup lang="ts">
import BasicLayout from "./layouts/BasicLayout.vue";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "./services/user";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {errorNotify} from "./utils/notifyUtil";
import myAxios from "./plugins/myAxios";

const router = useRouter()
const store = useStore()
const ws = ref()
onMounted(async () => {
  const baseURL = import.meta.env.MODE === 'production' ? 'ws://xxx' : 'ws://localhost:8102/api';
  const getCurrentUserResp: any = await getCurrentUser()
  if (getCurrentUserResp) {
    store.commit('changeLoginUser', getCurrentUserResp)
    //获取私信消息列表
    await getPrivateMessage(getCurrentUserResp.id)
    ws.value = new WebSocket(`${baseURL}/globalWS/${getCurrentUserResp.id}`);
    ws.value.onmessage = (message: any) => {
      const data = JSON.parse(message.data)
      for (let i = 0; i < store.state.privateMessageList.length; i++) {
        if (store.state.privateMessageList[i].senderId == data.senderId) {
          store.state.privateMessageList[i].unReadNum++;
          store.state.privateMessageList[i].messageContent = data.content
          break
        }
      }
    }
  } else {
    await errorNotify('请先登陆~')
    await router.push('/userLogin')
  }
})

const getPrivateMessage = async (id) => {
  const resp: any = await myAxios.get(`/userMessage/getMessageList?receiverId=${id}`)
  if (resp.code === 0) {
    store.state.privateMessageList = resp.data
  } else {
    errorNotify(resp.message)
  }
}
</script>
<style scoped>

</style>
