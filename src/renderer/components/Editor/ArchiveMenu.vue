<template>
  <div class="archive-menu">
    <AppButton icon="archive" warning @click="onArchive" text="Restore" />
    <AppButton icon="trash" danger @click="onDeleteNote" text="Delete" />
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {notify} from '@/helper/AppNotifications'
  import {NoteMixin} from '@/mixins/NoteMixin'

  import AppDevider from '@/components/Shared/AppDevider'
  import AppButton from '@/components/Shared/AppButton'

  export default {
    name: 'AcrhiveMenu',
    mixins: [NoteMixin],
    components: {
      AppDevider,
      AppButton
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
.archive-menu {
  display: flex;
  justify-content: space-between;
}
</style>