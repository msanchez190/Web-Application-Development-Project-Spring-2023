<script>
import useVuelidate from '@vuelidate/core'
import { required} from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      org: '',
      service: {
        name: '',
        status:''
      }
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.org = res.data._id
    })
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    // if valid:
    //  if service with name exists in db:
    //      do nothing
    //    else create service document
    registerService() {
      this.v$.$validate().then((valid) => {
        if (valid) {
          axios
            .get(`${apiURL}/services/name/${this.service.name}`) //backend finds one documents
            .then((res) => {
                if(res.data){ //if the data includes a name options then it found one that exists
                    alert('Service already exists')
                    console.log(res.data)
                }
                else{
                    axios
                  .post(`${apiURL}/services`, this.service)
                  .then(() => {
                    alert('Services added')
                    this.$router.push({ name: 'findservices' })
                  })
                  .catch((error) => {
                    console.log(error)
                  })
                }
            })
        }
      })
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      service: {
        name: { required},
        status: { required}
      }
    }
  }
}
</script>

<template>
  <main>
    <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      Service Intake Form
    </h1>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="registerService">
        <!-- grid container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.name"
              />
              <span class="text-black" v-if="v$.service.name.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.service.name.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <!-- form field -->
          <div class="flex flex-col">
            <div> <!--Dropdown menu for status instead of text field-->
              <label for="status-selection">Select Status</label> <!--https://www.nightprogrammer.com/vue-3/get-value-of-selected-option-from-select-dropdown-in-vue-3-example/-->
            <select
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="status-selection"
              v-model="service.status"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            </div>
          </div>
          <!-- submit button -->
          <div class="flex justify-between mt-10 mr-20">
            <button class="bg-red-700 text-white rounded" type="submit">
              Add Service
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
