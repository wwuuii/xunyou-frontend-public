<template>
  <MessageCardList/>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import MessageCardList from "../../components/MessageCardList.vue";


const router = useRouter()
const store = useStore()

onMounted(async () => {
  await store.dispatch('changeActive', 'message')
})
</script>

<style scoped>

</style>