<template>
  <div class="editor-menu-component">
    <template v-if="selectionMode === 'archived'">
      <ArchiveMenu />
    </template>
    <template v-else>
      <div>
        <ControlCommands />
        <AppDevider xlarge />
        <InsertCommands />
      </div>
      <div>
        <NoteCommands />
      </div>
    </template>
  </div>
</template>

<script>
  import AppDevider from '@/components/Shared/AppDevider'
  import InsertCommands from './Commands/InsertCommands'
  import ControlCommands from './Commands/ControlCommands'
  import NoteCommands from './Commands/NoteCommands'
  import ArchiveMenu from './ArchiveMenu'

  import {mapState} from 'vuex'
  import {NoteMixin} from '@/mixins/NoteMixin'

  export default {
    name: 'EditorMenu',
    components: {
      AppDevider,
      InsertCommands,
      ControlCommands,
      NoteCommands,
      ArchiveMenu
    },
    computed: {
      ...mapState('editor', {
        selectionMode: state => state.ui.selectionMode
      })
    },
    mixins: [NoteMixin]
  }
</script>

<style lang="scss" scoped>
.editor-menu-component {
  display: flex;
  justify-content: space-between;
  padding: 10px 3px;

  > div {
    display: flex;
  }
}
</style>