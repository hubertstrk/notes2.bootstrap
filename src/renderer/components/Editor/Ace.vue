<template>
  <ace-editor v-model="content" @init="intialize" lang="markdown" theme="chrome" :options="options" />
</template>

<script>
  import AceEditor from 'vue2-ace-editor'

  export default {
    name: 'AppEditor',
    components: {
      AceEditor
    },
    props: ['value', 'options'],
    data () {
      return {
        editor: null
      }
    },
    computed: {
      content: {
        get () { return this.value },
        set (content) { this.$emit('input', content) }
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

        // this.editor.setFontSize(this.fontSize)
        this.editor.resize()
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>