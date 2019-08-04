<template>
  <div>
    <NewStorageLocation />
    <h1>Manage</h1>
    <div v-for="(location, i) in locations" :key="i">
      <AppButton icon="trash" @click="onDeleteLocation(location)">Delete</AppButton>
      <p>{{location.name}}, {{location.directory}}</p>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import AppButton from '@/components/Shared/AppButton'
  import NewStorageLocation from './NewStorageLocation'

  export default {
    name: 'StorageLocations',
    components: {
      AppButton,
      NewStorageLocation
    },
    computed: {
      ...mapState('settings', [
        'locations'
      ])
    },
    methods: {
      ...mapActions('settings', [
        'deleteLocation'
      ]),
      async onDeleteLocation (location) {
        await this.deleteLocation(location)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>