import Bmob from 'static/bmob/Bmob-1.4.4.min.js'
import { ApplicationID, RESTAPIKey } from 'static/bmob/bmobKey.js'
Bmob.initialize(ApplicationID, RESTAPIKey)

// 登录
export function auth() {
  return new Promise((resolve, reject) => {
    Bmob.User.auth().then((res) => {
      console.log('bmob_auth====>', res)
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 创建标签
export function createLable (labelInfo, isDefault) {
  return new Promise((resolve, reject) => {
    currentUser().then((res) => {
      let userId = res.objectId
      const label = Bmob.Query('label')
      label.equalTo('userId', '==', userId)
      label.equalTo('labelInfo', '==', labelInfo)
      label.find().then(res => {
        if (!res.length) {
          label.set('userId', userId)
          label.set('labelInfo', labelInfo)
          label.save().then((res) => {
            console.log('bmob_createLable===>', res)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } else if (!isDefault) {
          reject('该分类已存在')
        }
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

// 更新用户信息
export function upInfo (userInfo) {
  return new Promise((resolve, reject) => {
    Bmob.User.upInfo(userInfo).then((result) => {
      console.log('bmob_upInfo===>', result)
      resolve('更新成功')
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取当前用户
export function currentUser () {
  return new Promise((resolve, reject) => {
    let current = Bmob.User.current()
    if (current) {
      console.log('bmob_currentUser===>', current)
      resolve(current)
    } else {
      reject('获取信息失败')
    }
  })
}

// 上传文件
export function uploadFile (item, objectId) {
  return new Promise((resolve, reject) => {
    let name = `${objectId}_${new Date().getTime()}_${String(Math.random()).slice(2, 10)}.jpg`
    let file = Bmob.File(name, item);
    file.save().then((res) => {
      console.log('bmob_uploadFile===>', res)
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 创建卡片
export function create (params) {
  return new Promise((resolve, reject) => {
    if (!params.content || !params.labelId) {
      reject('信息有误')
      return
    }
    currentUser().then((res) => {
      const card = Bmob.Query('card')
      card.set('userId', res.objectId)
      card.set('imgUrl', params.imgUrl)
      card.set('content', params.content)
      card.set('author', params.author)
      card.set('privacy', params.privacy)
      card.set('labelId', params.labelId)
      card.set('picClass', params.picClass)
      card.set('fontClass', params.fontClass)
      card.save().then((res) => {
        console.log('bmob_create===>', res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取所有人的卡片
export function findCards (currentPage = 1, size = 10) {
  return new Promise((resolve, reject) => {
    const query = Bmob.Query('card')
    query.order('-createdAt')
    query.limit(size)
    query.skip(size * (currentPage - 1))
    query.find().then((res) => {
      console.log('bmob_findCards===>', res)      
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取当前用户的收藏
export function findCollectCards(currentPage = 1, size = 10) {
  return new Promise((resolve, reject) => {
    currentUser().then((res) => {
      let userId = res.objectId
      const collect = Bmob.Query('collect')
      collect.equalTo('userId', '==', userId)
      collect.order('-createdAt')   
      collect.limit(size)
      collect.skip(size * (currentPage - 1))
      collect.find().then((res) => {
        let cardIdList = []
        res.forEach((item, index) => {
          cardIdList.push(item.cardId)
        })
        const card = Bmob.Query('card')
        card.containedIn('objectId', cardIdList)
        card.find().then((res) => {
          console.log('bmob_findCollectCards===>', res)
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取某用户的所有分类
export function getUserLabels(userId) {
  return new Promise((resolve, reject) => {
    const label = Bmob.Query('label')
    label.equalTo('userId', '==', userId)
    label.find().then((res) => {
      console.log('bmob_getUserLabels===>', res)
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取某用户某栏目的的卡片数据
export function getUserLabelCard(userId, labelInfo = '默认', currentPage = 1, size = 10) {
  return new Promise((resolve, reject) => {
    getUserLabels(userId).then((res) => {
      let labelId = ''
      for (let i = 0; i < res.length; i++) {
        let item = res[i]
        if (item.labelInfo === labelInfo) {
          labelId = item.objectId
        }
      }
      const card = Bmob.Query('card')
      card.equalTo('labelId', '==', labelId)
      card.order('-createdAt')
      card.limit(size)
      card.skip(size * (currentPage - 1))
      card.find().then((result) => {
        console.log('bmob_getUserLabelCard===>', result)
        resolve({
          label: res,
          card: result
        })
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

// 收藏某卡片
export function createCollect (cardId) {
  return new Promise((resolve, reject) => {
    currentUser().then((res) => {
      const collect = Bmob.Query('collect')
      collect.equalTo('userId', '==', res.objectId)
      collect.equalTo('cardId', '==', cardId)
      collect.find().then((res) => {
        // 如果不存在，就创建
        if (!res.length) {
          collect.set('userId', res.objectId)
          collect.set('cardId', cardId)
          collect.save().then((res) => {
            console.log('bmob_createCollect===>', res)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } else {
          reject('')
        }
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

