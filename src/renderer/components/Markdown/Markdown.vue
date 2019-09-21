<template>
  <div class="markdown-component">
    <MarkdownMenu />
    <MarkdownViewer v-if="activeNoteId" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MarkdownMenu from './MarkdownMenu'
import MarkdownViewer from './MarkdownViewer'

export default {
  name: 'Markdown',
  components: {
    MarkdownMenu,
    MarkdownViewer
  },
  computed: {
    ...mapState('editor', {
      activeNoteId: state => state.ui.activeNoteId
    })
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