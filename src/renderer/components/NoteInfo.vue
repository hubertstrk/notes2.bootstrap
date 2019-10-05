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
        <font-awesome-icon icon="folder" /> <span class="info-description-value">{{location.directory}}</span>
      </InfoDescription>
    </template>

    <template v-if="statistics">
      <InfoDescription title="Created">
        <font-awesome-icon icon="calendar-alt" /> <span class="info-description-value">{{formatDate(statistics.birthtime)}}</span>
      </InfoDescription>

      <InfoDescription title="Modified">
        <font-awesome-icon icon="calendar-alt" /> <span class="info-description-value">{{formatDate(statistics.mtime)}}</span>
      </InfoDescription>

      <InfoDescription title="Size">
        <font-awesome-icon icon="hdd" /> <span class="info-description-value"><NumericTween :value="statistics.size" /> byte</span>
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

  .info-description-value {
    margin-left: 4px;
  }

}
</style>