import {mapState, mapActions} from 'vuex'

export const NoteMixin = {
  computed: {
    ...mapState('editor', {
      activeNoteId: state => state.activeNoteId,
      notes: state => state.notes
    }),
    text: {
      get () {
        if (!this.activeNoteId) return ''
        return this.notes[this.activeNoteId].text
      },
      set (text) {
        this.updateNote({id: this.activeNoteId, text})
      }
    },
    starred: {
      get () {
        if (!this.activeNoteId) return null
        return this.notes[this.activeNoteId].starred
      },
      set (starred) {
        this.updateNote({id: this.activeNoteId, starred})
      }
    },
    project: {
      get () {
        if (!this.activeNoteId) return null
        return this.notes[this.activeNoteId].project
      },
      set (project) {
        this.updateNote({id: this.activeNoteId, project})
      }
    }
  },
  methods: {
    ...mapActions('editor', [
      'updateNote'
    ])
  }
}
