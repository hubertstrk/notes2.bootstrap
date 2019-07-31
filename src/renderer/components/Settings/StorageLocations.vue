<template>
  <div>
    <NewStorageLocation />

    <h1>Manage</h1>
    <div v-for="storageLocations in storageLocations" :key="storageLocations.directory">
      <AppButton icon="trash" @click="deleteStorageLocation(storageLocations)">Delete</AppButton>
      <p>{{storageLocations.name}}, {{storageLocations.directory}}</p>
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
      ...mapState('editor', {
        storageLocations: state => state.settings.storageLocations
      })
    },
    methods: {
      ...mapActions('editor', [
        'deleteStorageLocation'
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>