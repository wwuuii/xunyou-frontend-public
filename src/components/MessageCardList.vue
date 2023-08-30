<template>
  <div v-for="message in store.state.privateMessageList">
    <van-row style="margin: 10px 10px 0 10px;" gutter="25" @click="toChat(message.senderId,message.unReadNum)">
      <van-col span="4">
        <van-badge :content="message.unReadNum" :max="99" :show-zero="false">
          <van-image
              round
              width="4rem"
              height="4rem"
              :src="message.userAvatar"
          />
        </van-badge>
      </van-col>
      <van-col span="20">
        <van-row style="font-size: 25px">{{ message.userName }}</van-row>
        <van-row style="font-size: 22px;color: #8a8c8c;margin-top: 10px">{{ message.messageContent }}</van-row>
      </van-col>

    </van-row>
    <van-divider :style="{ borderColor: '#e4e5e5'}"/>
  </div>

</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()

onMounted(() => {
})

const toChat = (receiverId, unReadNum) => {
  router.push({
    path: '/privateMessage',
    query: {
      receiverId,
      unReadNum
    }
  })
}
</script>

<style scoped>

</style>