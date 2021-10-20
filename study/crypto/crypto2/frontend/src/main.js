import 'mutationobserver-shim'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App).use(router).use(store).use(router).use(VCalendar).mount('#app')
