import {mapState} from 'vuex'

export const NoteMixin = {
  computed: {
    ...mapState('editor', {
      activeNoteId: state => state.activeNoteId,
      notes: state => state.notes
    }),
    text () {
      if (!this.activeNoteId) return ''
      return this.notes[this.activeNoteId].text
    },
    starred () {
      if (!this.activeNoteId) return null
      return this.notes[this.activeNoteId].starred
    },
    project () {
      if (!this.activeNoteId) return null
      return this.notes[this.activeNoteId].project
    }
  }
}
