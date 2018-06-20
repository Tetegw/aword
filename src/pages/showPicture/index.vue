<template>
  <div class="show-picture-wrapper">
    <div class="v-Picture-wrapper" @click="toggleMenu">
      <v-Picture :PictureInfo="PictureInfo" :authorBottom="true"></v-Picture>
    </div>
    <div class="more" :class="{'active': showMenu}" @click="showActionSheet">···</div>
  </div>
</template>

<script>
import { createCollect, currentUser, deleteCard } from '@/bmob.js'
import Picture from '@/components/picture.vue'

export default {
  data () {
    return {
      PictureInfo: {},
      showMenu: true,
      ActionSheetList: []
    }
  },
  onLoad: function (option) {
    this.showMenu = true
    this.PictureInfo = option
    this.isAuthor()
  },
  methods: {
    isAuthor () {
      currentUser().then((res) => {
        let currentUserId = res.objectId
        let pictureUserId = this.PictureInfo.userId
        if (currentUserId === pictureUserId) {
          this.ActionSheetList = ['作者', '收藏', '复制文字', '删除']
        } else {
          this.ActionSheetList = ['作者', '收藏', '复制文字']
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
          switch (res.tapIndex) {
            case 0:
              console.log('作者页')
              break;
            case 1:
              _this.collect()
              break;
            case 2:
              _this.copyText()
              break;
            case 3:
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
