<script>
import { useLoggedInUserStore } from "@/assets/loggedInUser"
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  name: 'App',
  data() {
    return {
      orgName: 'Dataplatform'//will need to change
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.orgName = res.data.name
    })
  },
  setup() {
    const user = useLoggedInUserStore();
    return { user };
  }
}
</script>
<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li>
              <router-link to="/login" v-if="!user.isLoggedIn">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Log In
              </router-link>
            </li> <!-- If use is logged in will bring the user information instead and option to log out-->
            <li class="nav-item dropdown" v-if="user.isLoggedIn">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarUserMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-fill" style="font-size: 1rem; color: hsla(160, 100%, 37%, 1)"></i> Welcome, {{ user.name }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarUserMenuLink">
              <li class="nav-item">
                <a href="">
                  <span @click="store.logout()" class="nav-link"><i class="bi bi-box-arrow-left"></i> Logout</span>
                </a>
              </li>
            </ul>
            </li>
            <li>
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <li v-if="user.isLoggedIn">
              <router-link  to="/intakeform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Client Intake Form
              </router-link>
            </li>
            <li v-if="user.isLoggedIn">
              <router-link  to="/service">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >add</span
                >
                Add Service
              </router-link>
            </li>
            <li v-if="user.isLoggedIn">
              <router-link  to="/eventform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Create Event
              </router-link>
            </li>
            <li>
              <router-link to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li>
              <router-link  to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>
            <li>
              <router-link  to="/findservices">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Services
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
