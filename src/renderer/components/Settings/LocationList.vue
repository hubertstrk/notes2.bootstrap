<template>
  <div>
    <h3>Manage Locations</h3>
    <div class="locations">
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
.locations {
  display: flex;
  flex-wrap: wrap;
}
</style>