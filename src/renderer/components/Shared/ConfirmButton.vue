<template>
  <div>
    <template v-if="!actionCalled">
      <AppButton @click="actionCalled = true" :text="text" />
    </template>
    <template v-else>
      <AppButton primary @click="actionCalled = false" text="Cancel" />
      <AppButton icon="trash" danger @click="$emit('confirm')" text="Confirm" />
    </template>
  </div>
</template>

<script>
  import AppButton from '@/components/Shared/AppButton'

  export default {
    name: 'ConfirmButton',
    props: ['text'],
    data () {
      return {
        actionCalled: false
      }
    },
    components: {
      AppButton
    }
  }
</script>

<style lang="scss" scoped>
</style>