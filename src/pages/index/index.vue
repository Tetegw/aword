<template>
  <div>
    <p>{{userInfo.nickName}}</p>
    <button open-type="getUserInfo" @getuserinfo="updateUserInfo" v-show="!hasUserInfo">获取头像昵称</button>
    <image class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover"/>
    <text class="userinfo-nickname">{{userInfo.nickName}}</text>
  </div>
</template>

<script>
import { auth, upInfo, updateStorage, currentUser } from '../../bmob.js'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      hasUserInfo: false
    }
  },
  created () {
    this.login()
  },
  methods: {
    // 检测是否有登录态
    checkSession() {
      let _this = this
      wx.checkSession({
        success (res) {
          //session_key 未过期，并且在本生命周期一直有效
          console.log('微信session_key存在', res)
          _this.getUserInfo()
        },
        fail (err) {
          // session_key 已经失效，需要重新执行登录流程
          console.log('微信session_key不存在', err)
          _this.login()
        }
      })
    },
    // 登录
    login () {
      let _this = this
      wx.login({
        success (res) {
          console.log('微信登录成功', res)
          auth().then((res) => {
            console.log('第三方登录成功', res)
            _this.getUserInfo()
          }).catch((err) => {
            console.log('第三方登录失败', res)
            wx.showToast({
              title: err,
              icon: none
            })
          })
        }
      })
    },
    // 获取当前登录用户信息
    getUserInfo () {
      currentUser().then((res) => {
        console.log('第三方用户信息获取成功', res)
        this.userInfo = {
          nickName: res.nickName,
          avatarUrl: res.userPic
        }
        this.hasUserInfo = true
      }).catch((err) => {
        console.log('第三方用户信息获取失败', err)
      })
    },
    // 更新第三方服务器用户信息
    updateUserInfo (e) {
      // app.globalData.userInfo = e.detail.userInfo
      upInfo(e.target.userInfo).then((res) => {
        console.log('第三方更新用户信息成功', res)
        this.userInfo = e.target.userInfo
        this.hasUserInfo = true
      }).catch((err) => {
        console.log('第三方更新用户信息失败', err)
      })
    }
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
