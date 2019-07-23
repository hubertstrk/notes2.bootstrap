<template>
  <div class="editor-menu-component">
    <template v-if="!archived">
      <div>
        <AppDevider xlarge />
        <ControlCommands />
        <AppDevider xlarge />
        <InsertCommands />
      </div>
      <div>
        <NoteCommands />
      </div>
  </template>
  <template v-else>
    <ArchiveMenu />
  </template>

    </div>
</template>

<script>
  import AppDevider from '@/components/Shared/AppDevider'
  import InsertCommands from './Commands/InsertCommands'
  import ControlCommands from './Commands/ControlCommands'
  import NoteCommands from './Commands/NoteCommands'
  import ArchiveMenu from './ArchiveMenu'

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