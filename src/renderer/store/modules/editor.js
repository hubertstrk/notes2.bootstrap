import Vue from 'vue'
import {flatten, isEqual} from 'lodash'

import directoryApi from '@/api/directory'
import fileApi from '@/api/file'
import noteApi from '@/api/note'

const state = {
  notes: [],
  activeNoteId: null,
  settings: {
    directories: ['C:\\Temp\\Work', 'C:\\Temp\\Private']
  },
  ui: {
    selectionMode: 'all', // all, starred, deleted
    selectedProject: null
  }
}

const mutations = {
  addNote (state, note) {
    Vue.set(state.notes, note.id, note)
  },
  setSelectionMode (state, mode) {
    state.ui.selectedProject = null
    state.ui.selectionMode = mode
  },
  setSelectedProject (state, project) {
    state.ui.selectionMode = null
    state.ui.selectedProject = project
  },
  setActiveNoteId (state, id) {
    state.activeNoteId = id
  },
  updateNote (state, note) {
    Vue.set(state.notes, note.id, note)
  }
}

const actions = {
  async reloadNotes ({state, commit}) {
    const fileActions = state.settings.directories.map((dir) => {
      return directoryApi.readDirectory(dir)
    })
    const paths = await Promise.all(fileActions)

    const readActions = flatten(paths).map(path => fileApi.readFile(path.directory, path.name))

    const contents = await Promise.all(readActions)

    contents.forEach(({buffer, directory, name}) => {
      const note = noteApi.deserialize(buffer)
      note.directory = directory
      note.id = name
      commit('addNote', note)
    })
  },
  updateNote ({state, commit}, note) {
    const copy = Object.assign({}, state.notes[note.id], note)

    if (!isEqual(state.notes[note.id], copy)) {
      commit('updateNote', copy)
    }
  }
}

const getters = {
  projects (state) {
    return [...new Set(Object.values(state.notes).map(x => x.project))]
  },
  visibleNotes (state, getters) {
    if (state.ui.selectedProject) {
      return getters.notesByProject
    }
    if (state.ui.selectionMode === 'all') {
      return getters.all
    }
    if (state.ui.selectionMode === 'starred') {
      return getters.starred
    }
    if (state.ui.selectionMode === 'deleted') {
      return getters.deleted
    }
  },
  all (state) {
    return Object.values(state.notes)
  },
  starred (state) {
    return Object.values(state.notes).filter(x => x.starred)
  },
  deleted (state) {
    return Object.values(state.notes).filter(x => x.deleted)
  },
  notesByProject (state) {
    return Object.values(state.notes).filter(x => x.project === state.ui.selectedProject)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
