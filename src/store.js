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
      content: '我曾在一场大雪中走失，又从一场大雪中醒来，我是那风雪中经年未化的冰冷，注定了一半衰老，一半天真。 ​​​',
      author: '孙晨',
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
      state.makePictureInfo = Object.assign({}, state.makePictureInfo, payload)
      console.log(state.makePictureInfo)
    }
  }
})

export default store
