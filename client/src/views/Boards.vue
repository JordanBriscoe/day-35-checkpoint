<template>
  <div class="boards">
    <Logout-element></Logout-element>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>
            Bob the Board Builder
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <form @submit.prevent="addBoard">
            <input type="text" placeholder="title" v-model="newBoard.title" required>
            <input type="text" placeholder="description" v-model="newBoard.description">
            <button type="submit">Create Board</button>
          </form>
        </div>
      </div>
      <div class="row boardtable">
        <div class="col">
          <div class="row boardrow justify-content-center" v-for="board in boards" :key="board._id">
            <div class="col-2 m-auto">
              <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
            </div>
            <div class="col m-auto">
              {{board.description}}
            </div>
            <button class="col-2 btn btn-danger rounded-0" v-if="board.authorId == userId"
              @click="deleteBoard(board._id)">Delete</button>
            <div v-else class="col-2">Other User's Board</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Logout from "@/components/Logout.vue"

  export default {
    name: "boards",
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boardModule.boards;
      },
      userId() {
        return this.$store.state.user._id;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch('deleteBoard', boardId)
      }
    },
    components: {
      'Logout-element': Logout
    }
  };
</script>

<style scoped>
  .boardtable {
    background-color: #fff;
  }

  .boardrow {
    border: 1px solid;
    border-color: black;
  }
</style>