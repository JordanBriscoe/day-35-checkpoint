<template>
  <div class="list-element container">
    <div class="row">
      <div class="col">
        <h3>{{list.title}}</h3>
        <button @click="deleteList" class='btn btn-outline-danger'>Delete List</button>
      </div>
    </div>

    <draggable v-for="task in tasks" class="list-group" group="task-group" @start="updateListId(task.description)"
      @add="updateListId(task.description)" @remove="updateListId(task.description)"
      @update="updateListId(task.description)" @end="updateListId(task.description)"
      @choose="updateListId(task.description)" @unchoose="updateListId(task.description)"
      @sort="updateListId(task.description)" @filter="updateListId(task.description)" @clone>
      <task-element v-bind:task="task" class="list-group-item row"></task-element>
    </draggable>
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
  import draggable from 'vuedraggable'

  export default {
    name: 'list-element',
    props: ['list'],
    components: {
      'task-element': Task,
      draggable
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
    mounted() {

    },
    methods: {
      updateListId(taskId) {
        // console.log(taskId);
        console.log(this.list._id !== taskId)
        // console.log(this.list._id, taskId);
        // if (this.list._id !== task.listId) {
        //   this.$store.dispatch('updateTaskListId', { _id: task._id, listId: this.list._id });
        //   console.log('test2')
        // }
      },
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