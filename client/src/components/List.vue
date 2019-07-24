<template>
  <div class="list-element container">
    <div class="row">
      <div class="col">
        {{list.title}}
        <button @click="deleteList" class='btn btn-outline-danger'>Delete List</button>
      </div>
    </div>
    <drop class="drop" @dragover="over = true" @dragleave="over = false" @drop="handleDrop">
      <task-element v-for="task in tasks" v-bind:task="task" class="row"></task-element>
    </drop>
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
  import { Drop, Drag } from 'vue-drag-drop' // needs both to compile

  export default {
    name: 'list-element',
    props: ['list'],
    components: {
      'task-element': Task,
      'drop': Drop
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
      },
      handleDrop(data) {
        alert(`You dropped with data: ${JSON.stringify(data)} on list ${this.list.title}`);
      }
    }
  }
</script>

<style scoped>
</style>