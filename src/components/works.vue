<template>
  <div class="works-com-wrapper">
      <ul class="works-list">
        <li @click="makePicture">+</li>
        <li v-for="(item, index) in currentCardList" :key="index">
          <v-Picture
            :PictureInfo="item"
            :scale="true"
          ></v-Picture>
        </li>
      </ul>
  </div>
</template>

<script>
import Picture from '@/components/picture.vue'

export default {
  props:{
    currentCardList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    makePicture() {
      wx.navigateTo({
        url: '../editInfo/main'
      })
    }
  },
  components: {
    'v-Picture': Picture
  }
}
</script>

<style scoped lang="less">
.works-com-wrapper{
  padding: 20px;
  ul.works-list{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    li{
      width: 40%;
      background: #eee;
      margin-bottom: 20px;
      text-align: center;
      &::before {
        content: '';
        padding-top: 177%;
        float: left;
      }
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }
  }
}
</style>
