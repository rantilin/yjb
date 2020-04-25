import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    key: '',
    answerprice: 0.99,
    msg: '',
};

const getters = {
    key: state => state.key,
    answerprice: state => state.answerprice
};

const mutations = {
    setkey(state, key) {
        state.key = key
    },
};

const actions = {
    addtoken(context, data) {
        context.commit('setkey', data)
    },
    deltoken(context, data) {
        context.commit('setkey', data)
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});