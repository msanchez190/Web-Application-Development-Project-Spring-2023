import { createApp, markRaw } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'
import { createPinia } from 'pinia'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App)

//create a pinia root store
const pinia = createPinia();
//pinia should be able to use router - has to be setup as plugin
pinia.use(({ store }) => {
  store.$router = markRaw(router)
});

//add pinia object to our instance
app.use(pinia)
app.use(router)
app.mount('#app')
