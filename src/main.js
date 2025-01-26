import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/styles/index.scss'

const app = createApp(App)

const options = {
  position: 'bottom-right',
  timeout: 2000,
  closeOnClick: false,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  rtl: false,
  transition: 'Vue-Toastification__fade',
  maxToasts: 20,
  newestOnTop: true,
  icon: false,
  shareAppContext: true,
}

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(Toast, options)
app.mount('#app')
