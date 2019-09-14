import Vue from 'vue'
import {flatten} from 'lodash'
import {noteEquals} from '@/helper/Note'
import directoryApi from '@/api/directory'
import fileApi from '@/api/file'
import noteApi from '@/api/note'

const uuidv4 = require('uuid/v4')

const state = {
  notes: {},
  ui: {
    selectionMode: 'all', // all, starred, archived
    activeNoteId: null,
    selectedProject: null
  },
  statistics: null,
  dragId: null,
  loading: false
}

const mutations = {
  setNotes (state, notes) {
    state.notes = {}
    notes.forEach(note => Vue.set(state.notes, note.id, note))
  },
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
    state.ui.activeNoteId = id
  },
  updateNote (state, note) {
    Vue.set(state.notes, note.id, note)
  },
  deleteNote (state, id) {
    Vue.delete(state.notes, id)
  },
  setStatistics (state, statistics) {
    state.statistics = statistics
  },
  setDragId (state, id) {
    state.dragId = id
  }
}

const actions = {
  async reloadNotes ({rootState, commit}) {
    const fileActions = rootState.settings.locations.map((dir) => {
      return directoryApi.readDirectory(dir.directory, '.note')
    })
    const paths = await Promise.all(fileActions)

    const readActions = flatten(paths).map(path => fileApi.readFile(path.directory, path.name))

    const contents = await Promise.all(readActions)

    const notes = contents.map(({buffer, directory, name}) => {
      const note = noteApi.deserialize(buffer)
      note.directory = directory
      note.id = name
      return note
    })
    commit('setNotes', notes)
    if (notes.length > 0) {
      commit('setActiveNoteId', notes[0].id)
    }
  },
  async addNote ({commit}, {location, project, starred, title}) {
    const note = {
      id: uuidv4(),
      text: `# ${title}`,
      starred: starred,
      project: project,
      directory: location.directory
    }

    const buffer = noteApi.serialize(note)
    const noteId = note.id + '.note'
    await fileApi.writeBinary(note.directory, noteId, buffer)
    commit('addNote', note)
    commit('setSelectedProject', project)
    commit('setActiveNoteId', noteId)
  },
  updateNote ({state, commit}, note) {
    const copy = Object.assign({}, state.notes[note.id], note)
    if (!noteEquals(state.notes[note.id], copy)) {
      commit('updateNote', copy)
    }
  },
  deleteNote ({state, commit}) {
    const activeNote = state.notes[state.ui.activeNoteId]
    return fileApi.deleteFile(activeNote.directory, activeNote.id)
      .then(() => {
        commit('deleteNote', activeNote.id)
        commit('setActiveNoteId', null)
      })
  },
  loadStatistics ({state, commit}) {
    commit('setStatistics', null)
    if (state.ui.activeNoteId) {
      const note = state.notes[state.ui.activeNoteId]
      return fileApi.getStatistic(note.directory, note.id)
        .then((statistics) => {
          commit('setStatistics', statistics)
        })
    }
  },
  onDropped ({commit, dispatch}, project) {
    dispatch('updateNote', {id: state.dragId, project: project})
    commit('setDragId', null)
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
    if (state.ui.selectionMode === 'archived') {
      return getters.archived
    }
  },
  all (state) {
    return Object.values(state.notes)
  },
  starred (state, getters) {
    return getters.all.filter(x => x.starred).filter(x => !x.archived)
  },
  archived (state) {
    return Object.values(state.notes).filter(x => x.archived)
  },
  notesByProject (state, getters) {
    return getters.all.filter(x => x.project === state.ui.selectedProject).filter(x => !x.archived)
  },
  groupStatistic (state, getters) {
    const stats = {
      all: getters.all.length,
      starred: getters.starred.length,
      archived: getters.archived.length
    }
    return stats
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
