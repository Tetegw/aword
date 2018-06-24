<template>
  <div class="profile-wrapper">
    <div class="avatar">
      <image mode="aspectFill" class="avatar-img" :src="userInfo.userPic" v-show="userInfo.userPic" />
      <button class="avatar-btn" open-type="getUserInfo" @getuserinfo="updateUserInfo" v-show="!hasUserInfo">微信头像</button>
    </div>
    <div class="nickname">{{userInfo.nickName}}</div>
    <div class="labels" :class="{'fixed': fixed}">
      <v-Labels @emitChooseItem="emitChooseItem" @emitConfirm="emitConfirm" :labelList="labelList"></v-Labels>
    </div>
    <div class="labels-fill" v-show="fixed"></div>
    <v-Works :currentCardList="currentCardList"></v-Works>
  </div>
</template>

<script>
import { upInfo, getUserLabelCard, currentUser, createLable, getUserLabels } from '@/bmob.js'
import store from '@/store.js'

import Labels from '@/components/labels.vue'
import Works from '@/components/works.vue'

export default {
  data () {
    return {
      boundingClientRectTop: 0,
      windowHeight: 0,
      fixed: false,
      ChooseItem: '默认',
      currentCardList: []
    }
  },
  created () {
    let _this = this
    wx.getSystemInfo({
      success (e) {
        _this.windowHeight = e.windowHeight + 'px'
      }
    })
  },
  onShow () {
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
  onPageScroll (e) {
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
        } else {
          store.commit('storeHasUserInfo', true)
        }
        store.commit('storeUserInfo', res)
        this.getSomeCard(res.objectId, this.ChooseItem)
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
    emitChooseItem (index, labelInfo) {
      this.ChooseItem = labelInfo
      this.getSomeCard(this.userInfo.objectId, labelInfo)
    },
    emitConfirm (payload) {
      wx.showLoading()
      createLable(payload).then((res) => {
        // 创建了，刷新label
        let userId = this.userInfo.objectId
        getUserLabels(userId).then((res) => {
          wx.hideLoading()
          store.commit('storeLabelList', res)
        }).catch((err) => {
          wx.hideLoading()
          console.log('获取用户列表失败', err)
        })
      }).catch((err) => {
        let title = err === '该分类已存在' ? err : '创建失败'
        wx.showToast({
          title: title,
          icon: 'none'
        })
      })
    },
    getSomeCard (userId, labelInfo) {
      wx.showLoading()
      console.log('获取labelInfo的数据', labelInfo)
      getUserLabelCard(userId, labelInfo).then((res) => {
        store.commit('storeLabelList', res.label)
        this.currentCardList = res.card
        wx.hideLoading()
      }).catch((err) => {
        wx.showToast({
          title: '查询失败',
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
.profile-wrapper {
  .avatar {
    margin: 36px auto 0;
    overflow: hidden;
    width: 54px;
    height: 54px;
    border: 2px solid #666;
    transform: rotate(-45deg) translateZ(0); /* 变换后border之间有距离，translateZ*/
    position: relative;
    .avatar-img,
    .avatar-btn {
      position: absolute;
      top: -15px;
      left: -15px;
      width: 84px;
      height: 84px;
      transform: rotate(45deg) translateZ(0);
    }
    .avatar-btn {
      font-size: 12px;
      padding-top: 33px;
      line-height: 1.5;
      color: #999;
    }
  }
  .nickname {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 15px;
    height: 22px;
    color: #666;
  }
  .labels {
    transition: all 0.3s;
  }
  .labels-fill {
    height: 40px;
  }
  .fixed {
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
