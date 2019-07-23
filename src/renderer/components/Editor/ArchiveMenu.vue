<template>
  <div>
    <AppButton icon="archive" warning @click="archived = false" text="Restore" />
    <AppDevider xlarge />
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
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>