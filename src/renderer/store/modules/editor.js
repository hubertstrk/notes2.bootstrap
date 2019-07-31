import Vue from 'vue'
import {flatten, cloneDeep} from 'lodash'
import {noteEquals} from '../../helper'

import directoryApi from '@/api/directory'
import fileApi from '@/api/file'
import noteApi from '@/api/note'
import neDb from '@/api/neDb'

const uuidv4 = require('uuid/v4')

const state = {
  notes: [],
  activeNoteId: null,
  collections: [],
  settings: {
    storageLocations: [{directory: 'C:\\Temp\\Work', name: 'Work'}, {directory: 'C:\\Temp\\Private', name: 'Private'}],
    fontSize: 20
  },
  ui: {
    selectionMode: 'all', // all, starred, archived
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
  },
  deleteNote (state, id) {
    Vue.delete(state.notes, id)
  },
  updateSettings (state, settings) {
    state.settings = settings
  },
  addCollections (state, collections) {
    state.collections = collections
  },
  addStorageLocation (state, storageLocation) {
    state.settings.storageLocations.push(storageLocation)
  },
  deleteStorageLocation (state, storageLocation) {
    const index = state.settings.storageLocations.findIndex(x => x.directory === storageLocation.directory)
    if (index !== -1) {
      state.settings.storageLocations.splice(index, 1)
    }
  }
}

const actions = {
  async reloadNotes ({state, commit}) {
    const fileActions = state.settings.storageLocations.map((dir) => {
      return directoryApi.readDirectory(dir.directory, '.note')
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

    const collectionActions = await neDb.loadCollections(state.settings.directories)
    const collections = await Promise.all(collectionActions)
    commit('addCollections', cloneDeep(collections))
  },
  addNote ({state, commit}) {
    const selectedProject = state.ui.selectedProject

    const note = {
      id: uuidv4(),
      text: '# Title',
      starred: false,
      project: selectedProject,
      directory: Object.values(state.notes).filter(x => x.project === selectedProject)[0].directory
    }

    commit('addNote', note)
    commit('setActiveNoteId', note.id)

    const buffer = noteApi.serialize(note)
    return fileApi.writeBinary(note.directory, note.id, buffer)
  },
  updateNote ({state, commit}, note) {
    const copy = Object.assign({}, state.notes[note.id], note)
    if (!noteEquals(state.notes[note.id], copy)) {
      commit('updateNote', copy)
    }
  },
  deleteNote ({state, commit}) {
    const activeNote = state.notes[state.activeNoteId]
    return fileApi.deleteFile(activeNote.directory, activeNote.id)
      .then(() => {
        commit('deleteNote', activeNote.id)
        commit('setActiveNoteId', null)
      })
  },
  updateSettings ({state, commit}, settings) {
    const copy = Object.assign({}, state.settings, settings)
    commit('updateSettings', copy)
  },
  setActiveNoteId ({commit}, id) {
    commit('setActiveNoteId', id)
  },
  addStorageLocation ({commit}, storageLocation) {
    commit('addStorageLocation', storageLocation)
  },
  deleteStorageLocation ({commit}, storageLocation) {
    commit('deleteStorageLocation', storageLocation)
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
    return Object.values(state.notes).filter(x => !x.archived)
  },
  starred (state, getters) {
    return getters.all.filter(x => x.starred)
  },
  archived (state) {
    return Object.values(state.notes).filter(x => x.archived)
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
