import axios from 'axios'

export class HttpService {
  constructor({ auth = false } = {}) {
    this.requiresAuth = auth

    this.instance = axios.create({
      baseURL: 'https://dev-api.aiscreen.io/api/v1',
    })
    const token = localStorage.getItem('token')
    this.instance.defaults.headers.Authorization = `Bearer  ${token}`
    return this.instance
  }
}
