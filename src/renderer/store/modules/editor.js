import {flatten} from 'lodash'

import directoryApi from '@/api/directory'
import fileApi from '@/api/file'
import noteApi from '@/api/note'

const state = {
  notes: [],
  active: null,
  settings: {
    directories: ['C:\\Temp\\Work', 'C:\\Temp\\Private'],
    active: null
  }
}

const mutations = {
  addNote (state, note) {
    state.notes.push(note)
  }
}

const actions = {
  async reloadNotes ({state, commit}) {
    const fileActions = state.settings.directories.map((dir) => {
      return directoryApi.readDirectory(dir)
    })
    const paths = await Promise.all(fileActions)

    const contentActions = await flatten(paths).map((path) => {
      return fileApi.readFile(path.directory, path.name)
    })
    const content = await Promise.all(contentActions)
    content.forEach((noteBuffer) => {
      const note = noteApi.deserialize(noteBuffer)
      commit('addNote', note)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
