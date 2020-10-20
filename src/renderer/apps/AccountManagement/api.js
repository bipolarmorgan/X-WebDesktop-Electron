/**
 * Created by OXOYO on 2017/7/14.
 */

import Vue from 'vue'

export default {
  // 获取account number列表
  getAccountList: async (data) => {
    let res = await Vue.prototype.$http.get('/AccountManagement/account/list', {
      params: data
    })
    return res
  },
  // 添加account number
  doAddAccount: async (data) => {
    let res = await Vue.prototype.$http.post('/AccountManagement/account/add', data)
    return res
  },
  // 删除account number
  doRemoveAccount: async (data) => {
    let res = await Vue.prototype.$http.post('/AccountManagement/account/remove', data)
    return res
  },
  // 编辑account number
  doEditAccount: async (data) => {
    let res = await Vue.prototype.$http.post('/AccountManagement/account/edit', data)
    return res
  },
  // 获取所有的应用
  getAllApps: async (data) => {
    let res = await Vue.prototype.$http.get('/AccountManagement/Apps/all', {
      params: data
    })
    return res
  }
}
