import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
    //    userInfo:'',
    //    token:''
          mchid:'',
          houseInfo:{}
    },
    mutations:{
        "GET_USERINFO"(state,payload){
            // console.log(11);
            state.mchid = payload
            // console.log("1234",payload)
            // state.token =payload.token
        },
        "DEL_USERINFO"(state,payload){
            // state.userInfo = ''
            // state.token = ''
            state.mchid = ''
        }
    },
    plugins:[
        createPersistedState({
            storage: {
              getItem: key => sessionStorage.getItem(key),
              // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
              setItem: (key, value) => sessionStorage.setItem(key, value),
              removeItem: key => sessionStorage.removeItem(key),
            },
        }),
    ]

})
export default store
