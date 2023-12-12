<script>
import { useLoggedInUserStore } from "@/assets/loggedInUser";

export default{
    name:'login',
    data: () => {
    return {
      username: "",
      password: "",
    };
  },
  setup() {
    const store = useLoggedInUserStore()
    return {
      // you can return the whole store instance to use it in the template
      store,
    }
  }
}
</script>

<template>
    <div class="row justify-content-center">
          <div class="col-md-4">
              <h3 class="text-center">Login</h3>
              <form @submit.prevent="store.login(username, password)" novalidate="true">
                  <div class="form-group">
                      <label>User name</label>
                      <input type="text" class="form-control" v-model="username" placeholder="username" required>
                  </div>
                  <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" v-model="password" placeholder="password" required>
                  </div>
                  <button class="btn btn-danger mt-3">Submit</button>
              </form>
          </div>
    </div>
  </template>
