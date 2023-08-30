<template>
  <van-card
      id="teamCardList"
      v-for="team in teamList"
      :index="team.id"
      :desc="team.description"
      :title="team.name"
      thumb="https://ts1.cn.mm.bing.net/th/id/R-C.7ee2d80d0db2f787fed339d64eb6499b?rik=L%2bcPVmZBtmnGhw&riu=http%3a%2f%2fp6.zbjimg.com%2ftask%2f2012-08%2f21%2f1954425%2f503288c32ffe6.jpg&ehk=NLTxkBC%2frhd4Ok4N2sp8lQaFWZlMl1cHosGE1rKMaf0%3d&risl=&pid=ImgRaw&r=0"
  >
    <template #tags>
      <van-tag
          roundF
          plain type="primary" style="margin-right: 8px; margin-top: 8px">
        {{
          team.status === 0 ? '公开' : team.status === 1 ? '私有' : '加密'
        }}
      </van-tag>
    </template>
    <template #bottom>

      <div>
        {{ '已加入人数:' + team.hasJoinNum + ' &nbsp;  &nbsp;最大人数:' + team.maxNum }}
      </div>
      <div>
        {{
          '过期时间：' + formatDate(team.expireTime)

        }}
      </div>
      <div>
        {{ '创建时间：' + formatDate(team.createTime) }}
      </div>
    </template>
    <template #footer>
      <van-button v-if="store.state.loginUser.id === team.userId" size="mini" type="success" round @click="doUpdateTeam(team.id)">
        更新队伍
      </van-button>
      <van-button v-if="!team.userIds.includes(store.state.loginUser.id)" size="mini" type="primary" @click="show = true"
                  round>加入队伍
      </van-button>
      <van-button v-else size="mini" type="warning" @click="doQuitTeam(team.id, team.name)" round>退出队伍</van-button>
      <van-button v-if="store.state.loginUser.id === team.userId" size="mini" type="danger" round @click="doDissolve(team.id, team.name)">
        解散队伍
      </van-button>
      <van-dialog v-model:show="show" show-cancel-button @confirm="doJoinTeam(team.id)">
        <van-cell-group inset>
          <van-field v-model="password" required clearable
                     size="large" colon placeholder="请输入密码" />
        </van-cell-group>
      </van-dialog>
    </template>
  </van-card>
  <van-empty v-if="teamList === null || teamList.length === 0">数据为空</van-empty>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref } from 'vue'
import {TeamType} from "../models/team";
import myAxios from "../plugins/myAxios";
import {successNotify, errorNotify} from "../utils/notifyUtil";
import {useRouter} from "vue-router";
import {Dialog } from 'vant'
import {useStore} from "vuex";

const store = useStore()
const router = useRouter()
const show = ref(false);
const password = ref('')
interface TeamCardListProps {
  teamList: TeamType[];
}

defineProps<TeamCardListProps>();
const formatDate = (time) => {
  const date = new Date(time);
  return `${date.getFullYear()}年${date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}月${date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate()}日 ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
}

/**
 * 加入队伍
 */
const doJoinTeam = async (id: number) => {
  const res: any = await myAxios.post('/team/join', {
    teamId: id,
    password: password.value
  });
  if (res?.code === 0) {
    await successNotify('加入成功！')
    await router.push('/index')
  } else {
    errorNotify(res.message)
  }
}

/**
 * 修改队伍
 */
const doUpdateTeam = (id) => {
  router.push({
    path: '/team/update',
    query: {
      id
    }
  })
}



/**
 * 退出队伍
 */
const doQuitTeam = async (teamId, teamName) => {
  Dialog.confirm({
    title: `退出队伍:${teamName}`,
    message:
        '是否确认退出？',
  })
      .then(async () => {
        const resp:any = await myAxios.post('/team/quit', {
          teamId
        })
        if (resp.code === 0) {
          await successNotify("退出成功！")
          await router.push('/index')
        } else {
          errorNotify(resp.message)
        }
      })
      .catch(() => {
        // on cancel
      });
}

/**
 * 解散队伍
 */
const doDissolve = async (id, teamName) => {
  Dialog.confirm({
    title: `解散队伍:${teamName}`,
    message:
        '是否确认解散？',
  })
      .then(async () => {
        const resp:any = await myAxios.delete('/team/delete', {
          params:{
            id
          }
        })
        if (resp.code === 0) {
          await successNotify("解散成功！")
          await router.push('/index')
        } else {
          errorNotify(resp.message)
        }
      })
      .catch(() => {
        // on cancel
      });
}
</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>