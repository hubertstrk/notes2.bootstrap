<template>
  <AceEditor
    class="editor"
    :value="text"
    @input="onChanged"
    @init="editorInit"
    lang="markdown"
    theme="github">
  </AceEditor>
</template>

<script>
  import {debounce} from 'lodash'
  import {mapState, mapGetters} from 'vuex'

  import AceEditor from 'vue2-ace-editor'

  export default {
    name: 'Editor',
    components: {
      AceEditor
    },
    data () {
      return {
        editor: null
      }
    },
    computed: {
      ...mapGetters('editor', [
        'all'
      ]),
      ...mapState('editor', {
        activeNoteId: state => state.activeNoteId
      }),
      text () {
        if (!this.activeNoteId) return ''
        return this.all.find(x => x.id === this.activeNoteId).text
      }
    },
    methods: {
      onChanged (text) {
        if (!text) return
        this.updateNote({id: this.activeNoteId, text})
      },
      updateNote: debounce(function (note) {
        this.$store.dispatch('editor/updateNote', note)
      }, 100),
      editorInit: function (editor) {
        this.editor = editor
        require('brace/ext/language_tools')

        require('brace/mode/markdown')
        require('brace/snippets/markdown')
        require('brace/theme/github')

        this.editor.setFontSize('1.2em')
        this.editor.setShowFoldWidgets(false)
        this.editor.setShowPrintMargin(false)
        this.editor.setHighlightGutterLine(false)
        this.editor.renderer.setShowGutter(false)
      }
    }
  }
</script>

<style lang="scss" scoped>
.editor {

  padding: 10px;
  display: flex;
  flex: 1;

}
</style>