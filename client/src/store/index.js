import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: '',
        id: '',
        email: '',
        username: '',
        photo: ''
    },
    getters: {
        id(state) {
            return state.id;
        },
        isConnected(state) {
            return state.token != '';
        },
        headers(state) {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
    },
    mutations: {

    },
    actions: {
        connect({state}, connectInfo) {
            console.log('hey', connectInfo);
            state.token = connectInfo.token;
            state.id = connectInfo.id;
            state.email = connectInfo.email;
            state.username = connectInfo.username;
        },
        disconnect({state}) {
            state.token = '';
            state.id = '';
            state.email = '';
            state.username = '';
        }
    },
});

export default store;
