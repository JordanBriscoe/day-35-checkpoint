<template>
  <div class="board">
    <h3>{{board.title}}</h3>
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model='newList.title' required>
      <button type="submit">Create New List</button>
    </form>
    <form @submit.prevent="addTask()">
      <textarea type="textarea" placeholder="description" v-model='newTask.description' required> </textarea>
      <button type="submit" class='btn btn-outline-success'>Create New Task</button>
    </form>
    <div v-for="task in tasks">
      <p>{{task.description}}</p>
      <button @click="deleteTask(task._id)" class='btn btn-outline-danger'>Delete Task</button>
    </div>
    <div v-for="list in lists">
      <div class="container">
        <div class="row">
          <div class="col">
            {{list.title}}
            <button @click="deleteList(list._id)" class='btn btn-outline-danger'>Delete List</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('getBoard', this.boardId)
      this.$store.dispatch("getListsByBoard", this.boardId)
    },
    name: "board",
    computed: {
      tasks() {
        return this.$store.state.activeTasks;
      },
      lists() {
        return this.$store.state.activeLists
      },
      board() {
        return (
          this.$store.state.activeBoard || {
            title: "Loading..."
          }
        );
      },
    },
    data() {
      return {
        newList: {
          title: '',
          boardId: this.boardId
        },
        newTask: {
          description: '',
          listId: ''
        }
      }
    },
    methods: {
      addList() {
        this.$store.dispatch('addList', this.newList)
        this.newList = {
          title: '',
          boardId: this.boardId
        }
      },
      deleteList(listId) {
        this.$store.dispatch('deleteList', listId)

      },
      addTask() {
        this.newTask.listId = this.lists[0]._id;
        this.$store.dispatch('addTask', this.newTask);
        this.newList = {
          description: '',
          listId: ''
        }
      },
      deleteTask(taskId) {
        this.$store.dispatch('deleteTask', taskId)

      }
    },
    props: ["boardId"]
  };
</script>