<template>
  <div class="editor-component">
    <EditorMenu class="editor-menu" />
    <AceEditor class="editor" :value="text" @input="onChanged" @init="intialize" lang="markdown" theme="github" />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {debounce} from 'lodash'
  import {NoteMixin} from '../../mixins/NoteMixin'

  import EditorMenu from './EditorMenu'
  import AceEditor from 'vue2-ace-editor'

  export default {
    name: 'Editor',
    mixins: [NoteMixin],
    components: {
      EditorMenu,
      AceEditor
    },
    data () {
      return {
        editor: null
      }
    },
    computed: {
      ...mapState('editor', {
        fontSize: state => state.settings.fontSize
      })
    },
    methods: {
      onChanged (text) {
        if (!text) return
        this.updateNote({id: this.activeNoteId, text})
      },
      updateNote: debounce(function (note) {
        this.$store.dispatch('editor/updateNote', note)
      }, 10),
      intialize: function (editor) {
        this.editor = editor
        require('brace/ext/language_tools')

        require('brace/mode/markdown')
        require('brace/snippets/markdown')
        require('brace/theme/github')

        this.editor.setFontSize(this.fontSize)
        this.editor.setShowFoldWidgets(false)
        this.editor.setShowPrintMargin(false)
        this.editor.setHighlightGutterLine(false)
        this.editor.renderer.setShowGutter(false)
      }
    },
    watch: {
      fontSize (value) {
        this.editor.setFontSize(value)
        this.editor.resize()
      }
    }
  }
</script>

<style lang="scss" scoped>
.editor-component {

  display: flex;
  flex-direction: column;
  flex: 1;

  .editor {

    display: flex;
    flex: 1;

  }
}

</style>