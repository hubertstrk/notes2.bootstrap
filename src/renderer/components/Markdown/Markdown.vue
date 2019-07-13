<template>
  <MarkdownViewer :text="activeText" />
</template>

<script>
  import MarkdownViewer from './MarkdownViewer'
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'Markdown',
    components: {
      MarkdownViewer
    },
    computed: {
      ...mapState('editor', {
        activeNoteId: state => state.activeNoteId
      }),
      ...mapGetters('editor', [
        'all'
      ]),
      activeNote () {
        return this.all.find(x => x.id === this.activeNoteId)
      },
      activeText () {
        return this.activeNote ? this.activeNote.text : ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>