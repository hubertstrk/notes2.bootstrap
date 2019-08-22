<template>
  <div class="editor-footer-component">
    <div class="editor-group">
      <div class="footer-group-item">
        <font-awesome-icon icon="database" />
        <div>{{location.name}}</div>
      </div>
      <div class="footer-group-item">
        <font-awesome-icon icon="folder" />
        <div class="footer-directory">{{location.directory}}</div>
      </div>
    </div>
    <div class="footer-group-item">
      <font-awesome-icon icon="folder" />
      <div>{{project}}</div>
    </div>
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

  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgb(243, 243, 243);
  height: 30px;
  align-items: center;
  padding: 2px 10px;
  font-size: 0.9em;

  > * {
    margin-right: 12px;
  }

  .editor-group {
    display: flex;

    > * {
      margin-right: 12px;
    }

  }

  .footer-group-item {
    display: flex;
    align-items: center;

    > * {
      margin-right: 4px;
    }
  }

  .footer-directory {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 200px;
  }
}
</style>