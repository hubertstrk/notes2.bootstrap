import {ensureSettingsFile, readSettings, writeSettings} from '@/helper/Settings'

const state = {
  locations: [],
  fontSize: 20
}

const mutations = {
  setSettings (state, settings) {
    Object.keys(settings).forEach((key) => {
      state[key] = settings[key]
    })
  },
  addLocation (state, location) {
    state.locations.push(location)
  },
  deleteLocation (state, location) {
    const index = state.locations.findIndex(x => x.directory === location.directory)
    state.locations.splice(index, 1)
  },
  setFontSize (state, size) {
    state.fontSize = size
  }
}

const actions = {
  async reloadSettings ({state, commit}) {
    const created = await ensureSettingsFile()
    if (created) {
      await writeSettings({...state})
    }
    const settings = await readSettings()
    commit('setSettings', settings)
  },
  addLocation ({state, commit}, location) {
    commit('addLocation', location)
    writeSettings({...state})
  },
  deleteLocation ({commit}, location) {
    commit('deleteLocation', location)
    writeSettings({...state})
  },
  setFontSize ({state, commit}, size) {
    commit('setFontSize', size)
    writeSettings({...state})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
