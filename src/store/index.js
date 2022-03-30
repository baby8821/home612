import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    changeAva: false,
    uploadImg: null,
  },
  mutations: {
    CHANGE(state, payload) {
      console.log("vuex set changeAva", payload);
      state.changeAva = payload
    },

    ADDUPLOADIMG(state, payload) {
      console.log("vuex get uploadImg", payload);
      state.uploadImg = payload;
    },

    DELUPLOADIMG(state) {
      console.log("vuex del uploadImg");
      state.uploadImg = null
    }
  }

})