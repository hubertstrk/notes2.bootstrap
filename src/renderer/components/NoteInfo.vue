<template>
  <div class="note-info-component">
    <Menu title="Info" />

    <template v-if="activeNote">
      <InfoDescription title="Name" :description="activeNote.id" />
      <InfoDescription title="Project" :description="activeNote.project" />
      <InfoDescription title="Directoy" :description="location.directory" />
    </template>

    <template v-if="statistics">
      <InfoDescription title="Created" :description="formatDate(statistics.birthtime)" />
      <InfoDescription title="Modified" :description="formatDate(statistics.mtime)" />
      <InfoDescription title="Size" :description="`${statistics.size} bytes`" />
    </template>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {NoteMixin} from '@/mixins/NoteMixin'
  import Menu from './Settings/Menu'
  import InfoDescription from '@/components/Shared/InfoDescription'

  export default {
    name: 'NoteInfo',
    components: {
      Menu,
      InfoDescription
    },
    mixins: [NoteMixin],
    computed: {
      ...mapState('editor', {
        statistics: state => state.statistics
      }),
      activeNote () {
        return this.notes[this.activeNoteId]
      }
    },
    methods: {
      ...mapActions('editor', [
        'loadStatistics'
      ]),
      formatDate (dateTime) {
        const date = new Date(dateTime)
        const minutes = `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
        const hours = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}`
        const seconds = `${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
        return `${date.toDateString()} ${hours}:${minutes}:${seconds}`
      }
    },
    created () {
      this.loadStatistics()
    }
  }
</script>

<style lang="scss" scoped>
.note-info-component {

  padding: 30px;

}
</style>