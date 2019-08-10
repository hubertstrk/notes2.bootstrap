<template>
  <b-button-group>
    <b-form-checkbox v-model="starred" name="bookmark-button" button :button-variant="starred ? 'secondary' : 'light'">
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
      ...mapState('settings', {
        fontSize: state => state.fontSize
      })
    },
    methods: {
      ...mapActions('settings', [
        'setFontSize'
      ]),
      zoom (value) {
        this.setFontSize(this.fontSize + value)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>