<template>
  <div class="task-element">
    <p>{{task.description}}</p>
    <button @click="deleteTask" class='btn btn-outline-danger'>Delete Task</button>
  </div>
</template>


<script>
  export default {
    name: 'task-element',
    props: ['task', 'boardId'],
    data() {
      return {}
    },
    computed: {},
    methods: {
      deleteTask() {
        this.$store.dispatch('deleteTask', this.task._id)
      }
    },
    components: {}
  }
</script>


<style scoped>
</style>