<template>
  <div class="show-picture-wrapper">
    <div class="v-Picture-wrapper" @click="toggleMenu">
      <v-Picture :PictureInfo="PictureInfo" :authorBottom="true"></v-Picture>
    </div>
    <div class="more" :class="{'active': showMenu}" @click="showActionSheet">···</div>
  </div>
</template>

<script>
import { createCollect, currentUser, deleteCard, findOneCards, findOneCollect, deleteCollect, setCardPrivacy } from '@/bmob.js'
import Picture from '@/components/picture.vue'
import store from '@/store.js'

export default {
  data () {
    return {
      PictureInfo: {},
      showMenu: true,
      ActionSheetList: [],
      collectObjectId: ''
    }
  },
  onShow () {
    this.showMenu = true
  },
  onLoad (option) {
    this.getPictureInfo(option.id)
  },
  onUnload () {
    this.PictureInfo = {}
  },
  onShareAppMessage () {
    return {
      title: '一言以蔽之',
      path: '/pages/index/main'
    }
  },
  methods: {
    getPictureInfo (objectId) {
      wx.showLoading()
      findOneCards(objectId).then((res) => {
        this.PictureInfo = res
        wx.hideLoading()
        this.isAuthor()
      }).catch((err) => {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      })
    },
    isAuthor (_isPrivacy) {
      currentUser().then((res) => {
        let currentUserId = res.objectId
        let pictureUserId = this.PictureInfo.userId
        let pictureCardId = this.PictureInfo.objectId
        let isPrivacy = _isPrivacy !== undefined ? _isPrivacy : this.PictureInfo.privacy
        if (currentUserId === pictureUserId) {
          this.ActionSheetList = ['收藏', '复制文字', '设为隐私', '删除']
          findOneCollect(currentUserId, pictureCardId).then((res) => {
            if (res.length) {
              this.ActionSheetList = ['取消收藏', '复制文字', '设为隐私', '删除']
              if (isPrivacy) {
                this.ActionSheetList = ['取消收藏', '复制文字', '设为公开', '删除']
              }
              this.collectObjectId = res[0].objectId
            } else {
              this.ActionSheetList = ['收藏', '复制文字', '设为隐私', '删除']
              if (isPrivacy) {
                this.ActionSheetList = ['收藏', '复制文字', '设为公开', '删除']
              }
            }
          }).catch((err) => {
            console.log('查询收藏失败')
          })
        } else {
          this.ActionSheetList = ['作者', '收藏', '复制文字']
          findOneCollect(currentUserId, pictureCardId).then((res) => {
            if (res.length) {
              this.ActionSheetList = ['作者', '取消收藏', '复制文字']
              this.collectObjectId = res[0].objectId
            }
          }).catch((err) => {
            console.log('查询收藏失败')
          })
        }
      }).catch((err) => {
        console.log('获取当前用户失败')
      })
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    showActionSheet () {
      let _this = this
      wx.showActionSheet({
        itemList: this.ActionSheetList,
        success (res) {
          switch (_this.ActionSheetList[res.tapIndex]) {
            case '作者':
              wx.navigateTo({
                url: `/pages/author/main?id=${_this.PictureInfo.userId}`
              })
              break;
            case '收藏':
              _this.collect()
              break;
            case '取消收藏':
              _this.cancelCollect()
              break;
            case '复制文字':
              _this.copyText()
              break;
            case '设为隐私':
              _this.setPrivacy(true)
              break;
            case '设为公开':
              _this.setPrivacy(false)
              break;
            case '删除':
              _this.deleteOneCard()
              break;
          }
        },
        fail (err) {
          console.log(err)
        }
      })
    },
    collect () {
      let cardId = this.PictureInfo.objectId
      createCollect(cardId).then((res) => {
        this.isAuthor()
        wx.showToast({
          title: '收藏成功',
          icon: 'none'
        })
      }).catch((err) => {
        wx.showToast({
          title: '收藏失败',
          icon: 'none'
        })
      })
    },
    cancelCollect () {
      deleteCollect(this.collectObjectId).then((res) => {
        this.isAuthor()
        wx.showToast({
          title: '取消成功',
          icon: 'none'
        })
      }).catch((err) => {
        wx.showToast({
          title: '取消失败',
          icon: 'none'
        })
      })
    },
    setPrivacy (flag) {
      let cardId = this.PictureInfo.objectId
      setCardPrivacy(cardId, flag).then((res) => {
        this.isAuthor(flag)
        wx.showToast({
          title: '设置成功',
          icon: 'none'
        })
      }).catch((err) => {
        wx.showToast({
          title: '设置失败',
          icon: 'none'
        })
      })
    },
    copyText () {
      wx.setClipboardData({
        data: this.PictureInfo.content,
        success: function (res) {
          wx.showToast({
            title: '复制成功',
            icon: 'none'
          })
        }
      })
    },
    deleteOneCard () {
      let _this = this
      wx.showModal({
        title: '提示',
        content: '确定要删除吗?',
        success (res) {
          if (res.confirm) {
            _this.deleteCardHandle()
          }
        }
      })
    },
    deleteCardHandle () {
      let objectId = this.PictureInfo.objectId
      deleteCard(objectId).then((res) => {
        wx.showToast({
          title: '删除成功',
          icon: 'none'
        })
        store.commit('storeDeleteCardSuccess', true)
        wx.navigateBack()
      }).catch((err) => {
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        })
      })
    },
    stringifyObject (item) {
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
.show-picture-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .v-Picture-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .more {
    position: fixed;
    bottom: 0;
    right: 5px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #666;
    font-size: 20px;
    transition: all 0.3s;
    transform: translate3d(0, 50px, 0);
    &.active {
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>

