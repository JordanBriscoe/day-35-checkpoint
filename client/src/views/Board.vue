<template>
  <div class="board">
    <h3>{{board.title}}</h3>
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model='newList.title' required>
      <button type="submit">Create New List</button>
    </form>
    <div v-for="list in lists">
      This is some random text
      <button @click="deleteList(list._id)" class='btn btn-outline-danger'>Delete</button>
    </div>

  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch("getListsByBoard", this.boardId)
    },
    name: "board",
    computed: {
      lists() {
        return this.$store.state.activeBoard.lists
      },
      board() {
        return (
          //FIXME This does not work on page reload because the boards array is empty in the store
          this.$store.state.boards.find(b => b._id == this.boardId) || {
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

      }
    },
    props: ["boardId"]
  };
</script>