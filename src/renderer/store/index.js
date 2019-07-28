import Vue from 'vue'
import Vuex from 'vuex'

import notesChangedPlugin from './plugins/NotesChangedPlugin'
import HistoryPlugin from './plugins/HistoryPlugin'

// import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    // createPersistedState(),
    // createSharedMutations()
    notesChangedPlugin,
    HistoryPlugin
  ],
  strict: process.env.NODE_ENV !== 'production'
})
