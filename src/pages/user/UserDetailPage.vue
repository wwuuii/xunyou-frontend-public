<template>
  <van-cell title="昵称" is-link :value="store.state.loginUser?.userName"
            @click="toEdit('userName', '姓名', store.state.loginUser.userName, false)"/>
  <van-cell title="账号" :value="store.state.loginUser?.userAccount"/>
  <van-cell title="头像">
    <van-uploader :after-read="onRead" :max-size="1 * 1000 * 1000" @oversize="onOversize">
      <img :src="store.state.loginUser?.userAvatar" style="height: 48px" alt="加载失败"/>
    </van-uploader>
  </van-cell>
  <van-cell title="标签" is-link to="/updateTag">
    <van-tag style="margin-left: 5px" plain type="primary" v-for="tag in store.state.loginUser.tags">{{ tag }}</van-tag>
  </van-cell>
  <van-cell title="性别" is-link :value="store.state.loginUser?.gender === 0 ? '女' : '男'"
            @click="toEdit('gender', '性别', store.state.loginUser.gender, true)"/>
  <van-cell title="电话" is-link :value="store.state.loginUser?.phone"
            @click="toEdit('phone', '电话', store.state.loginUser.phone.toString(), false)"/>
  <van-cell title="邮箱" is-link :value="store.state.loginUser?.email"
            @click="toEdit('email', '邮箱', store.state.loginUser.email, false)"/>
  <van-cell title="注册时间" is-link
            :value="store.state.loginUser?.createTime ? store.state.loginUser?.createTime.split('T')[0] : new Date().toISOString().split('T')[0]"/>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {useStore} from "vuex";
import myAxios from "../../plugins/myAxios";
import {errorNotify, successNotify} from "../../utils/notifyUtil";
import {getCurrentUser} from "../../services/user";

const router = useRouter();
//获取当前登陆用户
const store = useStore()
onMounted(async () => {
  await store.dispatch('changeActive', 'user')
})


const toEdit = async (editKey, editName, currentValue, isGender) => {
  await router.push({
    path: '/userEdit',
    query: {
      editKey,
      editName,
      currentValue,
      isGender
    }
  })
}

const onOversize = () => {
  errorNotify("文件大小不能超过1M")
}
//修改头像
const onRead = async (file) => {
  let formData = new FormData();
  formData.append("multipartFile", file.file);
  const params = {
    biz: "user_avatar", // 必传字段
  }
  const resp: any = await myAxios.post('/file/upload', formData, {
    params,
    headers: {
      "Content-Type": "multipart/form-data" // 设置请求头为 multipart/form-data
    }})
  if (resp.code === 0) {
    successNotify('头像修改成功');
    const user = await getCurrentUser()
    store.commit('changeLoginUser', user)
  } else {
    errorNotify(resp.message)
  }
}

</script>

<style scoped>

</style>