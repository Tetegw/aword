<template>
  <div class="edit-info-wrapper">
    <div class="content">
      <p class="title">正文</p>
      <textarea class="text-input" placeholder="请输入正文" name="" id="" cols="30" rows="10" v-model="contentInput"></textarea>
    </div>
    <div class="author">
      <p class="title">出处</p>
      <div>
        <input class="text-input" placeholder="请输入出处" type="text" v-model="authorInput">
      </div>
    </div>
    <div class="label">
      <p class="title">标签</p>
      <v-Labels :labelList="labelList" @emitChooseItem="emitChooseItem"></v-Labels>
    </div>
    <div class="privacy">
      <span class="btn" @click="setPrivacy"> {{ privacy ? '设为公开' : '设为隐私'}}</span>
    </div>
    <div class="next" @click="submit"></div>
  </div>
</template>

<script>
import { getUserLabels, createLable } from '@/bmob.js'
import Labels from '@/components/labels.vue'
import store from '@/store.js'

export default {
  data () {
    return {
      labelList: [{ labelInfo: '默认' }],
      labelIndex: 0,
      contentInput: '',
      authorInput: '',
      privacy: false
    }
  },
  onShow () {
    this.getLabels()
  },
  computed: {
    userInfo () {
      return store.state.userInfo
    },
    createdCardSuccess () {
      return store.state.createdCardSuccess
    }
  },
  watch: {
    createdCardSuccess (newVal) {
      if (newVal) {
        this.clearAll()
      }
    }
  },
  methods: {
    getLabels () {
      let userId = this.userInfo.objectId
      getUserLabels(userId).then((res) => {
        this.labelList = res
      }).catch((err) => {
        wx.showToast({
          title: '获取栏目失败',
          icon: 'none'
        })
      })
    },
    // 接受选中Label的回调
    emitChooseItem (index, labelInfo) {
      console.log('选中了', index, labelInfo)
      this.labelIndex = index
    },
    // 设置隐私和公开
    setPrivacy () {
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
        labelId: this.labelList[this.labelIndex] && this.labelList[this.labelIndex].objectId,
        privacy: this.privacy || false
      })
      wx.navigateTo({
        url: '/pages/editPicture/main'
      })
    },
    clearAll () {
      this.labelIndex = 0
      this.contentInput = ''
      this.authorInput = ''
      this.privacy = false
      store.commit('storeCreatedCardSuccess', false)
    }
  },
  components: {
    'v-Labels': Labels
  }
}
</script>

<style scoped lang="less">
.edit-info-wrapper {
  padding: 20px;
  font-size: 14px;
  color: #333;
  .title {
    color: #666;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    border-bottom: 1px solid #eee;
  }
  .text-input {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
  }
  .content {
    .text-input {
      padding: 10px 10px;
    }
  }
  .author {
    position: relative;
    .text-input {
      width: auto;
      height: 50px;
      line-height: 50px;
    }
  }
  .label {
    color: #666;
  }
  .privacy {
    margin-top: 20px;
    .btn {
      color: #999;
      float: right;
    }
  }
  .next {
    position: fixed;
    bottom: 50px;
    left: 50%;
    width: 30px;
    height: 30px;
    transform: translate3d(-50%, 0, 0) rotate(45deg);
    &:before {
      content: "";
      position: absolute;
      top: 9px;
      left: 4px;
      width: 15px;
      height: 1px;
      background: #666;
    }
    &:after {
      content: "";
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
