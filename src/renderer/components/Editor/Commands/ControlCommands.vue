<template>
  <b-button-group>
    <b-form-checkbox v-model="starred" name="bookmark-button" button :button-variant="starred ? 'primary' : 'light'">
      <font-awesome-icon icon="star" />
    </b-form-checkbox>
    <AppButton icon="search-plus" @click="zoom(1)" />
    <AppButton icon="search-minus" @click="zoom(-1)" />
  </b-button-group>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {NoteMixin} from '@/mixins/NoteMixin'

  import AppButton from '@/components/Shared/AppButton'

  export default {
    components: {
      AppButton
    },
    mixins: [NoteMixin],
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