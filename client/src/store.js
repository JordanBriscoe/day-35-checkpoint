import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'
import boardModule from './modules/BoardModule'
import listModule from './modules/ListModule'
import taskModule from './modules/TaskModule'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {}
  },
  modules: {
    boardModule,
    listModule,
    taskModule
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    resetState(state) {
      state.user = {}
      // @ts-ignore
      state.boardModule.boards = []
      // @ts-ignore
      state.boardModule.activeBoard = {}
      // @ts-ignore
      state.listModule.activeLists = []
      // @ts-ignore
      state.taskModule.activeTasks = []
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    }
  }
})
