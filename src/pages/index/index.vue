<template>
  <div class="index-wrapper">
    <swiper class="swiper">
      <block v-for="(item, index) in pictureList" :key="index">
        <swiper-item @click="selectPicture(item)">
          <div class="swiper-item">
            <v-Picture></v-Picture>
          </div>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
import Picture from '@/components/picture.vue'
export default {
  data () {
    return {
      pictureList: [
        {
          content: '1间隔彼此江北城，间隔彼此江北城，间隔彼此江',
          author: '孙晨',
          labelItem: '默认',
          privacy: false
        },
        {
          content: '2间隔彼此江北城，间隔彼此江北城，间隔彼此江',
          author: '2孙晨',
          labelItem: '默认',
          privacy: false
        },
      ]
    }
  },
  onShareAppMessage(){
  },
  methods: {
    selectPicture (item) {
      let res = this.stringifyObject(item).slice(1)
      let url = `../showPicture/main?${res}`
      wx.navigateTo({
        url: url
      })
    },
    stringifyObject(item){
      let res = ''
      for (let key in item) {
        if (item.hasOwnProperty(key)) {
          let value = item[key]
          res += `&${key}=${value}`
        }
      }
      return res
    }
  },
  components: {
    'v-Picture': Picture
  }
}
</script>

<style scoped lang="less">
.index-wrapper{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f2f2f2;
  .swiper{
    height: 100%;
    .swiper-item{
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 10px;
      right: 10px;
    }
  }
}
</style>
