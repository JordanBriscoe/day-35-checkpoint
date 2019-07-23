<template>
  <div class="container">
    <div class="row">
      <div class="col">
        {{list.title}}
        <button @click="deleteList" class='btn btn-outline-danger'>Delete List</button>
      </div>
    </div>
    <div v-for="task in tasks" class="row">
      <div class="col">
        <p>{{task.description}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form @submit.prevent="addTask">
          <textarea type="textarea" placeholder="description" v-model='newTask.description' required> </textarea>
          <button type="submit" class='btn btn-outline-success'>Create New Task</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'List',
    props: ['list'],
    computed: {
      tasks() {
        return this.$store.state.activeTasks;
      },
    },
    data() {
      return {
        newTask: {
          description: '',
          listId: ''
        }
      }
    },
    mounted() {

    },
    methods: {
      deleteList() {
        this.$store.dispatch('deleteList', this.list._id)
      },
      addTask() {
        this.newTask.listId = this.list._id;
        this.$store.dispatch('addTask', this.newTask);
        this.newList = {
          description: '',
          listId: ''
        }
      }
    }
  }
</script>

<style scoped>
</style>