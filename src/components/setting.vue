<template>
  <div class="setting-com-wrapper">
    <div class="menu">
      <span>图片模式</span>
      <span>文字模式</span>
      <span>字体选择</span>
    </div>
    <div class="menu-detail" v-show="false">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.setting-com-wrapper{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #eee;
  .menu{
    width: 100%;
    text-align: center;
    font-size: 14px;
    span{
      color: #666;
      display: inline-block;
      line-height: 50px;
      margin-right: 20px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
}
</style>
