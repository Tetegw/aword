<template>
  <div>
    <p>{{userInfo.nickName}}</p>
    <button open-type="getUserInfo" @getuserinfo="updateUserInfo" v-show="!hasUserInfo">获取头像昵称</button>
    <image class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover"/>
    <text class="userinfo-nickname">{{userInfo.nickName}}</text>
  </div>
</template>

<script>
import { auth, upInfo, updateStorage, currentUser } from '@/bmob.js'
import store from '@/store.js'

export default {
  data () {
    return {
    }
  },
  computed: {
    userInfo () {
      return store.state.userInfo
    },
    hasUserInfo () {
      return store.state.hasUserInfo
    }
  },
  methods: {
    // 更新第三方服务器用户信息
    updateUserInfo (e) {
      upInfo(e.target.userInfo).then((res) => {
        console.log('第三方更新用户信息成功', res)
        store.commit('storeUserInfo', e.target.userInfo)
        store.commit('storeHasUserInfo', true)
      }).catch((err) => {
        console.log('第三方更新用户信息失败', err)
      })
    }
  }
}
</script>

<style scoped>
</style>
