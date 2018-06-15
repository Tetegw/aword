<template>
  <div class="profile-wrapper">
    <div class="avatar">
      <image mode="aspectFill" class="avatar-img" :src="userInfo.userPic" v-show="userInfo.userPic"/>
      <button class="avatar-btn" open-type="getUserInfo" @getuserinfo="updateUserInfo" v-show="!hasUserInfo">微信头像</button>
    </div>
    <div class="nickname">{{userInfo.nickName}}</div>
    <div class="labels" :class="{'fixed': fixed}">
      <v-Labels
        @emitChooseItem="emitChooseItem"
        :labelList="labelList"
      ></v-Labels>
    </div>
    <div class="labels-fill" v-show="fixed"></div>
    <v-Works
      :currentCardList="cardObject[`card_${ChooseItem}`]"
    ></v-Works>
  </div>
</template>

<script>
import { upInfo, findCollectCards, getUserLabelCard, currentUser } from '@/bmob.js'
import store from '@/store.js'

import Labels from '@/components/labels.vue'
import Works from '@/components/works.vue'

export default {
  data () {
    return {
      boundingClientRectTop: 0,
      windowHeight: 0,
      fixed: false,
      ChooseItem: '默认'
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
  onLoad () {
    // APP.vue中一定是登录了，这里获取用户信息
    // 1. 没有头像，用户名，要求授权
    // 2. 信息齐全，不需要授权了
    this.getUserInfo()
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
    },
    cardObject () {
      return store.state.cardObject
    },
    labelList () {
      return store.state.labelList
    }
  },
  methods: {
    // 获取当前登录用户信息
    getUserInfo () {
      wx.showLoading()
      currentUser().then((res) => {
        console.log('第三方用户信息获取成功', res)
        if (!res.nickName || !res.userPic) {
          // 要求授权
          store.commit('storeHasUserInfo', false)
          wx.hideLoading()
        } else {      
          store.commit('storeUserInfo', res)
          store.commit('storeHasUserInfo', true)
          // 存储了用户信息后，获取默认
          // 1. 第一次授权后执行
          // 2. 数据库有用户头像了，登录成功后，直接获取
          this.getDefaultCard(res.objectId)
        }
      }).catch((err) => {
        wx.hideLoading()
        console.log('第三方用户信息获取失败', err)
      })
    },
    // 数据库没头像，第一次进入才会执行，更新第三方服务器用户信息
    updateUserInfo (e) {
      console.log('用户信息===>', e)
      upInfo(e.target.userInfo).then((res) => {
        console.log('第三方更新用户信息成功', res)
        // 授权后重新获取一次当前用户信息
        this.getUserInfo()
      }).catch((err) => {
        console.log('第三方更新用户信息失败', err)
      })
    },
    emitChooseItem(index, labelInfo, last) {
      // console.log('选择了,',index, labelInfo, last)
      this.ChooseItem = labelInfo
      // 如果cardObject[`card_${ChooseItem}`]已存在，不再请求
      if (this.cardObject[`card_${this.ChooseItem}`]) {
        return
      }
      if (last) {
        this.getCollect()
      } else {
        this.getSomeCard(this.userInfo.objectId, labelInfo)
      }
    },
    getDefaultCard (userId) {
      getUserLabelCard(userId).then((res) => {
        store.commit('storeLabelList', res.label)
        store.commit('storeCardObject', {labelInfo: this.ChooseItem, card: res.card})
        wx.hideLoading()
      }).catch((err) => {
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
      })
    },
    getSomeCard (userId, labelInfo) {
      wx.showLoading()
      getUserLabelCard(userId, labelInfo).then((res) => {
        store.commit('storeCardObject', {labelInfo: labelInfo, card: res.card})
        wx.hideLoading()
      }).catch((err) => {
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
      })
    },
    getCollect () {
      wx.showLoading()
      findCollectCards().then((res) => {
        store.commit('storeCardObject', {labelInfo: this.ChooseItem, card: res})
        wx.hideLoading()
      }).catch((err) => {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      })
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
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
  }
}

</style>
