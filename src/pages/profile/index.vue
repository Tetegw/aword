<template>
  <div class="profile-wrapper" :class="{'scroll': scrolling}">
    <div class="user-info-wrapper">
      <div class="avatar">
        <image mode="aspectFill" class="avatar-img" :src="userInfo.userPic" v-show="userInfo.userPic" />
        <button class="avatar-btn" open-type="getUserInfo" @getuserinfo="updateUserInfo" v-show="!hasUserInfo">微信头像</button>
      </div>
      <div class="nickname">{{userInfo.nickName}}</div>
    </div>
    <div class="labels">
      <v-Labels @emitChooseItem="emitChooseItem" :labelList="labelList"></v-Labels>
    </div>
    <scroll-view scroll-y class="scroll-view-wrapper" @scroll="scrollViewScroll" @scrolltolower="scrollViewTolower" :lower-threshold="130">
      <v-Works :currentCardList="currentCardList" :noMore="noMore"></v-Works>
    </scroll-view>
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
      ChooseItem: '默认',
      currentCardList: [],
      scrolling: false,
      currentPage: 1,
      noMore: false,
      loadingCard: false
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
  onReachBottom () {
    console.log('触底')
  },
  onShow () {
    // APP.vue中一定是登录了，这里获取用户信息
    // 1. 没有头像，用户名，要求授权
    // 2. 信息齐全，不需要授权了
    this.getUserInfo()
    this.currentPage = 1
    this.noMore = false
    this.loadingCard = false
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
        wx.hideLoading()
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
      this.noMore = false
      this.loadingCard = false
      this.currentPage = 1
      this.getSomeCard(this.userInfo.objectId, labelInfo)
    },
    getSomeCard (userId, labelInfo, currentPage = 1) {
      wx.showLoading()
      getUserLabelCard(userId, labelInfo, currentPage).then((res) => {
        store.commit('storeLabelList', res.label)
        if (currentPage === 1) {
          this.currentCardList = res.card
        } else {
          this.currentCardList = this.currentCardList.concat(res.card)
        }
        if (res.card.length) {
          this.currentPage = res.currentPage
          if (this.currentCardList.length % 10) {
            this.noMore = true
          }
        } else {
          this.noMore = true
        }
        this.loadingCard = false
        wx.hideLoading()
      }).catch((err) => {
        console.log(err)
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
      })
    },
    scrollViewScroll (e) {
      if (e.target.scrollTop >= 10) {
        this.scrolling = true
      } else {
        this.scrolling = false
      }
    },
    scrollViewTolower () {
      if (this.loadingCard) {
        return
      }
      let userId = this.userInfo.objectId
      let labelInfo = this.ChooseItem
      let currentPage = this.currentPage
      if (!this.noMore) {
        this.loadingCard = true
        this.getSomeCard(userId, labelInfo, ++currentPage)
      }
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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  .user-info-wrapper {
    transition: all 0.5s;
    height: 160px;
    position: relative;
    .avatar {
      transition: all 0.5s;
      overflow: hidden;
      width: 54px;
      height: 54px;
      border: 2px solid #666;
      position: absolute;
      left: 50%;
      top: 36px;
      transform: translate3d(-50%, 0, 0) rotate(-45deg); /* 变换后border之间有距离，translateZ*/
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
      transition: all 0.5s;
      text-align: center;
      font-size: 15px;
      height: 22px;
      color: #666;
      position: absolute;
      top: 115px;
      left: 50%;
      transform: translate(-50%);
    }
  }
  .labels {
    transition: all 0.3s;
  }
  .labels-fill {
    height: 40px;
  }
  .scroll-view-wrapper {
    height: 450px;
  }
  @media screen and (max-width: 320px) {
    .scroll-view-wrapper {
      height: 430px;
    }
  }
  &.scroll {
    .user-info-wrapper {
      height: 104px;
      .avatar {
        transform: translate3d(-250%, -10px, 0) rotate(-45deg);
      }
      .nickname {
        transform: translate3d(-90%, -70px, 0);
      }
    }
  }
}
</style>
