<template>
  <div class="show-picture-wrapper">
    <div class="v-Picture-wrapper" @click="toggleMenu">
      <v-Picture :PictureInfo="PictureInfo" :authorBottom="true"></v-Picture>
    </div>
    <div class="more" :class="{'active': showMenu}" @click="showActionSheet">···</div>
  </div>
</template>

<script>
import { createCollect, currentUser, deleteCard, findOneCards, findOneCollect, deleteCollect } from '@/bmob.js'
import Picture from '@/components/picture.vue'

export default {
  data () {
    return {
      PictureInfo: {},
      showMenu: true,
      ActionSheetList: [],
      collectObjectId: ''
    }
  },
  onLoad (option) {
    this.getPictureInfo(option.id)
  },
  onUnload () {
    this.PictureInfo = {}
  },
  onShareAppMessage () {
  },
  methods: {
    getPictureInfo (objectId) {
      wx.showLoading()
      findOneCards(objectId).then((res) => {
        this.PictureInfo = res
        this.isAuthor()
      }).catch((err) => {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      })
    },
    isAuthor () {
      currentUser().then((res) => {
        wx.hideLoading()
        let currentUserId = res.objectId
        let pictureUserId = this.PictureInfo.userId
        let pictureCardId = this.PictureInfo.objectId
        if (currentUserId === pictureUserId) {
          this.ActionSheetList = ['收藏', '复制文字', '删除']
          findOneCollect(currentUserId, pictureCardId).then((res) => {
            if (res.length) {
              this.ActionSheetList = ['取消收藏', '复制文字', '删除']
              this.collectObjectId = res[0].objectId
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
        wx.hideLoading()
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
              console.log('作者页')
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
      wx.showLoading()
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
        content: '确定要删除吗?',
        confirmColor: '#26a69a',
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
