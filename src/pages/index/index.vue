<template>
  <div class="index-wrapper">
    <swiper class="swiper" @touchstart="touchstart" @touchend="touchend" @animationfinish="swiperChange" :current="currentIndex">
      <block v-for="(item, index) in pictureList" :key="index">
        <swiper-item @click="selectPicture(item)">
          <div class="swiper-item">
            <v-Picture :PictureInfo="item"></v-Picture>
          </div>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
import Picture from '@/components/picture.vue'
import { findCards, auth, createLable } from '@/bmob.js'
import store from '@/store.js'

export default {
  data () {
    return {
      pictureList: [],
      currentPage: 1,
      size: 10,
      currentIndex: 0
    }
  },
  computed: {
    deleteCardSuccess () {
      return store.state.deleteCardSuccess
    }
  },
  onLoad () {
    this.findAllCards()
    this.login()
  },
  onShareAppMessage () {
    return {
      title: '一言以蔽之',
      path: '/pages/index/main'
    }
  },
  onShow () {
    if (this.deleteCardSuccess) {
      this.findAllCards()
      store.commit('storeDeleteCardSuccess', false)
    }
  },
  methods: {
    findAllCards (currentPage = 1) {
      wx.showLoading()
      findCards(currentPage).then((res) => {
        wx.hideLoading()
        if (currentPage === 1) {
          this.pictureList = res.list
        } else {
          this.pictureList = this.pictureList.concat(res.list)
        }
        if (res.list.length) {
          this.currentPage = res.currentPage
          this.size = res.size
        } else {
          ++this.currentPage
        }
      }).catch((err) => {
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
      })
    },
    login () {
      console.log('login...')
      let _this = this
      wx.login({
        success (res) {
          console.log('微信登录成功', res)
          auth().then((res) => {
            if (!res) {
              _this.login()
              return
            }
            console.log('第三方登录成功', res)
            store.commit('storeUserInfo', res)
            // 为其创建一个默认的标签，如果存在不操作
            _this.createDefaultLabel(res.objectId)
          }).catch((err) => {
            console.log('第三方登录失败', res)
            wx.showToast({
              title: '登录失败',
              icon: none
            })
          })
        }
      })
    },
    createDefaultLabel () {
      createLable('默认', true).then((res) => {
        console.log('创建默认label成功', res)
      }).catch((err) => {
        console.log('创建默认label失败', err)
      })
    },
    selectPicture (item) {
      let url = `/pages/showPicture/main?id=${item.objectId}`
      wx.navigateTo({
        url: url
      })
    },
    swiperChange (e) {
      if (e.target.source === 'touch') {
        this.currentIndex = e.target.current
      }
      let currentIndex = e.target.current
      let maxIndex = this.currentPage * this.size
      if (currentIndex === maxIndex - 1) {
        let currentPage = this.currentPage
        this.findAllCards(++currentPage)
      }
    },
    touchstart (e) {
      this.startClientX = e.mp.changedTouches[0].clientX
    },
    touchend (e) {
      let endClientX = e.mp.changedTouches[0].clientX
      let deletar = endClientX - this.startClientX
      if (!this.currentIndex && deletar > 60) {
        console.log('刷新')
        this.findAllCards()
      }
    }
  },
  components: {
    'v-Picture': Picture
  }
}
</script>

<style scoped lang="less">
.index-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f2f2f2;
  .swiper {
    height: 100%;
    .swiper-item {
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 10px;
      right: 10px;
    }
  }
}
</style>
