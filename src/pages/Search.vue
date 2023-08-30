<template>
  <form action="/">
    <van-search
        v-model="value"
        placeholder="请输入标签关键词"
        show-action
        @keyup.enter="onSearch"
        @search="onSearch"
        @cancel="cancel"
    />
  </form>
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
  <van-button type="primary" @click="onSearch" style="width: 100%;" round>搜索伙伴</van-button>
</template>

<script setup lang="ts">
  import {ref, watch, onMounted} from 'vue'
  import {useRouter} from 'vue-router'
  import myAxios from "../plugins/myAxios";
  import {errorNotify} from "../utils/notifyUtil";

  const router = useRouter()
  const originItems = ref([]);
  const items = ref([])
  onMounted(async () => {
    const resp:any = await myAxios.get('/tag/list')
    if (resp.code === 0) {
      originItems.value = resp.data
      items.value = [...resp.data]
    } else {
      errorNotify(resp.message)
    }
  })
  //搜索框
  const value = ref('')
  const onSearch = () => {
    router.push({
      path:'/userResult',
      query: { tags: activeIds.value.map(id => getTagNameById(id)) }
    })
  }
  watch(() => value.value, (newValue) => {
    //过滤标签
    items.value = originItems.value.map(item => {
      const tempChild = [...item.children]
      const tempParent = {...item}
      tempParent.children = tempChild.filter(child => child.text.includes(newValue))
      return tempParent
    })
  });

  const cancel = () => {
    items.value = [...originItems.value]
    value.value = ''
  }

  //已选标签
  const close = (tag) => {
    activeIds.value = activeIds.value.filter(id => id !== tag)
  }
  //可选标签
  const activeIds = ref([])
  const activeIndex = ref(0)
  interface ChildTag {
    id:number;
    text:string;
  }
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
</script>

<style>
/* 添加这段样式后，Primary Button 会变成红色 */
:root{
  --van-tree-select-item-active-color: #1989fa;
  --van-sidebar-selected-border-color: #1989fa;
}
</style>