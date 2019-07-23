<template>
  <div class="board">
    <h3>{{board.title}}</h3>
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model='newList.title' required>
      <button type="submit">Create New List</button>
    </form>
    <list-element v-for="list in lists" v-bind:list="list"></list-element>
  </div>
</template>

<script>
  import List from '@/components/List.vue'

  export default {
    mounted() {
      this.$store.dispatch('getBoard', this.boardId)
      this.$store.dispatch("getListsByBoard", this.boardId)
      this.$store.dispatch("getTasksByBoard", this.boardId)
    },
    name: "board",
    components: {
      'list-element': List
    },
    computed: {
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
      }
    },
    props: ["boardId"]
  };
</script>