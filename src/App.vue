<script>
import { auth, currentUser, createCurUserDefaultLabel } from '@/bmob.js'
import store from '@/store.js'

export default {
  data(){
    return {}
  },
  created() {
    this.login()
  },
  methods:{
    login () {
      console.log('login...')
      let _this = this
      wx.showLoading()
      wx.login({
        success (res) {
          console.log('微信登录成功', res)
          auth().then((res) => {
            wx.hideLoading()
            console.log('第三方登录成功', res)
            // 为其创建一个默认的标签，如果存在不操作
            _this.createDefaultLabel(res.objectId)
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
    createDefaultLabel (userId) {
      createCurUserDefaultLabel(userId).then((res) => {
        console.log('创建默认label成功', res)
      }).catch((err) => {
        console.log('创建默认label失败', err)
      })
    }
  }
}
</script>
