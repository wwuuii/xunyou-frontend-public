<template>
  <van-form @submit="onSubmit">
      <van-field
          inset
          v-if="editUser.isGender === 'false'"
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="'请输入' + editUser.editName"
      />
    <van-radio-group v-model="editUser.currentValue" direction="horizontal" v-if="editUser.isGender === 'true'">
      <van-radio name="0" style="margin-left: 90px">女</van-radio>
      <van-radio name="1" style="margin-left: 90px">男</van-radio>
    </van-radio-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import {successNotify, errorNotify} from "../../utils/notifyUtil.ts";
import {useStore} from "vuex";
import {getCurrentUser} from "../../services/user";

const store = useStore()
const editUser = ref({})
onMounted(async () => {
  editUser.value = {
    editKey: route.query.editKey,
    currentValue: route.query.currentValue,
    editName: route.query.editName,
    isGender: route.query.isGender
  }
})
const route = useRoute()
const router = useRouter()

const onSubmit = async () => {

  const resp:any = await myAxios.post('/user/update/my', {
    id: store.state.loginUser.id,
    [editUser.value.editKey]: editUser.value.currentValue
  })
  if (resp.code === 0) {
    successNotify('修改成功~')
    const user = await getCurrentUser()
    store.commit('changeLoginUser', user)
    await router.push('/user')

  } else {
    errorNotify(resp.message)
  }
}
</script>

<style scoped>

</style>