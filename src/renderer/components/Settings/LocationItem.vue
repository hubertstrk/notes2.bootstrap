<template>
  <b-card class="location-item" footer-tag="footer">
    <div slot="header">
      <h5>{{location.name}}</h5>
      <div :title="location.directory" class="location-item-header-directory">{{location.directory}}</div>
    </div>
    <b-card-text class="location-item-info">
        <font-awesome-icon icon="database" />
        {{notesAtLocation.length}}
      <div><font-awesome-icon icon="archive" /> {{archivedNotes.length}}</div>
      <div><font-awesome-icon icon="chart-line" /> {{percentage}}%</div>
    </b-card-text>

    <b-card-text>
      <b-progress :value="notesAtLocation.length" :max="Object.values(notes).length" class="mb-3"></b-progress>
    </b-card-text>

    <b-card-text class="location-item-actions">
      <ConfirmButton text="Delete" @confirm="onDeleteLocation()" />
    </b-card-text>

  </b-card>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
  import ConfirmButton from '@/components/Shared/ConfirmButton'

  export default {
    name: 'LocationItem',
    props: {
      location: {
        type: Object,
        default: null
      }
    },
    components: {
      ConfirmButton
    },
    computed: {
      ...mapState('editor', [
        'notes'
      ]),
      ...mapGetters('editor', [
        'archived'
      ]),
      notesAtLocation () {
        return Object.values(this.notes).filter(note => note.directory === this.location.directory)
      },
      archivedNotes () {
        return this.archived.filter(note => note.directory === this.location.directory)
      },
      percentage () {
        return Math.round(this.notesAtLocation.length / Object.values(this.notes).length * 100 * 10) / 10
      }
    },
    methods: {
      ...mapActions('settings', [
        'deleteLocation'
      ]),
      async onDeleteLocation () {
        await this.deleteLocation(this.location)
      }
    }
  }
</script>

<style lang="scss" scoped>
.location-item {

  margin: 10px 10px 10px 0;
  width: 400px;

  .location-item-header-directory {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
  }

  .location-item-info {

    display: flex;
    align-items: center;

    > * {
      margin-right: 10px;
    }
  }

  .location-item-actions {
    height: 50px;
  }
}
</style>