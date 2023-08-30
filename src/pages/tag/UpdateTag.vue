<template>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-show="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="id in activeIds" :index="id" >
      <van-tag closeable size="medium" plain @close="close(id)">
        {{getTagNameById(id)}}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">可选标签</van-divider>
  <div id="selectTree">
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="items"
    />
  </div>
  <van-button type="primary" @click="updateTags" style="width: 100%;" round>确认</van-button>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import myAxios from "../../plugins/myAxios";
import {errorNotify, successNotify} from "../../utils/notifyUtil";
import store from "../../store";

interface ChildTag {
  id:number;
  text:string;
}
const router = useRouter()
const getTagNameById = (id) => {
  const children:ChildTag[] = items.value.flatMap(item => item.children)
  let result = ''
  for (const child of children) {
    if (child.id === id) {
      result = child.text
    }
  }
  return result;
}

//已选标签
const close = (tag) => {
  activeIds.value = activeIds.value.filter(id => id !== tag)
}
//可选标签
const activeIds = ref([])
const activeIndex = ref(0)

const items = ref([])
onMounted(async () => {
  const resp:any = await myAxios.get('/tag/list')
  if (resp.code === 0) {
    items.value = resp.data
  } else {
    errorNotify(resp.message)
  }
  if (store.state.loginUser.tags) {
    const activeTagIdsResp:any = await myAxios.post('/tag/getTagIds',store.state.loginUser.tags)
    if (activeTagIdsResp.code === 0) {
      activeIds.value = activeTagIdsResp.data
    }
  }

})

const updateTags = async () => {
  const resp:any = await myAxios.post('/user/updateUserTags', activeIds.value)
  if (resp.code === 0) {
    successNotify('修改成功~')
    await router.push('/user/detail')
  } else {
    errorNotify(resp.message)
  }
}
</script>

<style>
/* 添加这段样式后，Primary Button 会变成红色 */
:root{
  --van-tree-select-item-active-color: #1989fa;
  --van-sidebar-selected-border-color: #1989fa;
}
</style>