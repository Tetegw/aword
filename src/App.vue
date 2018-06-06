<script>
import { auth, currentUser } from '@/bmob.js'
import store from '@/store.js';

export default {
  data(){
    return {}
  },
  created() {
    this.login()
  },
  methods:{
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
        store.commit('storeUserInfo', {
          nickName: res.nickName,
          avatarUrl: res.userPic
        })
        store.commit('storeHasUserInfo', true)
      }).catch((err) => {
        console.log('第三方用户信息获取失败', err)
      })
    }
  }
}
</script>
