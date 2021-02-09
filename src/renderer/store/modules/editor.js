import Vue from 'vue'
import {flatten} from 'lodash'
import {noteEquals, getTitle} from '@/helper/Note'
import directoryApi from '@/api/directory'
import fileApi from '@/api/file'
import noteApi from '@/api/note'

const uuidv4 = require('uuid/v4')

const state = {
  notes: {},
  ui: {
    selectionMode: null, // all, starred, archived, recent
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
    state.ui.activeNoteId = null
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
    note.title = getTitle(note.text)
    Vue.set(state.notes, note.id, note)
  },
  deleteNote (state, id) {
    state.ui.activeNoteId = null
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
  async reloadNotes ({rootState, dispatch, commit}) {
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
      note.title = getTitle(note.text)
      return note
    })
    commit('setNotes', notes)

    if (rootState.settings.activeNoteId) {
      dispatch('selectNote', rootState.settings.activeNoteId)
    }
  },
  async addNote ({commit, dispatch}, {location, project, starred, title}) {
    const noteId = uuidv4() + '.note'
    const note = {
      id: noteId,
      text: `# ${title}`,
      starred: starred,
      project: project,
      directory: location.directory
    }
    note.title = getTitle(note.text)

    const buffer = noteApi.serialize(note)

    await fileApi.writeBinary(note.directory, noteId, buffer)
    commit('addNote', note)
    dispatch('selectNote', noteId)
  },
  updateNote ({state, commit}, note) {
    const copy = Object.assign({}, state.notes[note.id], note)
    if (!noteEquals(state.notes[note.id], copy)) {
      commit('updateNote', copy)
    }
  },
  selectNote ({state, commit, dispatch}, id) {
    const note = state.notes[id]
    if (!note) return

    commit('setActiveNoteId', id)
    if (id && !state.ui.selectionMode) {
      commit('setSelectedProject', note.project)
    }

    dispatch('settings/setActiveNoteId', id, {root: true})

    // add recent note only in case user clicked on a real note in one of the projects
    if (id && state.ui.selectionMode !== 'recent') {
      dispatch('settings/addRecentNote', id, {root: true})
    }
  },
  async deleteNote ({state, commit, dispatch}) {
    const currentNote = state.notes[state.ui.activeNoteId]

    // delete note from settings
    await dispatch('settings/setActiveNoteId', null, {root: true})
    await dispatch('settings/removeRecentNote', currentNote.id, {root: true})

    // delete note from internal state
    commit('setActiveNoteId', null)
    commit('deleteNote', currentNote.id)

    // physically remove file
    await fileApi.deleteFile(currentNote.directory, currentNote.id)
  },
  async setArchived ({state, commit, dispatch}, archived) {
    const current = Object.values(state.notes).find(x => x.id === state.ui.activeNoteId)
    const note = {id: current.id, archived}

    // update note
    await dispatch('updateNote', note)
    commit('setActiveNoteId', null)

    // update settings
    await dispatch('settings/setActiveNoteId', null, {root: true})

    // the archived note still exists as recent note since the user might reactivate the note again
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
    return getters[state.ui.selectionMode]
  },
  all (state) {
    return Object.values(state.notes).filter(x => !x.archived)
  },
  starred (state, getters) {
    return getters.all.filter(x => x.starred).filter(x => !x.archived)
  },
  archived (state) {
    return Object.values(state.notes).filter(x => x.archived)
  },
  recent (state, getters, rootGetters) {
    return rootGetters.settings.recent.map(x => state.notes[x]).filter(x => !x.archived)
  },
  notesByProject (state, getters) {
    return getters.all.filter(x => x.project === state.ui.selectedProject).filter(x => !x.archived)
  },
  groupStatistic (state, getters, rootGetters) {
    const stats = {
      all: getters.all.length,
      starred: getters.starred.length,
      archived: getters.archived.length,
      recent: rootGetters.settings.recent.length
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
