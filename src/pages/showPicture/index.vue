<template>
  <div class="show-picture-wrapper">
    <div class="v-Picture-wrapper" @click="toggleMenu">
      <v-Picture
        :PictureInfo="PictureInfo"
        :authorBottom="true"
      ></v-Picture>
    </div>
    <div class="more" :class="{'active': showMenu}" @click="showActionSheet">···</div>
  </div>
</template>

<script>
import { createCollect } from '@/bmob.js'
import Picture from '@/components/picture.vue'

export default {
  data () {
    return {
      PictureInfo: {},
      showMenu: true
    }
  },
  onLoad: function(option){
    this.showMenu = true
    this.PictureInfo = option
  },
  methods: {
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    showActionSheet () {
      let _this = this
      wx.showActionSheet({
        itemList: ['作者', '收藏', '复制文字', '删除'],
        success (res) {
          switch (res.tapIndex) {
            case 0:
              console.log('作者页')
              break;
            case 1:
              _this.collect()
              break;
            case 2:
             console.log('转发')
              break;
            case 3:
              _this.copyText()
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
        success: function(res) {
          wx.showToast({
            title: '复制成功',
            icon: 'none'
          })
        }
      })
    }
  },
  components: {
    'v-Picture': Picture
  }
}
</script>

<style scoped lang="less">
.show-picture-wrapper{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .v-Picture-wrapper{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .more{
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
    &.active{
      transform: translate3d(0, 0, 0);
    }
  }
}

</style>
