<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="col">
        <h3>{{board.title}}</h3>
        <h5>{{board.description}}</h5>
      </div>
      <div class="col align-self-end">
        <form @submit.prevent="addList">
          <input type="text" placeholder="title" v-model='newList.title' required>
          <button class="btn btn-success" type="submit">Create New List</button>
        </form>
      </div>
    </div>
    <div class="row listbox my-5 p-3">
      <list-element v-for="list in lists" v-bind:list="list"></list-element>
    </div>
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
        return this.$store.state.listModule.activeLists
      },
      board() {
        return (
          this.$store.state.boardModule.activeBoard || {
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