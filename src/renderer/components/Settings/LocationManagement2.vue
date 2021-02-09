<template>
  <div class="location-list-component">
    <h1>Storage Locations</h1>

    <div class="new-location-btn">
      <AppButton icon="plus" success @click="$router.push('/Settings/NewStorageLocation')" text="New Storage Location" />
    </div>

    <div class="location-management-table">
      <b-table
        :busy="loading"
        :items="items"
        :fields="fields"
        @row-selected="onRowSelected"
        hover
        selectable
        select-mode="single"
      >
        <template v-slot:table-busy>
          <div class="text-center" style="color: gray">
            <b-spinner class="align-middle" type="grow"></b-spinner>
            <div style="margin-top: 6px;">Loading</div>
          </div>
        </template>
      </b-table>
    </div>

    <div class="new-location-btn">
      <AppButton icon="trash" :disabled="!selectedRow" danger @click="onDeleteLocation()" text="Delete Storage Location" />
    </div>

  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import {arrayToLookup} from '../../helper'
import AppButton from '@/components/Shared/AppButton'

export default {
  name: 'LocationManagement2',
  components: {
    AppButton
  },
  data () {
    return {
      loading: false,
      selectedRow: null,
      fields: [
        {key: 'name', sortable: true},
        {key: 'directory', sortable: true},
        {key: 'notes', sortable: true},
        {key: 'archived', sortable: true},
        {key: 'percentage', sortable: true}
      ]
    }
  },
  computed: {
    ...mapState('settings', [
      'locations'
    ]),
    ...mapState('editor', [
      'notes'
    ]),
    ...mapGetters('editor', [
      'archived'
    ]),
    items () {
      return this.locations.map(location => ({
        name: location.name,
        directory: location.directory,
        notes: this.notesAtLocation[location.directory],
        archived: this.archivedNotes[location.directory],
        percentage: this.percentageNotes[location.directory]}))
    },
    notesAtLocation () {
      const counter = (location) => Object.values(this.notes).filter(note => note.directory === location.directory).length
      return arrayToLookup(this.locations, counter, 'directory')
    },
    archivedNotes () {
      const counter = (location) => this.archived.filter(note => note.directory === location.directory).length
      return arrayToLookup(this.locations, counter, 'directory')
    },
    percentageNotes () {
      var percentage = (location) => Math.round(this.notesAtLocation[location.directory] / Object.values(this.notes).length * 100 * 10) / 10
      return arrayToLookup(this.locations, percentage, 'directory')
    }
  },
  methods: {
    onRowSelected (item) {
      this.selectedRow = item
    },
    ...mapActions('settings', [
      'deleteLocation',
      'reloadSettings'
    ]),
    ...mapActions('editor', [
      'reloadNotes'
    ]),
    onDeleteLocation () {
      this.deleteLocation(this.selectedRow[0])
      this.selectedRow = null
    }
  },
  async created () {
    this.loading = true

    await this.reloadSettings()
    await this.reloadNotes()

    setTimeout(() => {
      this.loading = false
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.location-management-table {
  width: 800px;
  margin: 20px 0 0 0;
}

.new-location-btn {
  margin: 20px 0 0 0;
}
</style>