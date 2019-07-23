<template>
  <div>
    <AppButton icon="archive" @click="archived = true" text="Archive" warning />
  </div>
</template>

<script>
  import AppButton from '@/components/Shared/AppButton'
  import {NoteMixin} from '@/mixins/NoteMixin'

  export default {
    components: {
      AppButton
    },
    mixins: [NoteMixin]
  }
</script>

<style lang="scss" scoped>
</style>