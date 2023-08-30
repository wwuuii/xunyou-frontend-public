<template>
  <van-form>
    <van-cell-group>
      <van-field
          name="name"
          v-model="addTeamData.name"
          required
          clearable
          type="text"
          label="队伍名"
          placeholder="请输入队伍名"
      />

      <van-field
          name="description"
          v-model="addTeamData.description"
          required
          type="textarea"
          clearable
          label="队伍描述"
          autosize
          placeholder="请输入队伍描述"
      />

      <van-field
          name="expireTime"
          v-model="addTeamData.expireTime"
          required
          type="date"
          @blur="checkExpireTime"
          label="过期时间"
      />
      <van-field name="stepper" label="最大人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" max="10" min="2"/>
        </template>
      </van-field>
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio :name=TeamStatusEnum.PUBLIC.toString()>公开</van-radio>
            <van-radio :name=TeamStatusEnum.PRIVATE.toString()>私有</van-radio>
            <van-radio :name=TeamStatusEnum.PASSWORD.toString()>加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-if="addTeamData.status === TeamStatusEnum.PASSWORD.toString()"
          name="password"
          v-model="addTeamData.password"
          required
          label="队伍密码"
      />
    </van-cell-group>
    <van-button type="primary" round style="width: 100%" @click="onSubmit">提交</van-button>
  </van-form>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {successNotify, errorNotify} from "../../utils/notifyUtil.ts";
import {TeamStatusEnum} from "../../models/team.d.ts";

const router = useRouter();

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": new Date().toISOString().split('T')[0],
  "maxNum": 3,
  "password": "",
  "status": 0,
}


// 需要用户填写的表单数据
const addTeamData = ref({...initFormData})

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  const res:any = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data){
    successNotify('创建成功')
    await router.push({
      path: '/team',
      replace: true,
    });
  } else {
    errorNotify(res.message)
  }
}

const checkExpireTime = () => {
  const currentTime = new Date()
  const inputTime = new Date(addTeamData.value.expireTime)
  if (currentTime > inputTime) {
    addTeamData.value.expireTime = currentTime.toISOString().split('T')[0]
  }
}

</script>

<style scoped>
</style>
