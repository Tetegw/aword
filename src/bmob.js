import Bmob from 'static/bmob/Bmob-1.4.4.min.js'
import { ApplicationID, RESTAPIKey } from 'static/bmob/bmobKey.js'
Bmob.initialize(ApplicationID, RESTAPIKey)


export function auth() {
  return new Promise((resolve, reject) => {
    Bmob.User.auth().then((res) => {
      console.log('bmob_auth====>', res)
      resolve('登录成功')
    }).catch((err) => {
      reject(err)
    })
  })
}

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

export function updateStorage (objectId) {
  return new Promise((resolve, reject) => {
    Bmob.User.updateStorage(objectId).then((res) => {
      console.log('bmob_updateStorage====>', res)
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}



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

export function uploadFile(item) {
  return new Promise((resolve, reject) => {
    let name = `${new Date().getTime()}_${String(Math.random()).slice(2, 10)}.jpg`
    let file = Bmob.File(name, item);
    file.save().then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
