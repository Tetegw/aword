<template>
  <div class="works-com-wrapper">
      <ul class="works-list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li @click="makePicture">+</li>
      </ul>
  </div>
</template>

<script>
export default {
  methods: {
    makePicture() {
      wx.navigateTo({
        url: '../editInfo/main'
      })
    }
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
