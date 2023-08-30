<template>
  <van-search v-model="searchText" placeholder="请输入队伍名称" @search="onSearch(searchText)"/>
  <TeamCardList :team-list="teamList"/>

</template>

<script setup lang="ts">
import {useStore} from "vuex";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import TeamCardList from "../../components/TeamCardList.vue";
import myAxios from "../../plugins/myAxios.ts";
import {errorNotify} from "../../utils/notifyUtil.ts";


const store = useStore()
const router = useRouter()
const teamList = ref([])
const searchText = ref('')

onMounted(async () => {
  await store.dispatch('changeActive', 'team')
  await listTeam()
})

const listTeam = async (name?: string) => {
  const resp: any = await myAxios.get('/team/list/my/join', {
    params: {
      name
    }
  })
  if (resp.code === 0) {
    teamList.value = resp.data
  } else {
    if (resp.code === 40100) {
      errorNotify(resp.message)
      await router.push('/userLogin')
    }
  }
}
const onSearch = (searchText) => {
  listTeam(searchText)
}
</script>

<style scoped>

</style>