<template>
  <div class="editor-footer-component">
    <div class="footer-group">
      <font-awesome-icon icon="database" />
      <div>{{location.name}}</div>
    </div>
    <div class="footer-group">
      <font-awesome-icon icon="folder" />
      <div>{{location.directory}}</div>
    </div>
    <!-- <div><b-badge variant="secondary">{{project}}</b-badge></div> -->
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
        if (!this.activeNoteId) return ''
        const note = this.notes[this.activeNoteId]
        return this.locations.find(x => x.directory === note.directory)
      }
    }
  }
</script>

<style lang="scss" scoped>
.editor-footer-component {

    border-top: 1px solid rgb(243, 243, 243);
    height: 30px;
    display: flex;
    align-items: center;
    padding: 2px 10px;
    font-size: 0.9em;

    > * {
      margin-right: 12px;
    }

    .footer-group {
      display: flex;
      align-items: center;

      > * {
        margin-right: 4px;
      }
    }
}
</style>