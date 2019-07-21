<template>
  <b-button-group>
    <AppButton icon="search-plus" @click="zoom(1)" />
    <AppButton icon="search-minus" @click="zoom(-1)" />
  </b-button-group>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  import AppButton from '../../Shared/AppButton'

  export default {
    components: {
      AppButton
    },
    computed: {
      ...mapState('editor', {
        settings: state => state.settings
      })
    },
    methods: {
      ...mapActions('editor', [
        'updateSettings'
      ]),
      zoom (value) {
        this.updateSettings({fontSize: (this.settings.fontSize + value)})
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>