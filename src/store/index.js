import Vue from 'vue'
import "babel-polyfill"
import Vuex from 'vuex'

Vue.use(Vuex)

// import topNav from "./modules/topNav"
import user from "./modules/user"
import menu from './modules/menu'
const store = new Vuex.Store({
    modules: {
        // topNav,
        user,menu
    },

})

export default store;
