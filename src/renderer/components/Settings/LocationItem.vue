<template>
  <b-card class="location-item" footer-tag="footer">
    <h5 slot="header">
      <span>{{location.name}}</span>
    </h5>
    <b-card-text class="location-item-info">
      <div><font-awesome-icon icon="database" /> {{notesAtLocation.length}}</div>
      <div><font-awesome-icon icon="archive" /> {{archivedNotes.length}}</div>
    </b-card-text>
    <b-card-text>
      <pre><code>{{location.directory}}</code></pre>
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
  width: 300px;

  .location-item-info {

    display: flex;
    align-items: center;

    > * {
      margin-right: 10px;
    }
  }
}
</style>