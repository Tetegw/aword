<template>
  <div class="confirm-com-wrapper" v-show="show" >
    <div class="mask" @click="hideModel" @touchmove.stop.prevent></div>
    <div class="confirm-wrapper" @touchmove.stop.prevent>
      <div class="title">{{title}}</div>
      <div class="content">
        <input class="input-label" type="text" placeholder="新标签" v-model="inputLabel">
      </div>
      <div class="footer">
        <div class="btn" @touchstart="confirmTouchActive = true" @touchend="confirmTouchActive = false" :class="{'touch-active': confirmTouchActive}" @click="emitConfirm">
          <span>{{confirm}}</span>
        </div>
        <div class="btn" @touchstart="cancelTouchActive = true" @touchend="cancelTouchActive = false" :class="{'touch-active': cancelTouchActive}" @click="hideModel">
          <span>{{cancel}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: this.showModel,
      cancelTouchActive: false,
      confirmTouchActive: false,
      inputLabel: ''
    }
  },
  props:{
    showModel: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    confirm: {
      type: String,
      default: '确定'
    },
    cancel: {
      type: String,
      default: '取消'
    }
  },
  watch:{
    showModel(newVal) {
      this.show = newVal
      this.$emit('emitShowModel')
    }
  },
  methods:{
    hideModel() {
      this.$emit('emitHideModel')
      this.inputLabel = ''
    },
    emitConfirm() {
      let inputLabel = this.inputLabel.trim()
      if (!inputLabel) {
        wx.showToast({
          title: '标签不能为空',
          icon: 'none'
        })
        return
      }
      this.$emit('emitConfirm', this.inputLabel)
      this.inputLabel = ''
    }
  }
}
</script>

<style scoped lang="less">
.confirm-com-wrapper{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .mask{
    position: absolute;
    z-index: 9;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .2);
  }
  .confirm-wrapper{
    position: absolute;
    z-index: 10;
    top: 40%;
    left: 50%;
    padding-top: 14px;
    transform: translate(-50%,-50%);
    background: #fff;
    width: 70%;
    font-size: 14px;
    .title{
      line-height: 20px;
      text-align: center;
      padding: 5px 0;
    }
    .content{
      padding: 15px 0;
      text-align: center;
      .input-label{
        display: inline-block;
        text-align: left;
        padding-left: 10px;
        line-height: 20px;
        height: 20px;
        border: 1px solid #eee; /*px*/
        width: 70%;
      }
    }
    .footer{
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #eee; /*px*/
      .btn{
        flex:1;
        padding: 10px 0;
        text-align: center;
        &.touch-active{
          background: #f1f1f1;
        }
        span{
          border-right: 1px solid #eee; /*px*/
          text-align: center;
          display: block;
          line-height: 25px;
        }
        &:last-child{
          span{
            border-right: 0;
          }
        }
      }
    }
  }
}
</style>
