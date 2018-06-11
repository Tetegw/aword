<template>
  <div class="upload-wrapper">
    <div class="picture scale" :class="{'default': picClassIndex === 0, 'skew': picClassIndex === 1, 'circle': picClassIndex === 2 }">
      <div class="upload">
        <img mode="aspectFill" class="img" @click="addPicture" :src="filePath" />
        <div class="add" @click="addPicture" v-show="!filePath">+</div>
      </div>
      <div class="content across-left">
        <i></i>
        {{PictureInfo.content}}
      </div>
    </div>
    <v-Setting
      @changeMode="changeMode"
    ></v-Setting>
  </div>
</template>

<script>
import Setting from "@/components/setting.vue"
import store from '@/store.js'

const PICCLASSLIST =  ['default', 'skew', 'circle']
export default {
  data () {
    return {
      filePath: '',
      picClassIndex: 0,
      fontClassIndex: 0,
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
    },
    changeMode (index, type) {
      if (type === 'pic') {
        this.picClassIndex = index
      } else if (type === 'font') {
        this.fontClassIndex = index
      }
    }
  },
  components: {
    'v-Setting': Setting
  }
}
</script>

<style scoped lang="less">
.upload-wrapper{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  .picture{
    position: relative;
    transition: all 0.5s;
    &::before {
      content: '';
      padding-top: 177.7777778%;
      float: left;
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
    &.scale{
      transform-origin: 50% 3%;
      transform: scale(0.8);
      box-shadow: 4px 4px 4px #cccbbb; /*px*/
    }
    &.default{
      .upload{
        width: 100%;
        height: 260px;
        background: #f1f1f1;
        position: relative;
        .img{
          width: 100%;
          height: 260px;
        }
        .add{
          font-size: 20px;
          width: 30px;
          height: 30px;
          position: absolute;
          top: 50%;
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
    &.skew{
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
    &.circle{
      .upload{
        width: 170px;
        height: 170px;
        position: absolute;
        background: #f1f1f1;
        left: 50%;
        top: 50px;
        transform: translate(-50%);
        border-radius: 50%;
        overflow: hidden;
        .img{
          width: 100%;
          height: 170px;
        }
        .add{
          font-size: 20px;
          width: 30px;
          height: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          line-height: 28px;
          color: #999;
        }
      }
      .content{
        position: absolute;
        top: 250px;
      }
    }
    .content{
      &.across-left{
        padding-left: 20px;
        position: absolute;
        top: 300px;
        left: 50%;
        transform: translate(-50%);
        width: 70%;
        text-align: left;
        font-size: 22px;
        line-height: 30px;
      }
      i{
        position: absolute;
        left: 0;
        top: 9px;
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid red;
      }
    }
  }
  
}
</style>
