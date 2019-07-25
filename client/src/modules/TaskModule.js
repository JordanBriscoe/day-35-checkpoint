import Axios from 'axios'

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/tasks",
  timeout: 3000,
  withCredentials: true
})

export default {
  state: {
    activeTasks: []
  },
  mutations: {
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
    addTask({ commit, dispatch }, newTask) {
      api.post('', newTask)
        .then(res => commit('addTask', res.data))
        .catch(error => console.error(error));
    },
    deleteTask({ commit, dispatch }, taskId) {
      api.delete('/' + taskId)
        .then(res => commit('deleteTask', taskId))
        .catch(error => console.error(error))
    },
    getTasksByBoard({ commit, dispatch }, boardId) {
      api.get('/board/' + boardId)
        .then(res => commit('setActiveTasks', res.data))
        .catch(error => console.error(error))
    },
    addComment({ commit, dispatch }, payload) {
      api.put('/' + payload.taskId + '/comment', payload.comment)
        .then(res => commit('updateTask', res.data))
        .catch(error => console.error(error))
    },
    deleteComment({ commit, dispatch }, payload) {
      api.delete('/' + payload.taskId + '/comment/' + payload.commentId)
        .then(res => commit('updateTask', res.data))
        .catch(error => console.error(error))
    },
    updateTaskListId({ commit, dispatch }, payload) {
      api.put('/' + payload._id, payload)
        .then(res => commit('updateTask', res.data))
        .catch(error => console.error(error))
    }
  }
}