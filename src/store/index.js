import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: null,
    token: null
  },
  actions: {
    getUserInfo(context) {
      // console.log("getUserInfo token", context.state.token)
      request({
        url: "/getUserInfo",
        method: "post",
        data: {
          token: context.state.token
        }
      }).then(data => {
        context.commit("CHANGEUSERINFO", data)
      })
    }
  },
  mutations: {
    ADDTOKEN(state, TOKEN) {
      state.token = TOKEN
      // console.log("token 添加成功，值为：" + state.token)
    },
    DELETETOKEN(state) {
      state.token = null
      state.name = null
      // console.log("token 已删除")
    },
    CHANGEUSERINFO(state, obj) {
      state.name = obj.name
      state.token = obj.token
      // console.log("用户信息已获取" + state.name + state.token)
    }
  }

})