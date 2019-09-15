const state = {
  isLoading: false,
  isSyncing: false
}

const mutations = {
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setSyncing (state, isSyncing) {
    state.isSyncing = isSyncing
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
