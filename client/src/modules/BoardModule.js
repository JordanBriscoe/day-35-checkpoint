import Axios from 'axios'

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/boards",
  timeout: 3000,
  withCredentials: true
})

export default {
  state: {
    boards: [],
    activeBoard: {},
  },
  mutations: {
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
  },
  actions: {
    getBoards({ commit, dispatch }) {
      api.get('')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    getBoard({ commit, dispatch }, boardId) {
      api.get('/' + boardId)
        .then(res => commit('setActiveBoard', res.data))
        .catch(error => console.error(error))
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('/' + boardId)
        .then(res => commit('deleteBoard', boardId))
        .catch(error => console.error(error))
    }
  }
}