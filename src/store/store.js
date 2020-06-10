import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations,
    //mutations唯一的目的就是修改state中状态
    //mutations中的每个方法尽可能完成的事情比较单一
    /* addToCart(state,payload) {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      //2.判断oldProduct
      if(oldProduct) {
        oldProduct.count += 1
      }else {
        payload.count = 1
        state.cartList.push(payload)
      }
    } */
  actions,
  getters
})

//3.挂载到Vue实例上
export default store