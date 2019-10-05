import {ensureSettingsFile, readSettings, writeSettings} from '@/helper/Settings'

const state = {
  activeNoteId: null,
  locations: [],
  fontSize: 20,
  reader: false
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
  },
  toggleReader (state, value) {
    state.reader = value
  },
  setActiveNoteId (state, id) {
    state.activeNoteId = id
  }
}

const actions = {
  async reloadSettings ({state, commit, dispatch}) {
    const created = await ensureSettingsFile()
    if (created) {
      await writeSettings({...state})
    }
    const settings = await readSettings()
    commit('setSettings', settings)

    // if (settings.activeNoteId) {
    //   dispatch('editor/selectNote', settings.activeNoteId, {root: true})
    // }
  },
  async addLocation ({state, commit, dispatch}, location) {
    commit('addLocation', location)
    await writeSettings({...state})
    dispatch('editor/reloadNotes', null, {root: true})
  },
  async deleteLocation ({commit, dispatch}, location) {
    commit('deleteLocation', location)
    await writeSettings({...state})
    dispatch('editor/reloadNotes', null, {root: true})
  },
  setFontSize ({state, commit}, size) {
    commit('setFontSize', size)
    writeSettings({...state})
  },
  toggleReader ({state, commit}) {
    commit('toggleReader', !state.reader)
    writeSettings({...state})
  },
  setActiveNoteId ({state, commit}, id) {
    commit('setActiveNoteId', id)
    writeSettings({...state})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
