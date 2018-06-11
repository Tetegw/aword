<template>
  <div class="upload-wrapper">
    <div class="picture scale">
      <div class="upload">
        <img mode="aspectFill" class="img" @click="addPicture" :src="filePath" />
        <div class="add" @click="addPicture" v-show="!filePath">+</div>
      </div>
      <div class="content">
        {{PictureInfo.content}}
      </div>
    </div>
    <v-Setting></v-Setting>
  </div>
</template>

<script>
import Setting from "@/components/setting.vue"
import store from '@/store.js'

export default {
  data () {
    return {
      filePath: ''
    }
  },
  computed: {
    PictureInfo () {
      return store.state.makePictureInfo
    }
  },
  methods: {
    addPicture () {
      let _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.filePath = res.tempFilePaths
        }
      })
    }
  },
  components: {
    'v-Setting': Setting
  }
}
</script>

<style scoped lang="less">
.upload-wrapper{
  .picture{
    &.scale{
      transform: scale(0.8);
      box-shadow: 4px 4px 4px #cccbbb; /*px*/
    }
    .upload{
      height: 280px;
      overflow: hidden;
      position: relative;
      background: #f1f1f1;
      &::after{
        content: '';
        position: absolute;
        bottom: -149px;
        left: 0;
        background: #fff;
        width: 200%;
        height: 150px;
        transform: rotate(-14deg);
        transform-origin: left top;
      }
      .img{
        width: 100%;
        height: 280px;
      }
      .add{
        font-size: 20px;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 28px;
        border: 1px solid #999; /*px*/
        color: #999;
        border-radius: 50%;
      }
    }
  }
}
</style>
