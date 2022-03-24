import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import request from '@/api'

export default new Vuex.Store({
  state: {
    userName: null,
    avatarPath: null,
    name: null
  },
  actions: {
    getUserInfo(context) {
      console.log("getUserInfo");
      if (context.state.userName) {
        request({
          url: `/avatar/getByUserName?username=${context.state.userName}`,
        }).then(data => {
          console.log("data", data);
          if (data.isOK) {
            context.commit("GETAVATAR", data)
          }
        })
      }
    }
  },
  mutations: {
    SIGNIN(state, data) {
      console.log("vuex get userName", data.userName);
      state.userName = data.userName
      console.log("vuex get name", data.name);
      state.name = data.name

    },
    SIGNOUT(state) {
      state.userName = null
      console.log("vuex remove userName", state.userName);

    },
    GETAVATAR(state, data) {
      console.log("vuex get avatarPath", data.avatarPath);
      state.avatarPath = data.avatarPath
      console.log("state.avatarPath", state.avatarPath);
    }
  }

})