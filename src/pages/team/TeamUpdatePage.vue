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
          v-model="expireTime"
          required
          type="date"
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
            <van-radio :name=TeamStatusEnum.PUBLIC>公开</van-radio>
            <van-radio :name=TeamStatusEnum.PRIVATE>私有</van-radio>
            <van-radio :name=TeamStatusEnum.PASSWORD>加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-if="addTeamData.status === TeamStatusEnum.PASSWORD"
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

import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import {onMounted, ref} from "vue";
import {successNotify, errorNotify} from "../../utils/notifyUtil.ts";
import {TeamStatusEnum} from "../../models/team.d.ts";

const router = useRouter();
const route = useRoute();
const expireTime = ref()

// 需要用户填写的表单数据
const addTeamData = ref({})

const id = route.query.id;

//获取之前队伍的信息
onMounted(async () => {
  if (id <= 0) {
    errorNotify("队伍加载失败")
    return;
  }
  const res:any = await myAxios.get("/team/get", {
    params: {
      id: id,
    }
  });
  if (res?.code === 0) {
    addTeamData.value = res.data;
    expireTime.value = addTeamData.value.expireTime.split('T')[0]
  } else {
    errorNotify(res.message);
  }
})

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    expireTime:expireTime.value
  }
  const res:any = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    successNotify('更新成功');
    await router.push({
      path: '/team',
      replace: true,
    });
  } else {
    errorNotify('更新失败');
  }
}
</script>

<style scoped>
</style>