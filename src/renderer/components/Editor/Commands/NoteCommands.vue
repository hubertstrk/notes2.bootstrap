<template>
  <div>
    <AppButton @click="archived = true" text="Archive" />
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