<template>
  <div class="archive-menu-actions">
    <AppButton success @click="setArchived(false)" text="Restore" />
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
        'deleteNote',
        'setArchived'
      ]),
      async onDeleteNote () {
        await this.deleteNote()
        notify('Note deleted')
      }
    }
  }
</script>

<style lang="scss" scoped>
.archive-menu-actions {

  display: flex;
  align-items: start;

  > * {
    margin-right: 4px;
  }

}
</style>