<template>
  <van-card
      v-for="user in userList"
      :index="user.id"
      :desc="user.userProfile"
      :title="user.userName"
      :thumb="user.userAvatar"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px" >
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini" @click="doSendMessage(user.id)">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="userList === null || userList.length === 0">搜索结果为空</van-empty>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
import {useRouter} from "vue-router";
import {useStore} from "vuex";

interface UserCardListProps {
  userList: []
}

const router = useRouter()
const store = useStore()
const doSendMessage = (receiverId) => {
  store.dispatch('changeActive', 'privateMessage')
  router.push({
    path: '/privateMessage',
    query:{
      receiverId
    }
  })
}
defineProps<UserCardListProps>()
</script>

<style scoped>

</style>