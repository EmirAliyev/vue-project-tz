import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isAppLoading: false,
  }),
  getters: {
    isAppLoadingState(state) {
      return state.isAppLoading;
    },
  },
  actions: {
    async setUser(userData) {
      this.user = userData
    },
    setAppLoading(isLoading) {
      this.isAppLoading = isLoading;
    },
  },
})
