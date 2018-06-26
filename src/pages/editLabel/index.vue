<template>
  <div class="edit-label-wrapper">
    <div class="title">已有栏目</div>
    <div class="now-label">
      <ul class="now-label-wrapper">
        <li v-for="(item, index) in labelList" :key="index">
          <span>{{item.labelInfo}}</span>
          <span v-if="item.labelInfo !== '默认'" class="delete-wrapper" @touchstart="item.touchActive = true" @touchend="item.touchActive = false" :class="{'touch-active': item.touchActive}" @click="deleteSelfLabel(item)">
            <span class="delete">-</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="title">新增栏目</div>
    <div class="new-label">
      <input type="text" placeholder="输入新增栏目" v-model="inputLabel">
      <span class="add-wrapper" @touchstart="addTouchActive = true" @touchend="addTouchActive = false" :class="{'touch-active': addTouchActive}" @click="addLabel">
        <span class="add">+</span>
      </span>
    </div>
  </div>
</template>

<script>
import { getUserLabels, createLable, deleteLabel } from '@/bmob.js'
import store from '@/store.js'

export default {
  data () {
    return {
      addTouchActive: false,
      labelList: [],
      inputLabel: ''
    }
  },
  onShow () {
    this.getLabels()
  },
  computed: {
    userInfo () {
      return store.state.userInfo
    }
  },
  methods: {
    getLabels () {
      let userId = this.userInfo.objectId
      if (!userId) { return }
      getUserLabels(userId).then((res) => {
        this.labelList = res
        this.labelList.forEach((item) => {
          this.$set(item, 'touchActive', false)
        });
      }).catch((err) => {
        wx.showToast({
          title: '获取栏目失败',
          icon: 'none'
        })
      })
    },
    deleteSelfLabel (item) {
      let _this = this
      let userId = this.userInfo.objectId
      wx.showModal({
        title: '提示',
        content: `删除 ${item.labelInfo} 栏目会将此栏目下所有卡片删除，是否确定？`,
        success (res) {
          if (res.confirm) {
            deleteLabel(item.objectId, userId).then((res) => {
              wx.showToast({
                title: '删除成功',
                icon: 'none'
              })
              _this.getLabels()
            }).catch((err) => {
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              })
            })
          }
        }
      })
    },
    addLabel () {
      let _this = this
      if (!this.inputLabel.trim()) {
        wx.showToast({
          title: '请输入栏目',
          icon: 'none'
        })
        return
      }
      wx.showModal({
        title: '提示',
        content: `确认添加 ${this.inputLabel} 栏目？`,
        success (res) {
          if (res.confirm) {
            wx.showLoading()
            createLable(_this.inputLabel).then((res) => {
              // 创建了，刷新label
              let userId = _this.userInfo.objectId
              _this.inputLabel = ''
              _this.getLabels()
              wx.hideLoading()
            }).catch((err) => {
              let title = err === '该分类已存在' ? err : '创建失败'
              wx.showToast({
                title: title,
                icon: 'none'
              })
            })
          }
        }
      })
    },
  }
}
</script>

<style scoped lang="less">
.edit-label-wrapper {
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
  .now-label {
    padding: 14px 14px 30px 14px;
    li {
      display: flex;
      line-height: 30px;
      height: 30px;
      margin-bottom: 5px;
      justify-content: space-between;
      .delete-wrapper {
        width: 30px;
        height: 30px;
        padding: 5px;
        box-sizing: border-box;
        line-height: 17px;
        &.touch-active {
          .delete {
            border: 1px solid #333; /*px*/
            background: #333;
            color: #fff;
          }
        }
        .delete {
          display: inline-block;
          width: 20px;
          height: 20px;
          box-sizing: border-box;
          border: 1px solid #666; /*px*/
          color: #666;
          border-radius: 50%;

          text-align: center;
        }
      }
    }
  }
  .new-label {
    padding: 14px;
    display: flex;
    justify-content: space-between;
    .add-wrapper {
      width: 30px;
      height: 30px;
      padding: 5px;
      box-sizing: border-box;
      line-height: 17px;
      &.touch-active {
        .add {
          border: 1px solid #333; /*px*/
          background: #333;
          color: #fff;
        }
      }
      .add {
        display: inline-block;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        border: 1px solid #666; /*px*/
        color: #666;
        border-radius: 50%;

        text-align: center;
      }
    }
  }
}
</style>
