<template>
  <drag class="task-element row p-3 my-3" :transfer-data="task">
    <button @click="deleteTask" class='m-2 btn btn-outline-danger delete-task'>X</button>
    <div class="col-12">
      <p>{{task.description}}</p>
      {{task.authorId.name}}
    </div>
    <div class="text-justify col-12" v-for="comment in task.children">
      <div class="row">
        <div class="col-11">
          <p>
            {{comment.description}}
          </p>
          - {{comment.authorId.name || "anon"}}
        </div>
        <div class="col-1">
          <button @click="deleteComment(comment._id)" class='btn btn-outline-danger'>X</button>
        </div>
      </div>
    </div>
    <div class="m-3 col-12 collapse" :id="'_' + task._id">
      <form @submit.prevent="addComment">
        <input type="text" placeholder="comment" v-model='newComment.description' required>
        <button class="btn btn-success" type="submit">Add Comment</button>
      </form>
    </div>
    <div class="col-12">
      <a class="btn btn-success" data-toggle="collapse" :href="'#_' + task._id" role="button">+</a>
    </div>
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
  .task-element {
    position: relative;
    border-top: 0.25rem;
    border-bottom: 0.25rem;
    border-style: solid;
    border-color: black;
  }

  .delete-task {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
  }
</style>