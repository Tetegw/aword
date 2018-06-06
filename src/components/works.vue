<template>
  <div class="works-com-wrapper">
      <ul class="works-list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
  </div>
</template>

<script>
export default {

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
