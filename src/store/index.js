import {createStore } from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)
const state ={
  username:'',
  cartCount:0
}

export default new createStore({
  state,
  mutations,
  actions
})
