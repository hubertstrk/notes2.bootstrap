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
    state.notes.push(note)
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
    const index = state.notes.findIndex(x => x.id === note.id)
    state.notes[index] = note
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
  updateNote ({commit, getters}, note) {
    const index = getters.all.findIndex(x => x.id === note.id)
    const copy = Object.assign({}, getters.all[index], note)

    if (!isEqual(getters.all[index], copy)) {
      commit('updateNote', copy)
    }
  }
}

const getters = {
  projects (state) {
    return [...new Set(state.notes.map(x => x.project))]
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
    return state.notes
  },
  starred (state) {
    return state.notes.filter(x => x.starred)
  },
  deleted (state) {
    return state.notes.filter(x => x.deleted)
  },
  notesByProject (state, getters) {
    return getters.all.filter(x => x.project === state.ui.selectedProject)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
