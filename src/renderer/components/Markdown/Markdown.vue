<template>
  <MarkdownViewer :text="text" class="markdown-component" />
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
.markdown-component {
}
</style>