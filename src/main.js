import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/collect/main',
      'pages/new/main',
      'pages/profile/main',
      'pages/editPicture/main',
      'pages/showPicture/main',
      'pages/author/main',
      'pages/editLabel/main',
    ],
    window: {
      backgroundTextStyle: 'dark',
      backgroundColorTop: '#fff',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      color: '#B1B1BA',
      selectedColor: '#444',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/index/main',
          text: '主页'
        },
        {
          pagePath: 'pages/collect/main',
          text: '收藏'
        },
        {
          pagePath: 'pages/new/main',
          text: '新建'
        },
        {
          pagePath: 'pages/profile/main',
          text: '个人'
        }
      ]
    }
  }
}
