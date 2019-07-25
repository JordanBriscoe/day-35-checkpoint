import Axios from 'axios'

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/lists",
  timeout: 3000,
  withCredentials: true
})

export default {
  state: {
    activeLists: []
  },
  mutations: {
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
    }
  },
  actions: {
    getListsByBoard({ commit, dispatch }, boardId) {
      api.get('/board/' + boardId)
        .then(res => commit('setActiveLists', res.data))
        .catch(error => console.error(error))
    },
    addList({ commit, dispatch }, newList) {
      api.post('', newList)
        .then(res => commit('addList', res.data))
        .catch(error => console.error(error))
    },
    deleteList({ commit, dispatch }, listId) {
      api.delete('/' + listId)
        .then(res => commit('deleteList', listId))
        .catch(error => console.error(error))
    }
  }
}