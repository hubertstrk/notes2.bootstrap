import {ensureSettingsFile, readSettings, writeSettings} from '@/helper/Settings'
import {uniq} from 'lodash'

const state = {
  activeNoteId: null,
  locations: [],
  fontSize: 20,
  reader: false,
  recent: []
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
  },
  addRecentNote (state, id) {
    if (!id) return
    const count = state.recent.unshift(id)
    if (count > 10) {
      state.recent.pop()
    }
    state.recent = uniq(state.recent)
  },
  removeRecentNote (state, id) {
    const index = state.recent.indexOf(id)
    if (index !== -1) {
      state.recent.splice(index, 1)
    }
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
  },
  addRecentNote ({state, commit}, id) {
    commit('removeRecentNote', id)
    commit('addRecentNote', id)
    writeSettings({...state})
  },
  removeRecentNote ({state, commit}, id) {
    commit('removeRecentNote', id)
    writeSettings({...state})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
