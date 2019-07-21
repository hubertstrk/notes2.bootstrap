<template>
  <AppButton icon="trash" @click="deleteNote" text="Delete" danger />
</template>

<script>
  import {mapActions} from 'vuex'
  import AppButton from '../../Shared/AppButton'

  export default {
    components: {
      AppButton
    },
    methods: {
      ...mapActions('editor', [
        'deleteNote'
      ])
    }
  }
</script>

<style lang="scss" scoped>
</style>