<template>
  <div class="markdown-component">
    <MarkdownMenu />
    <MarkdownViewer />
  </div>
</template>

<script>
  import MarkdownMenu from './MarkdownMenu'
  import MarkdownViewer from './MarkdownViewer'

  export default {
    name: 'Markdown',
    components: {
      MarkdownMenu,
      MarkdownViewer
    }
  }
</script>

<style lang="scss" scoped>
.markdown-component {
  display: flex;
  flex: 1;
  flex-direction: column;
}

</style>