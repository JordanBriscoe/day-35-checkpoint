<template>
  <drag class="task-element" :transfer-data="task">
    <p>{{task.description}}</p>
    <form @submit.prevent="addComment">
      <input type="text" placeholder="comment" v-model='newComment.description' required>
      <button type="submit">Create New Comment</button>
    </form>
    <div v-for="comment in task.children">
      <p>filler text</p>
      <p>{{comment.description}}</p>
      <button @click="deleteComment(comment._id)" class='btn btn-outline-danger'>Delete Comment</button>
    </div>
    <button @click="deleteTask" class='btn btn-outline-danger'>Delete Task</button>
  </drag>
</template>


<script>
  import { Drop, Drag } from 'vue-drag-drop'; // needs both to compile

  export default {
    name: 'task-element',
    props: ['task'],
    data() {
      return {
        newComment: {
          description: '',
          authorId: ''
        }
      }
    },
    computed: {},
    methods: {
      deleteTask() {
        this.$store.dispatch('deleteTask', this.task._id)
      },
      addComment() {
        this.$store.dispatch('addComment', { comment: this.newComment, taskId: this.task._id });
        this.newComment = {
          description: '',
          authorId: ''
        }
      },
      deleteComment(commentId) {
        this.$store.dispatch('deleteComment', { commentId: commentId, taskId: this.task._id });
      }
    },
    components: {
      Drag
    }
  }
</script>


<style scoped>
</style>