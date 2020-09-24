import  {createStore} from 'vuex'

export default createStore({
  state: {
    isShowBack: false
  },
  getters: {
    getIsShowBack(state:any) {
      return state.isShowBack
    }
  },
  mutations: {
    setIsShowBack(state,isShowBack:boolean) {
      state.isShowBack = isShowBack
    }
  },
  actions: {
  },
  modules: {
  }
});
