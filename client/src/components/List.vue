<template>
  <drop class="drop list-element col m-3 bg-primary p-3 rounded" @drop="handleDroppedTask">
    <div class="row mb-3">
      <div class="col-12">
        <h3>{{list.title}}</h3>
      </div>
      <div class="col-6 mb-3">
        <a class="btn btn-success" data-toggle="collapse" :href="'#_' + list._id" role="button">+</a>
      </div>
      <div class="col-6 mb-3">
        <button @click="deleteList" class='btn btn-outline-danger'>X</button>
      </div>
      <div class="col-12 collapse" :id="'_' + list._id">
        <form @submit.prevent="addTask">
          <div class="row">
            <div class="col-12">
              <textarea type="textarea" placeholder="description" v-model='newTask.description' required> </textarea>
            </div>
            <div class="col-12">
              <button type="submit" class='btn btn-success'>Create New Task</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="col">
      <task-element v-for="task in tasks" :key="task._id" v-bind:task="task" class="row"></task-element>
    </div>
  </drop>
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
        return this.$store.state.taskModule.activeTasks.filter(curr => curr.listId === this.list._id);
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
      handleDroppedTask(task) {
        if (task.listId != this.list._id) {
          this.$store.dispatch('updateTaskListId', { _id: task._id, listId: this.list._id });
        }
      }
    }
  }
</script>

<style scoped>
  .list-element {
    min-height: 75vh;
    max-height: 75vh;
    overflow-x: hidden;
    overflow-y: scroll;
    flex-wrap: nowrap;
  }
</style>