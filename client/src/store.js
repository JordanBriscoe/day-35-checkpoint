import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'

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
    user: {},
    boards: [],
    activeBoard: {},
    activeLists: [],
    activeTasks: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    resetState(state) {
      state.user = {}
      state.boards = []
      state.activeBoard = {}
      state.activeLists = []
      state.activeTasks = []
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    deleteBoard(state, boardId) {
      let index = state.boards.findIndex(elem => elem._id === boardId)
      if (index >= 0) {
        state.boards.splice(index, 1)
      }
    },
    setActiveLists(state, lists) {
      state.activeLists = lists
    },
    addList(state, list) {
      state.activeLists.push(list)
    },
    deleteList(state, listId) {
      let index = state.activeLists.findIndex(elem => elem._id === listId)
      if (index >= 0) {
        state.activeLists.splice(index, 1)
      }
    },
    addTask(state, task) {
      state.activeTasks.push(task)
    },
    deleteTask(state, taskId) {
      let index = state.activeTasks.findIndex(elem => elem._id === taskId)
      state.activeTasks.splice(index, 1)
    },
    setActiveTasks(state, tasks) {
      state.activeTasks = tasks
    },
    updateTask(state, task) {
      let index = state.activeTasks.findIndex(elem => elem._id == task._id)
      if (index >= 0) {
        state.activeTasks.splice(index, 1, task);
      }
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
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    getBoard({ commit, dispatch }, boardId) {
      api.get('boards/' + boardId)
        .then(res => commit('setActiveBoard', res.data))
        .catch(error => console.error(error))
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => commit('deleteBoard', boardId))
        .catch(error => console.error(error))
    },
    //#endregion


    //#region -- LISTS --
    getListsByBoard({ commit, dispatch }, boardId) {
      api.get('lists/board/' + boardId)
        .then(res => commit('setActiveLists', res.data))
        .catch(error => console.error(error))
    },
    addList({ commit, dispatch }, newList) {
      api.post('lists', newList)
        .then(res => commit('addList', res.data))
        .catch(error => console.error(error))
    },
    deleteList({ commit, dispatch }, listId) {
      api.delete('lists/' + listId)
        .then(res => commit('deleteList', listId))
        .catch(error => console.error(error))
    },


    //#endregion

    //#region -- TASKS --
    addTask({ commit, dispatch }, newTask) {
      api.post('tasks', newTask)
        .then(res => commit('addTask', res.data))
        .catch(error => console.error(error));
    },
    deleteTask({ commit, dispatch }, taskId) {
      api.delete('tasks/' + taskId)
        .then(res => commit('deleteTask', taskId))
        .catch(error => console.error(error))
    },
    getTasksByBoard({ commit, dispatch }, boardId) {
      api.get('tasks/board/' + boardId)
        .then(res => commit('setActiveTasks', res.data))
        .catch(error => console.error(error))
    },
    addComment({ commit, dispatch }, payload) {
      api.put('tasks/' + payload.taskId + '/comment', payload.comment)
        .then(res => commit('updateTask', res.data))
        .catch(error => console.error(error))
    },
    deleteComment({ commit, dispatch }, payload) {
      api.delete('tasks/' + payload.taskId + '/comment/' + payload.commentId)
        .then(res => commit('updateTask', res.data))
        .catch(error => console.error(error))
    },
    updateTaskListId({ commit, dispatch }, payload) {
      api.put('tasks/' + payload._id, payload)
        .then(res => commit('updateTask', res.data))
        .catch(error => console.error(error))
    }

    //#endregion
  }
})
