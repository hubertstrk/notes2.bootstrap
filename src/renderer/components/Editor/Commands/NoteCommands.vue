<template>
  <div>
    <AppButton light @click="$router.push('/NoteInfo')" icon="info-circle" />
    <AppButton light icon="archive" @click="setArchived(true)" text="Archive" />
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