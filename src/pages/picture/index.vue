<template>
  <div class="upload-wrapper">
    <div class="picture scale" :class="picClass" id="picture">
      <div class="upload">
        <img mode="aspectFill" class="img" @click="addPicture" :src="filePath" />
        <div class="add" @click="addPicture" v-show="!filePath">+</div>
      </div>
      <div class="content" :class="fontClass">
        <i></i>
        {{PictureInfo.content}}
      </div>
      <div class="author"><i>-&nbsp;</i><span>{{PictureInfo.author}}</span><i>&nbsp;-</i></div>
    </div>
    <v-Setting
      @changeMode="changeMode"
      @emitConfirm="emitConfirm"
    ></v-Setting>
  </div>
</template>

<script>
import Html2canvas from "html2canvas"
import Setting from "@/components/setting.vue"
import store from '@/store.js'

export default {
  data () {
    return {
      filePath: '',
      picClass: 'default',
      fontClass: 'vertical-left',
    }
  },
  created () {
    console.log(Html2canvas)
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
        switch (index) {
          case 0:
            this.picClass = 'default'
            break;
          case 1:
            this.picClass = 'circle'
            break;
          case 2:
            this.picClass = 'skew'
            break;
        
          default:
            this.picClass = 'default'
            break;
        }
      } else if (type === 'font') {
        switch (index) {
          case 0:
            this.fontClass = 'vertical-left'
            break;
          case 1:
            this.fontClass = 'vertical-right'
            break;
          case 2:
            this.fontClass = 'across-left'
            break;
          case 3:
            this.fontClass = 'across-center'
            break;
          case 4:
            this.fontClass = 'across-right'
            break;
        
          default:
            this.fontClass = 'vertical-left'
            break;
        }
      }
    },
    emitConfirm () {
      console.log('点击了确定')
      let picture = wx.createSelectorQuery().select('#picture')
      Html2canvas(picture).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
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
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  .picture{
    position: relative;
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
      box-shadow: 2px 2px 4px 4px #ddd; /*px*/
    }
    .upload{
      transition: all 0.5s;      
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
        width: 100%;
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
      border: 1px solid transparent; /*px*/
      box-sizing: border-box;
      .upload{
        width: 170px;
        height: 170px;
        position: relative;
        background: #f1f1f1;
        margin: 50px auto;
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
        top: 270px;
      }
    }
    .content{
      position: absolute;
      top: 310px;
      left: 50%;
      transform: translate(-50%);
      font-size: 20px;  /*px*/
      line-height: 30px;    /*px*/ 
      &.across-left{
        top: 340px;
        width: 70%;
        text-align: left;
        i{
          display: none;
        }
      }
      &.across-center{
        width: 70%;
        top: 340px;        
        text-align: center;
        i{
          display: none;
        }
      }
      &.across-right{
        width: 70%;
        top: 340px;        
        text-align: right;
        i{
          display: none;
        }
      }
      &.vertical-right{
        height: 270px;
        writing-mode: vertical-rl;
        letter-spacing:2px;  /*px*/ 
        i{
          position: absolute;
          right: 8px; /*px*/
          top: -20px; /*px*/
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid red; /*px*/
        }
      }
      &.vertical-left{
        height: 270px;
        writing-mode: vertical-lr;
        letter-spacing:2px;  /*px*/ 
        i{
          position: absolute;
          left: 8px; /*px*/
          top: -20px; /*px*/
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid red; /*px*/
        }
      }
    }
    .author{
      color: #999;
      font-family:'PingFang SC','Droid Sans',HelveticaNeue,"Helvetica Neue",arial,sans-serif;
      -webkit-font-smoothing: antialiased;
      text-align: center;
      position: absolute;
      top: 610px;
      width: 100%;
      vertical-align: middle;
      i{
        display: inline-block;
        vertical-align: middle;
      }
      span{
        display: inline-block;
        vertical-align: middle;        
        max-width: 230px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  
}
</style>
