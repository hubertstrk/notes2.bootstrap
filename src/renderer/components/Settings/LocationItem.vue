<template>
  <b-card class="location-item">
    <h4 slot="header">{{location.name}}</h4>
    <b-card-text>
      {{location.directory}}
    </b-card-text>

    <ConfirmButton text="Delete" @confirm="onDeleteLocation()"></ConfirmButton>
  </b-card>
</template>

<script>
  import {mapActions} from 'vuex'
  import ConfirmButton from '@/components/Shared/ConfirmButton'

  export default {
    name: 'LocationItem',
    props: ['location'],
    components: {
      ConfirmButton
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
  margin: 6px;
  width: 300px;
}
</style>