import {mapState, mapActions} from 'vuex'

export const NoteMixin = {
  computed: {
    ...mapState('editor', {
      activeNoteId: state => state.activeNoteId,
      notes: state => state.notes
    }),
    ...['starred', 'text', 'project', 'archived'].reduce((obj, prop) => {
      const computedProp = {
        get () {
          return this.activeNoteId ? this.notes[this.activeNoteId][prop] : null
        },
        set (value) {
          this.updateNote({id: this.activeNoteId, [prop]: value})
        }
      }
      obj[prop] = computedProp
      return obj
    }, {})
  },
  methods: {
    ...mapActions('editor', [
      'updateNote'
    ])
  }
}
