<template>
  <div class="works-com-wrapper">
      <ul class="works-list">
        <li v-for="(item, index) in currentCardList" :key="index">
          <v-MinPicture
            :PictureInfo="item"
          ></v-MinPicture>
        </li>
      </ul>
  </div>
</template>

<script>
// TODO: 没有时空空如也
import MinPicture from '@/components/minPicture.vue'

export default {
  props:{
    currentCardList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    'v-MinPicture': MinPicture
  }
}
</script>

<style scoped lang="less">
.works-com-wrapper{
  padding: 20px;
  ul.works-list{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 40%;
      margin: 0 5%;
      background: #fff;
      box-shadow: 1px 1px 2px 2px #eee;
      margin-bottom: 20px;
      text-align: center;
      position: relative;
      &::before {
        content: '';
        padding-top: 150%;
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
