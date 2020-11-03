<template>
  <AceEditor v-model="content" :options="options" @init="intialize"
    lang="markdown" theme="crimson_editor" :onresize="resize()" />
</template>

<script>
import { EventBus } from '@/helper/EventBus'

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
    content: {
      get () { return this.value ? this.value : '' },
      set (value) { this.$emit('input', value) }
    }
  },
  methods: {
    intialize: function (editor) {
      this.editor = editor

      require('brace/mode/markdown')
      require('brace/snippets/markdown')
      require('brace/theme/github')
      require('brace/theme/chaos')
      require('brace/theme/xcode')
      require('brace/theme/crimson_editor')
      require('brace/theme/tomorrow')
      require('brace/theme/ambiance')
      require('brace/theme/monokai')
      require('brace/theme/solarized_dark')

      this.editor.setWrapBehavioursEnabled(true)
      this.editor.setShowFoldWidgets(false)
      this.editor.setShowPrintMargin(false)
      this.editor.setHighlightGutterLine(false)
      this.editor.renderer.setShowGutter(false)
      this.editor.getSession().setUseWrapMode(true)
      this.editor.resize()
      this.editor.setReadOnly(true)

      this.editor.setOptions({
        fontFamily: 'Fira Code'
      })
    },
    resize () {
      if (this.editor) {
        this.editor.resize()
      }
    }
  },
  watch: {
    value () {
      this.editor.setReadOnly(!this.value)
    }
  },
  created () {
    EventBus.$on('editor-insert-template', template => {
      this.editor.insert(template)
      this.editor.focus()
    })
  }
}
</script>

<style lang="scss" scoped>
</style>