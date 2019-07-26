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
        <form @submit.prevent="addCollaborator">
          <input type="text" placeholder="title" v-model='collaborator' required>
          <button class="btn btn-success" type="submit">Add Collaborator</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h5>Collaborators: </h5>
        <div v-for="user in board.collaborators">
          <h5>{{user}}</h5>
          <button class="btn btn-danger" @click="deleteCollaborator(user)">Delete Collaborator</button>
        </div>
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
        },
        collaborator: ''
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
      addCollaborator() {
        let newCollaborator = this.board.collaborators.slice(0)
        newCollaborator.push(this.collaborator);
        let updateValue = {
          _id: this.board._id,
          collaborators: newCollaborator
        };
        this.$store.dispatch('addCollaborator', updateValue);
        this.collaborator = ''
      },
      deleteCollaborator(deletedCollaborator) {
        // get a copy of the board ID and collaborator list: an object
        // collab list needs to be a copy
        let updatedBoard = { _id: this.board._id, collaborators: this.board.collaborators.slice(0) }
        // from the above list we need to delete the specific collaborator
        let index = updatedBoard.collaborators.findIndex(collaborator => deletedCollaborator == collaborator)
        updatedBoard.collaborators.splice(index, 1)
        // then send new object to the server(this is minus the specific collaborator)
        this.$store.dispatch('killCollaborator', updatedBoard)
      }
    },
    props: ["boardId"]
  };
</script>