/**
 * Created by OXOYO on 2018/4/20.
 */

// 导入api
import Api from '../api'

export default {
  'translate': async ({ commit }, payload) => {
    // 调interface
    let res = await Api.doTranslate(payload)
    return res
  }
}
