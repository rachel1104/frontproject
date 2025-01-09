import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  // 提供数据
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  // 提供修改数据方法
  mutations: {
    // 所有mutations的第一个参数都是state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  // 提供异步操作
  actions: {
    logout (context) {
      // 个人信息要重置
      context.commit('setUserInfo', {})
      // 购物车信息要重置
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  // 提供基于state派生出来的属性
  getters: {

  }
}
