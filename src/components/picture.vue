<template>
  <div class="picture" :class="picClass" id="picture">
    <div class="upload">
      <img mode="aspectFill" class="img"  :src="filePath" />
    </div>
    <div class="content" :class="fontClass" v-show="PictureInfo_.content">
      <i></i>
      {{PictureInfo_.content}}
    </div>
    <div class="author" v-show="PictureInfo_.author"><i>-&nbsp;</i><span>{{PictureInfo_.author}}</span><i>&nbsp;-</i></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picClass: 'circle',
      filePath: '',
      fontClass: 'vertical-right',
      PictureInfo_: this.PictureInfo
    }
  },
  props:{
    PictureInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch:{
    PictureInfo(newVal) {
      this.PictureInfo_ = newVal
    }
  }

}
</script>

<style scoped lang="less">  
.picture{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  .upload{
    transition: all 0.5s;      
  }
  &.default{
    .upload{
      width: 100%;
      height: 230px;
      background: #f1f1f1;
      position: relative;
      .img{
        width: 100%;
        height: 230px;
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
      height: 240px;
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
        height: 240px;
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
      width: 160px;
      height: 160px;
      position: relative;
      background: #f1f1f1;
      margin: 30px auto;
      border-radius: 50%;
      overflow: hidden;
      .img{
        width: 100%;
        height: 160px;
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
    position: absolute;
    top: 276px;
    left: 50%;
    transform: translate(-50%);
    font-size: 16px;  /*px*/
    line-height: 30px;    /*px*/ 
    &.across-left{
      top: 300px;
      width: 70%;
      text-align: left;
      i{
        display: none;
      }
    }
    &.across-center{
      width: 70%;
      top: 300px;        
      text-align: center;
      i{
        display: none;
      }
    }
    &.across-right{
      width: 70%;
      top: 300px;        
      text-align: right;
      i{
        display: none;
      }
    }
    &.vertical-right{
      height: 210px;
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
      height: 210px;
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
    font-size: 14px;
    color: #999;
    font-family:'PingFang SC','Droid Sans',HelveticaNeue,"Helvetica Neue",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    position: absolute;
    bottom: 10%;
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
</style>
