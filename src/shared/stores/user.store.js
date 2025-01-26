import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
  }),
  getters: {},
  actions: {
    async setUser(userData) {
      this.user = userData
    },
  },
})
