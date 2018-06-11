<template>
  <div class="upload-wrapper">
    <div class="picture">
      <div class="upload">
        <img mode="aspectFill" class="img" :src="filePath" />
        <div class="add" @click="addPicture" v-show="!filePath">+</div>
      </div>
    </div>
    <div class="setting"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filePath: ''
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
  }
}
</script>

<style scoped lang="less">
.upload-wrapper{
  .picture{
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
