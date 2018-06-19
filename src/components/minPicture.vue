
<template>
  <div class="picture" :class="PictureInfo_.picClass" id="picture">
    <div class="upload">
      <img mode="aspectFill" class="img"  :src="PictureInfo_.imgUrl" />
    </div>
    <div class="content" :class="PictureInfo_.fontClass" v-show="PictureInfo_.content">
      <i></i>
      {{PictureInfo_.content}}
    </div>
    <div class="author" :class="{'btm11': authorBottom}" v-show="PictureInfo_.author"><i>-&nbsp;</i><span>{{PictureInfo_.author}}</span><i>&nbsp;-</i></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PictureInfo_: this.PictureInfo
    }
  },
  props:{
    PictureInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    authorBottom: {
      type: Boolean,
      default: false
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
/*355px 134px*/
.picture{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  &.default{
    .upload{
      width: 100%;
      height: 80px;
      background: #f1f1f1;
      position: relative;
      .img{
        width: 100%;
        height: 80px;
      }
      .add{
        font-size: 7.6px;
        width: 11.5px;
        height: 11.5px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 20.7px;
        border: 1px solid #999; /*px*/
        color: #999;
        border-radius: 50%;
      }      
    }
  }
  &.skew{
    .upload{
      width: 100%;
      height: 80px;
      overflow: hidden;
      position: relative;
      background: #f1f1f1;
      &::after{
        content: '';
        position: absolute;
        bottom: -57px;
        left: 0;
        background: #fff;
        width: 200%;
        height: 57px;
        transform: rotate(-14deg);
        transform-origin: left top;
      }
      .img{
        width: 100%;
        height: 80px;
      }
      .add{
        font-size: 7.6px;
        width: 11.5px;
        height: 11.5px;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 10.7px;
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
      width: 60px;
      height: 60px;
      position: relative;
      background: #f1f1f1;
      margin: 11px auto;
      border-radius: 50%;
      overflow: hidden;
      .img{
        width: 100%;
        height: 60px;
      }
      .add{
        font-size: 7.5px;
        width: 11px;
        height: 11px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 10px;
        color: #999;
      }
    }
    .content{
      position: absolute;
      top: 96px;
    }
  }
  .content{
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%);
    font-size: 6px;  /*px*/
    line-height: 9.2px;    /*px*/ 
    &.across-left{
      top: 100px;
      width: 70%;
      text-align: left;
      i{
        display: none;
      }
    }
    &.across-center{
      width: 70%;
      top: 100px;        
      text-align: center;
      i{
        display: none;
      }
    }
    &.across-right{
      width: 70%;
      top: 100px;        
      text-align: right;
      i{
        display: none;
      }
    }
    &.vertical-right{
      height: 75px;
      writing-mode: vertical-rl;
      letter-spacing:1px;  /*px*/ 
      i{
        position: absolute;
        right: 2px; /*px*/
        top: -8px; /*px*/
        content: '';
        width: 3.8px;
        height: 3.8px;
        border-radius: 50%;
        border: 1px solid red; /*px*/
      }
    }
    &.vertical-left{
      height: 75px;
      writing-mode: vertical-lr;
      letter-spacing:1px;  /*px*/ 
      i{
        position: absolute;
        left: 2px; /*px*/
        top: -8px; /*px*/
        content: '';
        width: 3.8px;
        height: 3.8px;
        border-radius: 50%;
        border: 1px solid red; /*px*/
      }
    }
  }
  .author{
    font-size: 5.3px;
    color: #999;
    font-family:'PingFang SC','Droid Sans',HelveticaNeue,"Helvetica Neue",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    position: absolute;
    bottom: 5%;
    width: 100%;
    vertical-align: middle;
    &.btm11{
      bottom: 11%;
    }
    i{
      display: inline-block;
      vertical-align: middle;
    }
    span{
      display: inline-block;
      vertical-align: middle;        
      max-width: 88.4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
