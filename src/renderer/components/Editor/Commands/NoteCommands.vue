<template>
  <div>
    <AppButton icon="trash" @click="onDeleteNote" text="Delete" danger />
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {notify} from '@/helper/AppNotifications'

  import AppButton from '@/components/Shared/AppButton'

  export default {
    components: {
      AppButton
    },
    methods: {
      ...mapActions('editor', [
        'deleteNote'
      ]),
      async onDeleteNote () {
        await this.deleteNote()
        notify('Note deleted')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>