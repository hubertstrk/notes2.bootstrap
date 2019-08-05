<template>
  <div class="location-list-component">
    <h3>Manage Locations</h3>
    <!-- <b-alert show variant="info">When deleting a location your notes still remain and are not deleted. You can add the same location at any time.</b-alert> -->
    <div class="location-cards">
      <LocationItem v-for="(location, i) in locations" :location="location" :key="i" />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import LocationItem from './LocationItem'

  export default {
    name: 'LocationList',
    components: {
      LocationItem
    },
    computed: {
      ...mapState('settings', [
        'locations'
      ])
    }
  }
</script>

<style lang="scss" scoped>
.location-list-component {

  display: flex;
  flex-direction: column;

  .location-cards {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>