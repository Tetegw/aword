<template>
  <div class="index-wrapper">
    <swiper class="swiper">
      <block v-for="(item, index) in pictureList" :key="index">
        <swiper-item @click="selectPicture(item)">
          <div class="swiper-item">
            <v-Picture
              :PictureInfo="item"
            ></v-Picture>
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
      pictureList: []
    }
  },
  onShareAppMessage(){
  },
  onShow () {
    this.findAllCards()
  },
  methods: {
    findAllCards () {
      wx.showLoading()
      findCards().then((res) => {
        wx.hideLoading()
        this.pictureList = res
        this.login()
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
      let res = this.stringifyObject(item).slice(1)
      let url = `../showPicture/main?${res}`
      wx.navigateTo({
        url: url
      })
    },
    stringifyObject(item){
      let res = ''
      for (let key in item) {
        if (item.hasOwnProperty(key)) {
          let value = item[key]
          res += `&${key}=${value}`
        }
      }
      return res
    }
  },
  components: {
    'v-Picture': Picture
  }
}
</script>

<style scoped lang="less">
.index-wrapper{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f2f2f2;
  .swiper{
    height: 100%;
    .swiper-item{
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 10px;
      right: 10px;
    }
  }
}
</style>
