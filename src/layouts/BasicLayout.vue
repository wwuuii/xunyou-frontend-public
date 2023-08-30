<template>
  <van-nav-bar
      v-if="store.state.active !== 'privateMessage'"
      title="寻友"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template v-slot:right>
      <van-icon name="search"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>
  <van-tabbar v-model="store.state.active"  v-if="store.state.active !== 'privateMessage'">
    <van-tabbar-item icon="home-o" name="index" to="/index">主页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="team" to="/team">队伍</van-tabbar-item>
    <van-tabbar-item name="message">
      <van-badge :content="store.state.privateMessageList.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.unReadNum), 0)" max="99" :show-zero="false" >
        <van-tabbar-item icon="comment-o" to="/message" :class="store.state.active === 'message' ? 'highLight' : ''">消息</van-tabbar-item>
      </van-badge>
    </van-tabbar-item>
    <van-tabbar-item icon="user-o" name="user" to="/user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useStore} from "vuex";

const store = useStore()
const router = useRouter()


const onClickLeft = () => {
  router.back()
}
const onClickRight = () => {
  router.push('/search')
}

</script>

<style scoped>
#content {
  padding-bottom: 80px;
}
.highLight {
  color: #1989fa;
}
</style>