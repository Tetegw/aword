<template>
  <div class="profile-wrapper">
    <div class="avatar">
      <image mode="aspectFill" class="avatar-img" :src="userInfo.avatarUrl" v-show="userInfo.avatarUrl"/>
      <button class="avatar-btn" open-type="getUserInfo" @getuserinfo="updateUserInfo" v-show="!hasUserInfo">微信头像</button>
    </div>
    <div class="nickname">{{userInfo.nickName}}</div>
    <div class="labels" :class="{'fixed': fixed}">
      <v-Labels
        @emitChooseItem="emitChooseItem"
      ></v-Labels>
    </div>
    <div class="labels-fill" v-show="fixed"></div>
    <v-Works></v-Works>
  </div>
</template>

<script>
import { auth, upInfo, updateStorage, currentUser } from '@/bmob.js'
import store from '@/store.js'

import Labels from '@/components/labels.vue'
import Works from '@/components/works.vue'

export default {
  data () {
    return {
      boundingClientRectTop: 0,
      windowHeight: 0,
      fixed: false
    }
  },
  created () {
    let _this = this
    wx.getSystemInfo({
      success(e) {
        _this.windowHeight = e.windowHeight + 'px'
      }
    })
  },
  mounted () {
    wx.createSelectorQuery().select('#tab-wrapper').boundingClientRect((rect) => {
      this.boundingClientRectTop = rect.top
    }).exec()
  },
  onPageScroll(e) {
    if (e.scrollTop >= this.boundingClientRectTop) {
      this.fixed = true
    } else {
      this.fixed = false
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
    },
    emitChooseItem(index) {
      console.log('选择了,', index)
    }
  },
  components: {
    'v-Labels': Labels,
    'v-Works': Works
  }
}
</script>

<style scoped lang="less">
.profile-wrapper{
  .avatar{
    margin: 36px auto 0;
    overflow: hidden;
    width: 54px;
    height: 54px;
    border: 2px solid #666;
    transform: rotate(-45deg) translateZ(0);  /* 变换后border之间有距离，translateZ*/
    position: relative;
    .avatar-img, .avatar-btn{
      position: absolute;
      top: -15px;
      left: -15px;
      width: 84px;
      height: 84px;
      transform: rotate(45deg) translateZ(0);
    }
    .avatar-btn{
      font-size: 12px;
      padding-top: 33px;
      line-height: 1.5;
      color: #999;
    }
  }
  .nickname{
    text-align: center;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 15px;
    height: 22px;
    color: #666;
  }
  .labels{
    transition: all 0.3s;
  }
  .labels-fill{
    height: 40px;
  }
  .fixed{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
}

</style>
