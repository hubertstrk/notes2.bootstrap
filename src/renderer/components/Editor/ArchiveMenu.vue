<template>
  <div>
    <AppButton @click="onArchive" text="Restore" />
    <ConfirmButton text="Delete" @confirm="deleteNote()" />
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {notify} from '@/helper/AppNotifications'
  import {NoteMixin} from '@/mixins/NoteMixin'

  import AppDevider from '@/components/Shared/AppDevider'
  import AppButton from '@/components/Shared/AppButton'
  import ConfirmButton from '@/components/Shared/ConfirmButton'

  export default {
    name: 'AcrhiveMenu',
    mixins: [NoteMixin],
    components: {
      AppDevider,
      AppButton,
      ConfirmButton
    },
    methods: {
      ...mapActions('editor', [
        'deleteNote'
      ]),
      async onDeleteNote () {
        await this.deleteNote()
        notify('Note deleted')
      },
      onArchive () {
        this.archived = !this.archived
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>