<template>
  <MarkdownViewer :text="text" />
</template>

<script>
  import MarkdownViewer from './MarkdownViewer'
  import {NoteMixin} from '../../mixins/NoteMixin'

  export default {
    name: 'Markdown',
    mixins: [NoteMixin],
    components: {
      MarkdownViewer
    }
  }
</script>

<style lang="scss" scoped>
</style>