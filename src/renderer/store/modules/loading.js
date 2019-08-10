const state = {
  isLoading: false,
  loadingPercentage: 0
}

const mutations = {
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setPercentage (state, percentage) {
    state.loadingPercentage = percentage
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
