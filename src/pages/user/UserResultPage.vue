<template>
  <UserCardList :user-list="userList"/>
</template>

<script setup lang="ts">
  import {useRoute} from 'vue-router';
  import {onMounted, ref } from "vue";
  import myAxios from "../../plugins/myAxios";
  import UserCardList from "../../components/UserCardList.vue";

  const route = useRoute()
  const {tags} = route.query
  const userList = ref([])
  onMounted(() => {
    myAxios.post('/user/searchUserByTags', tags
    ).then(resp => {
      if (resp.code === 0) {
        userList.value = resp.data
      }
    }).catch(e => {
      console.log(e)
    });

  })

</script>

<style scoped>

</style>