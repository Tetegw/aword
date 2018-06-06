
<template>
  <div class="labels-com-wrapper">
    <ul class="tab-wrapper" :class="{'fixed': fixed}" id="tab-wrapper">
      <li v-for="(item, index) in list" :key="index" :class="{'active': currentLabelIndex === index}" @click="checkedLabel(index)">
        <span>{{item}}</span><i></i>
      </li>
      <li @click="showModel = true">+</li>
    </ul>
    <v-Confirm
      :showModel="showModel"
      title="请输入新的标签"
      confirm="保存"
      @emitHideModel="emitHideModel"
      @emitConfirm="emitConfirm"
    >
    </v-Confirm>
  </div>
</template>

<script>
import Confirm from '@/components/confirm.vue'
export default {
  data() {
    return {
      list: ['默认', '诗'],
      currentLabelIndex: 0,
      showModel: false,
      fixed: false
    }
  },
  methods: {
    checkedLabel (index) {
      this.currentLabelIndex = index
      console.log('选择的tab索引', index)
    },
    emitHideModel () {
      this.showModel = false
    },
    emitConfirm(payload) {
      console.log(payload)
      this.showModel = false
    }
  },
  components: {
    'v-Confirm': Confirm
  }
}
</script>

<style scoped lang="less">
.labels-com-wrapper{
  ul.tab-wrapper{
    width: 100%;
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #eee; /*px*/
    font-size: 14px;
    overflow-y: scroll;
    background: #fff;
    &::-webkit-scrollbar {
      display: none;
    }
    -webkit-overflow-scrolling: touch;
    &.fixed{
      position: fixed;
      top: 0;
      left: 0;
    }
    li{
      flex: 1 0 23%;
      height: 30px;
      padding-top: 5px;
      text-align: center;
      position: relative;
      box-sizing: border-box;
      span{
        display: block;
        height: 22px;
        border-right: 1px solid #eee; /*px*/
      }
      &:last-child{
        border-right: none;
      }
      &.active i{
        position: absolute;
        left: 50%;
        bottom: -1px;
        transform: translate(-50%);
        width: 5px;
        height: 5px;
        background: #999;
      }
    }
  }
}
</style>
