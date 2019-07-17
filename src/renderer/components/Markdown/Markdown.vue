<template>
  <div v-if="activeNoteId" class="markdown-component">
    <Menu>
      <div class="markup-menu">
        <div>
          <b-button variant="primary"><font-awesome-icon icon="print" /> Print</b-button>
        </div>
        <div>
          <b-button variant="dark"><font-awesome-icon icon="cog" /> Settings</b-button>
        </div>
      </div>
    </Menu>
    <MarkdownViewer :text="text" />
  </div>
</template>

<script>
  import {NoteMixin} from '../../mixins/NoteMixin'

  import Menu from '../Shared/Menu'
  import MarkdownViewer from './MarkdownViewer'

  export default {
    name: 'Markdown',
    mixins: [NoteMixin],
    components: {
      Menu,
      MarkdownViewer
    }
  }
</script>

<style lang="scss" scoped>
.markdown-component {
  display: flex;
  flex: 1;
  flex-direction: column;

  .markup-menu {
    display: flex;
    flex: 1;
    padding: 10px;
    justify-content: space-between;

    > div {
      display: flex;
    }
  }
}

</style>