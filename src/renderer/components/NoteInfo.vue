<template>
  <div class="note-info-component">

    <Menu title="Info" />

    <template v-if="activeNote">
      <InfoDescription title="Name">
        {{activeNote.id}}
      </InfoDescription>

      <InfoDescription title="Project">
        {{activeNote.project}}
      </InfoDescription>

      <InfoDescription title="Directoy">
        {{location.directory}}
      </InfoDescription>
    </template>

    <template v-if="statistics">
      <InfoDescription title="Created">
        {{formatDate(statistics.birthtime)}}
      </InfoDescription>

      <InfoDescription title="Modified">
        {{formatDate(statistics.mtime)}}
      </InfoDescription>

      <InfoDescription title="Size">
        <NumericTween :value="statistics.size" /> byte
      </InfoDescription>
    </template>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {NoteMixin} from '@/mixins/NoteMixin'

  import {format} from '../helper/index'
  import Menu from './Settings/Menu'
  import NumericTween from '@/components/Shared/NumericTween'
  import InfoDescription from '@/components/Shared/InfoDescription'

  export default {
    name: 'NoteInfo',
    components: {
      Menu,
      NumericTween,
      InfoDescription
    },
    mixins: [
      NoteMixin
    ],
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
        return format(dateTime)
      }
    },
    created () {
      this.loadStatistics()
    }
  }
</script>

<style lang="scss" scoped>
.note-info-component {

  width: 100%;
  padding: 30px;

}
</style>