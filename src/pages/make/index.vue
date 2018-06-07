<template>
  <div class="make-wrapper">
      <div class="content">
        <p class="title">正文</p>
        <textarea class="text-input" name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="author">
        <p class="title">出处</p>
        <div>
          <div class="btn" @click="inputQuotes">《》</div>
          <input class="text-input" type="text" v-model="authorInput" :focus="authorInputFocus">
        </div>
      </div>
      <div class="label">
        <p class="title">标签</p>
        <v-Labels
          :addBtn="false"
          @emitChooseItemIndex="emitChooseItemIndex"
        ></v-Labels>
      </div>
      <div class="privacy">
        <span class="btn" @click="setPrivacy(true)" v-show="!privacy">设为隐私</span>
        <span class="btn" @click="setPrivacy(false)" v-show="privacy">设为公开</span>
      </div>
      <div class="close" :class="{'active': loaded}"></div>
  </div>
</template>

<script>
import Labels from '@/components/labels.vue';
export default {
  data() {
    return {
      loaded: false,
      authorInput: '',
      authorInputFocus: true,
      privacy: false
    }
  },
  onLoad () {
    this.loaded = true
  },
  methods: {
    inputQuotes() {
      this.authorInput = this.authorInput + '《》'
      this.authorInputFocus = true
    },
    emitChooseItemIndex(index) {
      console.log('选中了', index)
    },
    setPrivacy(flag) {
      this.privacy = flag
    }
  },
  components: {
    'v-Labels': Labels
  }
}
</script>

<style scoped lang="less">
.make-wrapper{
  padding: 20px;
  font-size: 14px;
  color: #333;
  .title{
    color: #666;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    border-bottom: 1px solid #eee;
  }
  .text-input{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
  .author{
    position: relative;
    .text-input{
      width: auto;
      height: 50px;
      line-height: 50px;
      margin-right: 40px;
    }
    .btn{
      float: right;
      width: 40px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      margin-top: 10px;
      text-align: center;
      border-radius: 2px; /*px*/
      border: 1px solid #eee; /*px*/
      color: #999;
    }
  }
  .label{
    color: #666;
  }
  .privacy{
    margin-top: 20px;
    .btn{
      color: #999;
      float: right;
    }
  }
  .close{
    position: fixed;
    bottom: 50px;
    left: 50%;
    width: 30px;
    height: 30px;
    transform: translate(-50%);
    transition: all .8s;
    &.active{
      transform: translate(-50%) rotate(-45deg);
    }
    &:before{
      content: '';
      position: absolute;
      top: 14px;
      left: 0;
      width: 30px;
      height: 1px;
      background: #666;
    }
    &:after{
      content: '';
      position: absolute;
      left: 14px;
      top: 0;
      height: 30px;
      width: 1px;
      background: #666;
    }
  }
}
</style>
