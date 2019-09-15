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
    text () {
      if (!this.activeNoteId) return ''
      return this.notes[this.activeNoteId].text
    },
    ...['starred', 'project', 'archived'].reduce((obj, prop) => {
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
    }, {}),
    location () {
      if (!this.activeNoteId) return ''
      const note = this.notes[this.activeNoteId]
      return this.locations.find(x => x.directory === note.directory)
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
