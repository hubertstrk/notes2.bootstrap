<template>
  <AceEditor :value="content" :options="options" @input="contentChanged" @init="intialize"
    lang="markdown" theme="chrome" />
</template>

<script>
  import { EventBus } from '../../helper/EventBus'

  import AceEditor from 'vue2-ace-editor'

  export default {
    name: 'Ace',
    components: {
      AceEditor
    },
    props: {
      value: String,
      options: Object
    },
    data () {
      return {
        editor: null
      }
    },
    computed: {
      content () {
        return this.value
      }
    },
    methods: {
      intialize: function (editor) {
        this.editor = editor

        require('brace/mode/markdown')
        require('brace/snippets/markdown')
        require('brace/theme/github')

        this.editor.setShowFoldWidgets(false)
        this.editor.setShowPrintMargin(false)
        this.editor.setHighlightGutterLine(false)
        this.editor.renderer.setShowGutter(false)
      },
      contentChanged (content) {
        this.$emit('input', content)
      }
    },
    created () {
      EventBus.$on('editor-insert-template', template => {
        // TODO: insert template
        console.info(template)
      })
    }
  }
</script>

<style lang="scss" scoped>
</style>