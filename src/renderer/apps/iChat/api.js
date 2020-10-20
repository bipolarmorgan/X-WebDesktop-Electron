/**
 * Created by OXOYO on 2017/12/24.
 *
 * interface
 */

import Vue from 'vue'

export default {
  doSendMessage: async (data) => {
    let res = await Vue.prototype.$http.post('/iChat/sendMessage', data)
    return res
  }
}
