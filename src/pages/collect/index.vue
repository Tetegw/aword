<template>
  <div class="collect-wrapper">
    <v-Works :currentCardList="collectList" :noMore="noMore"></v-Works>
  </div>
</template>

<script>
import { findCollectCards } from '@/bmob.js'
import Works from '@/components/works.vue'

export default {
  data () {
    return {
      collectList: [],
      currentPage: 1,
      noMore: false,
      loadingCard: false
    }
  },
  onShow () {
    this.getCollect()
  },
  onHide () {
    this.currentPage = 1
    this.noMore = false
    this.loadingCard = false
  },
  onReachBottom () {
    if (this.loadingCard) {
      return
    }
    if (!this.noMore) {
      this.loadingCard = true
      let currentPage = this.currentPage
      this.getCollect(++currentPage)
    }
  },
  methods: {
    getCollect (currentPage = 1) {
      wx.showLoading()
      findCollectCards(currentPage).then((res) => {
        if (currentPage === 1) {
          this.collectList = res.list
        } else {
          this.collectList = this.collectList.concat(res.list)
        }
        if (res.list.length) {
          this.currentPage = res.currentPage
          if (this.collectList.length % 10) {
            this.noMore = true
          }
        } else {
          console.log('已无再多数据')
          this.noMore = true
        }
        this.loadingCard = false
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

<style lang="less">
.collect-wrapper {
  .works-com-wrapper {
    padding-bottom: 20px;
  }
}
</style>
