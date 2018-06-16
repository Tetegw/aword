<template>
  <div class="collect-wrapper">
    <v-Works
      :currentCardList="collectList"
    ></v-Works>
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
  onLoad () {
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
  },
  components: {
    'v-Works': Works
  }
}
</script>

<style>

</style>
