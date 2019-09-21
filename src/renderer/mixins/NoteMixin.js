import {mapState, mapMutations, mapActions} from 'vuex'

export const NoteMixin = {
  computed: {
    ...mapState('editor', {
      activeNoteId: state => state.ui.activeNoteId,
      notes: state => state.notes
    }),
    ...mapState('settings', [
      'locations'
    ]),
    ...['starred', 'project'].reduce((obj, prop) => {
      const computedProp = {
        get () {
          return this.activeNoteId ? this.notes[this.activeNoteId][prop] : null
        },
        set (value) {
          if (value) {
            this.updateNote({id: this.activeNoteId, [prop]: value})
          }
        }
      }
      obj[prop] = computedProp
      return obj
    }, {}),
    archived () {
      if (this.activeNoteId) {
        return this.notes[this.activeNoteId].archived
      }
    }
  },
  methods: {
    ...mapActions('editor', [
      'updateNote'
    ]),
    ...mapMutations('editor', [
      'setSelectionMode'
    ])
  }
}
