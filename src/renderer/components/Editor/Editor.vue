<template>
  <div v-if="activeNoteId" class="editor-component">
    <Menu>
      <div class="editor-menu">
        <div>
          <b-button variant="primary" ><font-awesome-icon icon="bookmark" /></b-button>
          <Devider xlarge />
          <b-button-group>
            <b-button><font-awesome-icon icon="search-plus" /></b-button>
            <b-button><font-awesome-icon icon="search-minus" /></b-button>
          </b-button-group>
          <Devider xlarge />
          <b-button-group>
            <b-button><font-awesome-icon icon="italic" /></b-button>
            <b-button><font-awesome-icon icon="bold" /></b-button>
            <b-button><font-awesome-icon icon="link" /></b-button>
            <b-button><font-awesome-icon icon="code" /></b-button>
            <b-button><font-awesome-icon icon="table" /></b-button>
          </b-button-group>
          <Devider xlarge />
          <b-button variant="danger" @click="onDeleteNote"><font-awesome-icon icon="trash" /> Delete</b-button>
        </div>
        <div>
          <!-- <b-button variant="danger"><font-awesome-icon icon="trash" /></b-button> -->
        </div>
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
  import {mapActions} from 'vuex'
  import {NoteMixin} from '../../mixins/NoteMixin'

  import Devider from '../Shared/Devider'
  import Menu from '../Shared/Menu'
  import AceEditor from 'vue2-ace-editor'

  export default {
    name: 'Editor',
    mixins: [NoteMixin],
    components: {
      Devider,
      Menu,
      AceEditor
    },
    data () {
      return {
        checked: false,
        editor: null
      }
    },
    methods: {
      ...mapActions('editor', [
        'deleteNote'
      ]),
      onChanged (text) {
        if (!text) return
        this.updateNote({id: this.activeNoteId, text})
      },
      onDeleteNote () {
        this.deleteNote().then(() => {
          // https://electronjs.org/docs/tutorial/notifications

          let notification = new Notification('Note', {
            body: 'Note has been deleted.'
          })
          notification.onclick = () => {}
        })
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

  .editor-menu {

    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 10px 3px;

    > div {
      display: flex;
    }
  }

  .editor {

    display: flex;
    flex: 1;

  }
}

</style>