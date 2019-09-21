<template>
  <div class="editor-footer-component">
    <font-awesome-icon icon="database" />
    <div>{{location.name}}</div>
    <font-awesome-icon icon="folder" />
    <div>{{location.directory}}</div>
    <font-awesome-icon icon="folder" />
    <div>{{project}}</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {NoteMixin} from '@/mixins/NoteMixin'

  export default {
    name: 'EditorFooter',
    mixins: [NoteMixin],
    computed: {
      ...mapState('editor', ['notes']),
      location () {
        const note = this.notes[this.activeNoteId]
        return this.locations.find(x => x.directory === note.directory)
      }
    }
  }
</script>

<style lang="scss" scoped>
.editor-footer-component {

  display: flex;
  border-top: 1px solid rgb(243, 243, 243);
  height: 30px;
  align-items: center;
  padding: 2px 5px;
  font-size: 0.9em;

  > * {
    margin-left: 10px;
  }

}
</style>