<template>
  <div class="editor-menu-component">
    <div>
      <!-- <b-button :value="starred" @update="updateNote({id: activeNoteId, starred: $event})" variant="light">
        <font-awesome-icon icon="bookmark" />
      </b-button> -->
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
  import {mapActions} from 'vuex'
  import {NoteMixin} from '../../mixins/NoteMixin'
  import {notify} from '../../helper/AppNotifications'

  import AppDevider from '../Shared/AppDevider'
  import InsertCommands from './Commands/InsertCommands'
  import ControlCommands from './Commands/ControlCommands'
  import NoteCommands from './Commands/NoteCommands'

  export default {
    components: {
      AppDevider,
      InsertCommands,
      ControlCommands,
      NoteCommands
    },
    mixins: [
      NoteMixin
    ],
    methods: {
      ...mapActions('editor', [
        'deleteNote',
        'updateNote',
        'updateSettings'
      ]),
      async onDeleteNote () {
        await this.deleteNote()
        notify('Note deleted')
      }
    },
    watch: {
      // checked (value) {
      //   if (!value) return
      //   this.updateNote({id: this.activeNoteId, starred: value})
      // },
      // starred () {
      //   this.checked = this.starred
      // }
    },
    created () {
      // this.checked = this.starred
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