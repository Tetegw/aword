<template>
  <div class="profile-wrapper" :class="{'scroll': scrolling}">
    <div class="user-info-wrapper">
      <div class="avatar">
        <image mode="aspectFill" class="avatar-img" :src="userInfo.userPic" v-show="userInfo.userPic" />
      </div>
      <div class="nickname">{{userInfo.nickName}}</div>
    </div>
    <div class="labels">
      <v-Labels @emitChooseItem="emitChooseItem" :labelList="labelList" :addBtn="false"></v-Labels>
    </div>
    <scroll-view scroll-y class="scroll-view-wrapper" @scroll="scrollViewScroll" @scrolltolower="scrollViewTolower" :lower-threshold="130">
      <v-Works :currentCardList="currentCardList" :noMore="noMore"></v-Works>
    </scroll-view>
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
      currentCardList: [],
      scrolling: false,
      currentPage: 1,
      noMore: false,
      loadingCard: false,
    }
  },
  onLoad (options) {
    this.getUserInfo(options.id)
    this.getLabels(options.id)
  },
  onShow () {
    this.currentPage = 1
    this.noMore = false
    this.loadingCard = false
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
      this.currentPage = 1
      this.noMore = false
      this.loadingCard = false
      this.getSomeCard(this.userInfo.objectId, this.ChooseItem)
    },
    getSomeCard (userId, labelInfo, currentPage = 1) {
      getUserLabelCard(userId, labelInfo, currentPage).then((res) => {
        if (currentPage === 1) {
          this.currentCardList = res.card
        } else {
          this.currentCardList = this.currentCardList.concat(res.card)
        }
        if (res.card.length) {
          this.currentPage = res.currentPage
        } else {
          console.log('已无再多数据')
          this.noMore = true
        }
        this.loadingCard = false
      }).catch((err) => {
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
