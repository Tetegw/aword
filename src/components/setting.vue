<template>
  <div class="setting-com-wrapper">
    <div class="menu">
      <span v-for="(item, index) in mode" :key="index" @click="checkMode(index)">{{item}}</span>
      <span class="confirm" @click="confirm">保存</span>
    </div>
    <div class="menu-detail" :class="{'active': checkedMode}">
      <div class="confirm" @click="checkedMode = false"></div>
      <ul>
        <li v-for="(item, index) in modeList" :key="index" @click="changeMode(index, item.type)">{{item.value}}</li>
      </ul>
    </div>
    <v-Confirm :showModel="showModel" content="确定保存此卡片吗" confirm="确定" @emitHideModel="emitHideModel" @emitConfirm="emitConfirm"></v-Confirm>
  </div>
</template>

<script>
import Confirm from '@/components/confirm.vue'

const mode = ['图片模式', '文字模式']
const modeList = {
  modeList_0: [{ type: 'pic', value: '矩形' }, { type: 'pic', value: '圆形' }, { type: 'pic', value: '斜切' }],
  modeList_1: [{ type: 'font', value: '竖左' }, { type: 'font', value: '竖右' }, { type: 'font', value: '居左' }, { type: 'font', value: '居中' }, { type: 'font', value: '居右' }]
}
export default {
  data () {
    return {
      mode,
      checkedMode: false,
      modeList: [],
      showModel: false
    }
  },
  methods: {
    checkMode (index) {
      this.checkedMode = true
      this.modeList = modeList[`modeList_${index}`]
    },
    changeMode (index, type) {
      this.$emit('changeMode', index, type)
    },
    confirm () {
      this.showModel = true
    },
    emitHideModel () {
      this.showModel = false
    },
    emitConfirm () {
      this.$emit('emitConfirm')
      this.showModel = false
    }
  },
  components: {
    'v-Confirm': Confirm
  }
}
</script>

<style scoped lang="less">
.setting-com-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #eee; /*px*/
  background: #fff;
  .menu {
    width: 100%;
    text-align: center;
    font-size: 14px;
    position: relative;
    span {
      color: #666;
      display: inline-block;
      line-height: 50px;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
    .confirm {
      position: absolute;
      right: 20px;
      line-height: 50px;
    }
  }
  .menu-detail {
    position: absolute;
    z-index: 2;
    left: 100%;
    top: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    transition: all 0.5s;
    &.active {
      transform: translate(-100%);
    }
    ul {
      margin-right: 40px;
      display: flex;
      flex-wrap: nowrap;
      height: 50px;
      background: #fff;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      -webkit-overflow-scrolling: touch;
      li {
        flex: 1 0 25%;
        line-height: 50px;
        text-align: center;
        color: #666;
        font-size: 14px;
      }
    }
    .confirm {
      position: absolute;
      top: 10px;
      right: 3px;
      width: 30px;
      height: 30px;
      transform: translate3d(0, 0, 0) rotate(45deg);
      &:before {
        content: "";
        position: absolute;
        top: 15px;
        left: 6px;
        width: 11px;
        height: 1px;
        background: #666;
      }
      &:after {
        content: "";
        position: absolute;
        left: 16px;
        top: 15px;
        height: 11px;
        width: 1px;
        background: #666;
      }
    }
  }
}
</style>
