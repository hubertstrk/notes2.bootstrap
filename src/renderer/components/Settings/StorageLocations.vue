<template>
  <div class="storage-location-component">
    <h1>Storage Locations</h1>
    <div class="location-content">
      <NewStorageLocation />
      <LocationList />
    </div>
  </div>
</template>

<script>
  import NewStorageLocation from './NewStorageLocation'
  import LocationList from './LocationList'

  export default {
    name: 'StorageLocations',
    components: {
      NewStorageLocation,
      LocationList
    }
  }
</script>

<style lang="scss" scoped>
.storage-location-component {
  width: 100%;

  .location-content {
    > * {
      margin-top: 30px;
    }
  }
}
</style>