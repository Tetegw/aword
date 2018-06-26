<template>
  <div class="edit-picture-wrapper">
    <div class="scale">
      <div class="picture" :class="picClass" id="picture">
        <div class="upload">
          <img mode="aspectFill" class="img" @click="addPicture" :src="filePath" />
          <div class="add" @click="addPicture" v-show="!filePath">+</div>
        </div>
        <div class="content" :class="fontClass" v-show="PictureInfo.content">
          <i></i>
          {{PictureInfo.content}}
        </div>
        <div class="author" v-show="PictureInfo.author">
          <i>-&nbsp;</i>
          <span>{{PictureInfo.author}}</span>
          <i>&nbsp;-</i>
        </div>
      </div>
    </div>
    <v-Setting @changeMode="changeMode" @emitConfirm="emitConfirm"></v-Setting>
  </div>
</template>

<script>
import Setting from "@/components/setting.vue"
import store from '@/store.js'
import { uploadFile, create } from "@/bmob.js"

export default {
  data () {
    return {
      filePath: '',
      picClass: 'default',
      fontClass: 'vertical-left',
    }
  },
  onShareAppMessage () {
    return {
      title: '一言以蔽之',
      path: 'pages/index/main'
    }
  },
  computed: {
    PictureInfo () {
      return store.state.makePictureInfo
    },
    userInfo () {
      return store.state.userInfo
    }
  },
  methods: {
    addPicture () {
      let _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.filePath = res.tempFilePaths
        }
      })
    },
    uploadImg () {
      let file = this.filePath[0]
      if (!file) {
        wx.showToast({
          title: '请上传图片',
          icon: 'none'
        })
        return
      }
      let userId = this.userInfo.objectId
      wx.showLoading()
      uploadFile(file, userId).then((res) => {
        console.log(res)
        this.createPicture(JSON.parse(res[0]).url)
      }).catch((err) => {
        console.log('uploadImg_err', err)
        wx.showToast({
          title: '创建失败',
          icon: 'none'
        })
      })
    },
    createPicture (imgUrl) {
      // 图片，图片模式，文字模式，文字，出处，当前用户
      let params = {
        imgUrl: imgUrl,
        content: this.PictureInfo.content,
        author: this.PictureInfo.author,
        labelId: this.PictureInfo.labelId,
        privacy: this.PictureInfo.privacy,
        picClass: this.picClass,
        fontClass: this.fontClass
      }
      create(params).then((res) => {
        this.clearAll()
        wx.showToast({
          title: '创建成功',
          icon: 'none'
        })
      }).catch((err) => {
        console.log('createPicture_err', err)
        wx.showToast({
          title: '创建失败',
          icon: 'none'
        })
      })
    },
    clearAll () {
      this.filePath = ''
      this.picClass = 'default'
      this.fontClass = 'vertical-left'
      store.commit('storeMakePictureInfo', {
        content: '',
        author: '',
        labelId: '',
        privacy: false
      })
      store.commit('storeCreatedCardSuccess', true)
      wx.switchTab({
        url: '/pages/profile/main'
      })
    },
    changeMode (index, type) {
      if (type === 'pic') {
        switch (index) {
          case 0:
            this.picClass = 'default'
            break;
          case 1:
            this.picClass = 'circle'
            break;
          case 2:
            this.picClass = 'skew'
            break;

          default:
            this.picClass = 'default'
            break;
        }
      } else if (type === 'font') {
        switch (index) {
          case 0:
            this.fontClass = 'vertical-left'
            break;
          case 1:
            this.fontClass = 'vertical-right'
            break;
          case 2:
            this.fontClass = 'across-left'
            break;
          case 3:
            this.fontClass = 'across-center'
            break;
          case 4:
            this.fontClass = 'across-right'
            break;

          default:
            this.fontClass = 'vertical-left'
            break;
        }
      }
    },
    emitConfirm () {
      // 先上传图片，然后保存数据库
      this.uploadImg()
    }
  },
  components: {
    'v-Setting': Setting
  }
}
</script>

<style scoped lang="less">
.edit-picture-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 51px;
  right: 0;
  overflow: hidden;
  .scale {
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    box-shadow: 2px 2px 4px 4px #ddd; /*px*/
  }
  .picture {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    .upload {
      transition: all 0.5s;
    }
    &.default {
      .upload {
        width: 100%;
        height: 210px;
        background: #f1f1f1;
        position: relative;
        .img {
          width: 100%;
          height: 210px;
        }
        .add {
          font-size: 20px;
          width: 30px;
          height: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          line-height: 28px;
          border: 1px solid #999; /*px*/
          color: #999;
          border-radius: 50%;
        }
      }
    }
    &.skew {
      .upload {
        width: 100%;
        height: 210px;
        overflow: hidden;
        position: relative;
        background: #f1f1f1;
        &::after {
          content: "";
          position: absolute;
          bottom: -149px;
          left: 0;
          background: #fff;
          width: 200%;
          height: 150px;
          transform: rotate(-14deg);
          transform-origin: left top;
        }
        .img {
          width: 100%;
          height: 210px;
        }
        .add {
          font-size: 20px;
          width: 30px;
          height: 30px;
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          line-height: 28px;
          border: 1px solid #999; /*px*/
          color: #999;
          border-radius: 50%;
        }
      }
    }
    &.circle {
      border: 1px solid transparent; /*px*/
      box-sizing: border-box;
      .upload {
        width: 160px;
        height: 160px;
        position: relative;
        background: #f1f1f1;
        margin: 30px auto;
        border-radius: 50%;
        overflow: hidden;
        .img {
          width: 100%;
          height: 160px;
        }
        .add {
          font-size: 20px;
          width: 30px;
          height: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          line-height: 28px;
          color: #999;
        }
      }
      .content {
        position: absolute;
        top: 250px;
      }
    }
    .content {
      position: absolute;
      top: 265px;
      left: 50%;
      transform: translate(-50%);
      font-size: 16px; /*px*/
      line-height: 24px; /*px*/
      &.across-left {
        top: 260px;
        width: 70%;
        text-align: left;
        i {
          border: 2px solid transparent; /*px*/
        }
      }
      &.across-center {
        width: 70%;
        top: 260px;
        text-align: center;
        i {
          border: 2px solid transparent; /*px*/
        }
      }
      &.across-right {
        width: 70%;
        top: 260px;
        text-align: right;
        i {
          border: 2px solid transparent; /*px*/
        }
      }
      &.vertical-right {
        height: 195px;
        writing-mode: vertical-rl;
        letter-spacing: 1px; /*px*/
        i {
          position: absolute;
          right: 5px; /*px*/
          top: -23px; /*px*/
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid red; /*px*/
        }
      }
      &.vertical-left {
        height: 195px;
        writing-mode: vertical-lr;
        letter-spacing: 1px; /*px*/
        i {
          position: absolute;
          left: 5px; /*px*/
          top: -23px; /*px*/
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid red; /*px*/
        }
      }
    }
    .author {
      font-size: 14px;
      color: #999;
      font-family: "PingFang SC", "Droid Sans", HelveticaNeue, "Helvetica Neue",
        arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      text-align: center;
      position: absolute;
      bottom: 5%;
      width: 100%;
      vertical-align: middle;
      i {
        display: inline-block;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        max-width: 230px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
