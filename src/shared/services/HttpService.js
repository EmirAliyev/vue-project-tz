import axios from 'axios'
import { useToast } from 'vue-toastification'

export class HttpService {
  constructor({ auth = false } = {}) {
    this.requiresAuth = auth
    this.toast = useToast()

    this.instance = axios.create({
      baseURL: 'https://dev-api.aiscreen.io/api/v1',
    })

    const token = localStorage.getItem('token')
    if (token) {
      this.instance.defaults.headers.Authorization = `Bearer ${token}`
    }

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.data.errors) {
          const errors = error.response.data.errors
          console.log(errors, 654654)
          for (const key in errors) {
            if (key) {
              this.toast.error(errors[key][0])
            }
          }
        }
        return Promise.reject(error)
      }
    )

    return this.instance
  }
}
