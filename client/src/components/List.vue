<template>
  <div class="list-element container">
    <div class="row">
      <div class="col">
        {{list.title}}
        <button @click="deleteList" class='btn btn-outline-danger'>Delete List</button>
      </div>
    </div>
    <task-element v-for="task in tasks" v-bind:task="task" class="row"></task-element>
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
  import Task from '@/components/Task.vue'

  export default {
    name: 'list-element',
    props: ['list'],
    components: {
      'task-element': Task
    },
    computed: {
      tasks() {
        return this.$store.state.activeTasks.filter(curr => curr.listId === this.list._id);
      },
    },
    data() {
      return {
        newTask: {
          description: '',
          listId: this.list._id,
          boardId: this.list.boardId
        }
      }
    },
    methods: {
      deleteList() {
        this.$store.dispatch('deleteList', this.list._id)
      },
      addTask() {
        this.$store.dispatch('addTask', this.newTask);
        this.newTask = {
          description: '',
          listId: this.list._id,
          boardId: this.list.boardId
        }
      }
    }
  }
</script>

<style scoped>
</style>