<template>
  <div v-if="activeNoteId" class="markdown-component">
    <div class="markup-menu">
      <div>
        <app-button light icon="print" text="Print" />
      </div>
      <div>
        <app-button light icon="cog" text="Settings" />
      </div>
    </div>
    <MarkdownViewer :text="text" />
  </div>
</template>

<script>
  import {NoteMixin} from '../../mixins/NoteMixin'

  import AppButton from '../Shared/AppButton'
  import MarkdownViewer from './MarkdownViewer'

  export default {
    name: 'Markdown',
    mixins: [NoteMixin],
    components: {
      AppButton,
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
    padding: 10px;
    justify-content: space-between;

    > div {
      display: flex;
    }
  }
}

</style>