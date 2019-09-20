<template>
  <div>
    <AppButton @click="$router.push('/NoteInfo')" info icon="info-circle" />
    <AppButton @click="setArchived(true)" warning text="Archive" />
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {NoteMixin} from '@/mixins/NoteMixin'
  import AppButton from '@/components/Shared/AppButton'

  export default {
    components: {
      AppButton
    },
    methods: {
      ...mapActions('editor', [
        'setArchived'
      ])
    },
    mixins: [NoteMixin]
  }
</script>

<style lang="scss" scoped>
</style>