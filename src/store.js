// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    userInfo: {},
    hasUserInfo: false,
    makePictureInfo: {
      content: '由于小程序升级，导致关于getUserInfo接口有所调整，哈哈。',
      author: '',
      labelItem: '默认',
      privacy: false
    }
  },
  mutations: {
    storeUserInfo (state, payload) {
      state.userInfo = payload
    },
    storeHasUserInfo(state, payload) {
      state.hasUserInfo = payload
    },
    storeMakePictureInfo(state, payload) {
      state.makePictureInfo = Object({}, state.makePictureInfo, payload)
      console.log(payload)
    }
  }
})

export default store
