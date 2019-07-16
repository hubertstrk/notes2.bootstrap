<template>
  <div v-if="activeNoteId" class="editor-component">
    <Menu>
      <div class="editor-menu">
        <font-awesome-icon icon="star" size="lg" />
      </div>
    </Menu>
    <AceEditor
      class="editor"
      :value="text"
      @input="onChanged"
      @init="editorInit"
      lang="markdown"
      theme="github">
    </AceEditor>
  </div>
</template>

<script>
  import {debounce} from 'lodash'
  import {NoteMixin} from '../../mixins/NoteMixin'

  import Menu from '../Shared/Menu'
  import AceEditor from 'vue2-ace-editor'

  export default {
    name: 'Editor',
    mixins: [NoteMixin],
    components: {
      Menu,
      AceEditor
    },
    data () {
      return {
        editor: null
      }
    },
    methods: {
      onChanged (text) {
        if (!text) return
        this.updateNote({id: this.activeNoteId, text})
      },
      updateNote: debounce(function (note) {
        this.$store.dispatch('editor/updateNote', note)
      }, 10),
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