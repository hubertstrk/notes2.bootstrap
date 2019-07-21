<template>
  <div class="editor-menu-component">
    <div>
      <AppDevider xlarge />
      <ControlCommands />
      <AppDevider xlarge />
      <InsertCommands />
    </div>
    <div>
      <NoteCommands />
    </div>
  </div>
</template>

<script>
  import AppDevider from '@/components/Shared/AppDevider'
  import InsertCommands from './Commands/InsertCommands'
  import ControlCommands from './Commands/ControlCommands'
  import NoteCommands from './Commands/NoteCommands'

  export default {
    components: {
      AppDevider,
      InsertCommands,
      ControlCommands,
      NoteCommands
    }
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