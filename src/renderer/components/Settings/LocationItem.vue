<template>
  <b-card class="location-item" footer-tag="footer">
    <h5 slot="header">
      <font-awesome-icon icon="database" />
      <span>{{location.name}}</span>
    </h5>
    <b-card-text><pre><code>{{location.directory}}</code></pre></b-card-text>
    <b-card-text><pre><code>{{notesAtLocation}} Notes</code></pre></b-card-text>
    <div slot="footer">
      <ConfirmButton text="Delete" @confirm="onDeleteLocation()" />
    </div>
  </b-card>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
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
      notesAtLocation () {
        return Object.values(this.notes).filter(note => note.directory === this.location.directory).length
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
}
</style>