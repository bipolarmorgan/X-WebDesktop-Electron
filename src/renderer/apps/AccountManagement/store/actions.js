/**
 * Created by OXOYO on 2017/7/14.
 */

// 导入api
import Api from '../api'

export default {
  // 获取account number列表
  'account/list': async ({ commit }, payload) => {
    // 调interface
    let res = await Api.getAccountList(payload)
    return res
  },
  // 添加account number
  'account/add': async ({ commit }, payload) => {
    // 调interface
    let res = await Api.doAddAccount(payload)
    return res
  },
  // 删除account number
  'account/remove': async ({ commit }, payload) => {
    // 调interface
    let res = await Api.doRemoveAccount(payload)
    return res
  },
  // 编辑account number
  'account/edit': async ({ commit }, payload) => {
    // 调interface
    let res = await Api.doEditAccount(payload)
    return res
  },
  // 获取所有的app
  'Apps/all': async ({ commit }, payload) => {
    // 调interface
    let res = await Api.getAllApps(payload)
    return res
  }
}
