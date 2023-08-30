<template>
  <van-nav-bar
      fixed
      :title="privateMessages?.receiverName"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="message-container" ref="scrollContainer">
    <div v-for="message in privateMessages?.messageContentRespDtos" :key="message.id">
      <div
          class="message-row"
          :class="[message.isSender ? 'sent-message' : 'received-message']"
          :style="{ width: message.isSender ? '100%' : 'auto' }"
      >
        <div class="avatar-container" v-if="!message.isSender">
          <img :src="privateMessages.receiverAvatar" class="avatar" alt="头像"/>
        </div>
        <div :class="[message.isSender ? 'message-content-sender' : 'message-content-receiver']">
          <p class="message-content">{{ message.messageContent }}</p>
        </div>
        <div class="avatar-container" v-if="message.isSender">
          <img :src="privateMessages.senderAvatar" class="avatar" alt="头像"/>
        </div>
      </div>
    </div>
  </div>
  <div class="input-container">
    <textarea
        @keyup.enter="sendMessage"
        v-model="waitSendMessage" class="message-input" placeholder="请输入消息内容">
    </textarea>
    <button class="send-button" @click="sendMessage">发送</button>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useStore} from "vuex";
import myAxios from "../../plugins/myAxios";
import {errorNotify} from "../../utils/notifyUtil";

interface MessageContentRespDto {
  id: number;
  isSender: boolean;
  messageContent: string;
  createTime: Date;
}

interface PrivateMessageRespDto {
  senderId: number;
  senderAvatar: string;
  receiverAvatar: string;
  receiverName: string;
  messageContentRespDtos: MessageContentRespDto[];
}

const store = useStore()
const route = useRoute()
const router = useRouter()
const waitSendMessage = ref('')
const privateMessages = ref<PrivateMessageRespDto>();
const receiverId = ref()
const unReadNum = ref()
const senderId = ref()
const ws = ref()
const scrollContainer = ref()

onMounted(async () => {
  await store.dispatch('changeActive', 'privateMessage')
  receiverId.value = route.query.receiverId
  unReadNum.value = route.query.unReadNum
  setTimeout(() => {
    scrollToBottom()
  }, 100);
  const resp: any = await myAxios.get(`/privateMessage/${receiverId.value}`)
  if (resp.code === 0) {
    privateMessages.value = resp.data
    senderId.value = resp.data.senderId
    const baseURL = import.meta.env.MODE === 'production' ? 'ws://xxxx' : 'ws://localhost:8102/api';
    ws.value = new WebSocket(`${baseURL}/privateMessage/${senderId.value}`);
    ws.value.onmessage = (message: any) => {
      console.log(1)
      if (message) {
        const data = JSON.parse(message.data)
        if (data.senderId === receiverId.value) {
          privateMessages.value.messageContentRespDtos.push({
            id: data.id,
            isSender: false,
            messageContent: data.content,
            createTime: new Date()
          })
        }
      }
    }
    //确认消息已读
    myAxios.post('/privateMessage/batchUpdateStatus')
    for (let i = 0; i < store.state.privateMessageList.length; i++) {
      if (store.state.privateMessageList[i].senderId == receiverId.value) {
        store.state.privateMessageList[i].unReadNum = 0
      }
    }
  } else {
    errorNotify(resp.message)
    if (resp.code === 40100) {
      await router.push('/userLogin')
    }
  }
})
const sendMessage = async () => {
  if (waitSendMessage.value.trim().length === 0) {
    errorNotify('不能发送空白消息~')
    waitSendMessage.value = '';
    return
  }
  const resp: any = await myAxios.post(`/privateMessage/sendMessage`, {
    message: waitSendMessage.value,
    receiverId: receiverId.value
  })
  if (resp.code !== 0) {
    errorNotify(resp.message)
  }
  const id = Math.floor(Math.random() * 1000000);
  privateMessages.value.messageContentRespDtos.push({
    id,
    isSender: true,
    messageContent: waitSendMessage.value,
    createTime: new Date()
  })
  waitSendMessage.value = '';
}

const scrollToBottom = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }
}

watch(privateMessages, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });

const onClickLeft = () => {
  router.back()
}
</script>

<style>
.message-container {
  margin-top: 40px;
  padding: 10px;
  overflow-y: scroll;
  max-height: 750px;
}

.message-row {
  display: flex;
  margin-bottom: 10px;
  max-width: 100%;
}

.sent-message {
  justify-content: flex-end;

}

.received-message {
  justify-content: flex-start;
}

.avatar-container {
  margin-right: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.message-content-sender {
  border-radius: 10px;
  display: inline-block;
  max-width: 60%;
  flex-grow: 1;
  text-align: right; /* 添加此行以右对齐发送者的消息 */
  background-color: #7ed0f3;
  margin-right: 10px;
  padding: 0 10px 0 10px;
}

.message-content-receiver {
  border-radius: 10px;
  display: inline-block;
  max-width: 60%;
  flex-grow: 1;
  text-align: left; /* 添加此行以右对齐发送者的消息 */
  background-color: #f2f6fc;
  padding: 0 10px 0 10px;
}

.message-content {
  font-size: 20px;
  /*line-height: 1.5;*/
  word-wrap: break-word;
}

.input-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
}

.message-input {
  flex: 1;
  padding: 11px 8px 0 8px;
  border-radius: 20px;
  resize: none;
}

.send-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  margin-left: 10px;
  margin-right: 15px;
  cursor: pointer;
}

/* 其他样式省略 */
</style>