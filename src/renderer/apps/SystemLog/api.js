/**
 * Created by OXOYO on 2017/12/24.
 *
 * interface
 */

import Vue from 'vue'

export default {
  getLogList: async (data) => {
    let res = await Vue.prototype.$http.get('/SystemLog/list', {
      params: data
    })
    return res
  }
}
