<template>
  <div class="location-list-component">
    <h3>Storage Locations</h3>

    <div>
      <AppButton icon="plus" success @click="$router.push('/Settings/NewStorageLocation')" text="New Storage Location" />
    </div>

    <!-- <b-alert show variant="primary">When deleting a location your notes still remain and are not deleted. You can add the same location at any time.</b-alert> -->
    <div class="location-cards">
      <LocationItem v-for="(location, i) in locations" :location="location" :key="i" />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import LocationItem from './LocationItem'
import AppButton from '@/components/Shared/AppButton'

export default {
  name: 'LocationManagement',
  components: {
    LocationItem,
    AppButton
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

  width: 100%;
  display: flex;
  flex-direction: column;

  .location-cards {
    display: flex;
    flex-wrap: wrap;
  }

  > div {
    margin: 10px 0;
  }
}
</style>