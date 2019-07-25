<template>
  <div class="container login">
    <div class="row">
      <div class="col">
        <h1><b>Welcome to Kanban</b></h1>
        <img class="" src="https://picsum.photos/500/500" alt="Placeholder welcome image">
      </div>
    </div>
    <form class="row" v-if="loginForm" @submit.prevent="loginUser">
      <div class="col">
        <input class="mr-4 my-3 p-2" type="email" v-model="creds.email" placeholder="email" />
        <input class="ml-4 my-3 p-2" type="password" v-model="creds.password" placeholder="password" />
      </div>
      <div class="col-12 d-flex justify-content-center">
        <button class="btn btn-success" type="submit">Login</button>
      </div>
    </form>
    <form class="row justify-content-center" v-else @submit.prevent="register">
      <div class="col-12">
        <input class="my-1 p-2" type="text" v-model="newUser.name" placeholder="name" />
      </div>
      <div class="col-12">
        <input class="my-1 p-2" type="email" v-model="newUser.email" placeholder="email" />
      </div>
      <div class="col-12">
        <input class="my-1 p-2" type="password" v-model="newUser.password" placeholder="password" />
      </div>
      <div class="col-12">
        <button class="my-1 p-2 btn btn-warning" type="submit">Create Account</button>
      </div>
    </form>
    <div class="row action" @click="loginForm = !loginForm">
      <div class="col">
        <p v-if="loginForm">No account? Click here to Register</p>
        <p v-else>Already have an account? Click here to Login</p>
      </div>
    </div>
  </div>
</template>

<script>
  import router from "@/router.js";
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    beforeCreate() {
      if (this.$store.state.user._id) {
        this.$router.push({ name: "boards" });
      }
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>

<style>
  body {
    background-color: rgb(156, 156, 156);
  }

  .action {
    cursor: pointer;
  }
</style>