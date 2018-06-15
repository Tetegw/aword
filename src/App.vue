<script>
import { auth, currentUser } from '@/bmob.js'
import store from '@/store.js'

export default {
  data(){
    return {}
  },
  created() {
    this.login()
  },
  computed: {
    showToast () {
      console.log(store.state.showToast)
      return store.state.showToast
    }
  },
  methods:{
     // 登录
    login () {
      console.log('login...')
      let _this = this
      wx.login({
        success (res) {
          console.log('微信登录成功', res)
          auth().then((res) => {
            console.log('第三方登录成功', res)
          }).catch((err) => {
            console.log('第三方登录失败', res)
            wx.showToast({
              title: err,
              icon: none
            })
          })
        }
      })
    }
  }
}
</script>
