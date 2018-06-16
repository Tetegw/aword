<template>
  <div class="edit-info-wrapper">
      <div class="content">
        <p class="title">正文</p>
        <textarea class="text-input" placeholder="请输入正文" name="" id="" cols="30" rows="10" :disabled="InputDisabled" v-model="contentInput"></textarea>
      </div>
      <div class="author">
        <p class="title">出处</p>
        <div>
          <div class="btn" @click="inputQuotes">《》</div>
          <input class="text-input" placeholder="请输入出处" type="text" v-model="authorInput" :disabled="InputDisabled">
        </div>
      </div>
      <div class="label">
        <p class="title">标签</p>
        <v-Labels
          :labelList="labelList"
          @emitChooseItem="emitChooseItem"
          @emitConfirm="emitConfirm"
          @emitShowModel="emitShowModel"
        ></v-Labels>
      </div>
      <div class="privacy">
        <span class="btn" @click="setPrivacy"> {{ privacy ? '设为公开' : '设为隐私'}}</span>
      </div>
      <div class="next" @click="submit"></div>
  </div>
</template>

<script>
import { getUserLabels } from '@/bmob.js'
import Labels from '@/components/labels.vue'
import store from '@/store.js'

export default {
  data() {
    return {
      labelList: [{ labelInfo: '默认' }],
      contentInput: '',
      authorInput: '',
      labelItem: '',
      privacy: false,
      InputDisabled: false
    }
  },
  onLoad () {
    //TODO: onLoad 下次不会再执行
    this.getLabels()
  },
  methods: {
    getLabels () {
      getUserLabels().then((res) => {
        this.labelList = res
      }).catch((err) => {
        wx.showToast({
          title: '获取栏目失败',
          icon: 'none'
        })
      })
    },
    // 输入书名号
    inputQuotes() {
      this.authorInput = this.authorInput + '《》'
    },
    // 接受弹窗显示的回调
    emitShowModel () {
      this.InputDisabled = true
    },
    // 接受选中Label的回调
    emitChooseItem(index, item) {
      console.log('选中了', index, item)
      this.labelItem = item
    },
    // 接受弹窗确认的回调
    emitConfirm (payload) {
      // 获取添加便签的数据
      console.log(payload)
    },
    // 设置隐私和公开
    setPrivacy() {
      this.privacy = !this.privacy
    },
    // 提交本页内容，存入store
    submit () {
      if (!this.contentInput) {
        wx.showToast({
          title: '请填写正文',
          icon: 'none'
        })
        return
      }
      store.commit('storeMakePictureInfo', {
        content: this.contentInput,
        author: this.authorInput,
        labelItem: this.labelItem || '默认',
        privacy: this.privacy || false
      })
      wx.navigateTo({
        url: '../editPicture/main'
      })
    }
  },
  components: {
    'v-Labels': Labels
  }
}
</script>

<style scoped lang="less">
.edit-info-wrapper{
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
    padding: 5px 10px;
  }
  .content{
    .text-input{
      padding: 10px 10px;
    }
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
  .next{
    position: fixed;
    bottom: 50px;
    left: 50%;
    width: 30px;
    height: 30px;
    transform: translate3d(-50%, 0, 0) rotate(45deg);
    &:before{
      content: '';
      position: absolute;
      top: 9px;
      left: 4px;
      width: 15px;
      height: 1px;
      background: #666;
    }
    &:after{
      content: '';
      position: absolute;
      left: 18px;
      top: 9px;
      height: 15px;
      width: 1px;
      background: #666;
    }
  }
}
</style>
