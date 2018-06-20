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
      content: '',
      author: '',
      labelId: '',
      privacy: false
    },
    labelList: [],
    cardObject: {},
    createdCardSuccess: false
  },
  mutations: {
    storeUserInfo (state, payload) {
      state.userInfo = payload
    },
    storeHasUserInfo (state, payload) {
      state.hasUserInfo = payload
    },
    storeMakePictureInfo (state, payload) {
      state.makePictureInfo = Object.assign({}, state.makePictureInfo, payload)
      console.log('state.makePictureInfo', state.makePictureInfo)
    },
    storeLabelList (state, payload) {
      state.labelList = payload
    },
    storeCardObject (state, payload) {
      let labelInfo = `card_${payload.labelInfo}`
      state.cardObject = Object.assign({}, state.cardObject, { [labelInfo]: payload.card })
    },
    storeCreatedCardSuccess (state, payload) {
      state.createdCardSuccess = payload
    }
  }
})

export default store
