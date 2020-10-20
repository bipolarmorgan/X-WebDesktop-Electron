/**
 * Created by OXOYO on 2017/12/5.
 */

import Api from '../api'

export default {
  // 登录
  'doSignIn': async ({ commit }, payload) => {
    // 调interface
    let res = await Api.doSignIn(payload)
    return res
  }
}
