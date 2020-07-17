import { getToken, setToken, removeToken } from '@/utils/auth'
// import * as mUtils from '@/utils/mUtils'
const user = {
    // namespaced: true,
    state: {
        token: "",
        username: '',
        isCollapse:false
    },
    getters: {
        getToken: state => { return state.token},
        username: state => { return state.username},
        getIsCollapse:state=>{return state.isCollapse}
    },
    mutations: {//同步操作
        setToken: (state, t) => {
            //登录
            state.token = t;
        },
        UserLogout: (state) => {
            //登出的时候要清除token
            state.token = null;

        },
        UserName: (state, data) => {
            //把用户名存起来
            state.username = data;
        },
        setIsCollapse:(state,data)=>{
            state.isCollapse = data;
        }
    },
    actions: {//异步操作
        //登录
        setToken({ commit }, state ) {
            commit('setToken', state);
           
        },
        //退出登录
        UserLogout({ commit }) {
            commit('UserLogout');
            removeToken('Token')
        },
        //获取用户名
        UserName({ commit }, state) {
            commit('UserName', state);
            setToken("Token",state);
        },
        //导航缩进
        setIsCollapse({ commit }, state) {
            commit('setIsCollapse', state);

        }
    }
}

export default user
