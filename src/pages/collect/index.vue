<template>
  <div class="collect-wrapper">
    <scroll-view scroll-y style="height: 100%" @scroll="scrollViewScroll">
      <v-Works :currentCardList="collectList"></v-Works>
    </scroll-view>
  </div>
</template>

<script>
import { findCollectCards } from '@/bmob.js'
import Works from '@/components/works.vue'

export default {
  data () {
    return {
      collectList: []
    }
  },
  onShow () {
    this.getCollect()
  },
  methods: {
    getCollect () {
      wx.showLoading()
      findCollectCards().then((res) => {
        this.collectList = res
        wx.hideLoading()
      }).catch((err) => {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      })
    },
    scrollViewScroll () {
      console.log('111')
    }
  },
  components: {
    'v-Works': Works
  }
}
</script>

<style>
</style>
