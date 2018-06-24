<template>
  <div class="profile-wrapper">
    <div class="avatar">
      <image mode="aspectFill" class="avatar-img" :src="userInfo.userPic" v-show="userInfo.userPic" />
    </div>
    <div class="nickname">{{userInfo.nickName}}</div>
    <div class="labels" :class="{'fixed': fixed}">
      <v-Labels @emitChooseItem="emitChooseItem" :labelList="labelList" :addBtn="false"></v-Labels>
    </div>
    <div class="labels-fill" v-show="fixed"></div>
    <v-Works :currentCardList="currentCardList"></v-Works>
  </div>
</template>

<script>
import { getUserLabels, getOneUserInfo, getUserLabelCard } from '@/bmob.js'

import Labels from '@/components/labels.vue'
import Works from '@/components/works.vue'

export default {
  data () {
    return {
      userInfo: {},
      labelList: [],
      ChooseItem: '默认',
      currentCardList: []
    }
  },
  onLoad (options) {
    this.getUserInfo(options.id)
    this.getLabels(options.id)
  },
  methods: {
    getUserInfo (userId) {
      getOneUserInfo(userId).then((res) => {
        this.userInfo = res
        this.getSomeCard(this.userInfo.objectId, this.ChooseItem)
      }).catch((err) => {
        wx.showToast({
          title: '网络异常，请稍后再试',
          icon: 'none'
        })
      })
    },
    getLabels (userId) {
      getUserLabels(userId).then((res) => {
        this.labelList = res
      }).catch((err) => {
        wx.showToast({
          title: '网络异常，请稍后再试',
          icon: 'none'
        })
      })
    },
    emitChooseItem (index, labelInfo) {
      this.ChooseItem = labelInfo
      this.getSomeCard(this.userInfo.objectId, this.ChooseItem)
    },
    getSomeCard (userId, labelInfo) {
      wx.showLoading()
      getUserLabelCard(userId, labelInfo).then((res) => {
        wx.hideLoading()
        this.currentCardList = res.card
        console.log(this.currentCardList)
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
