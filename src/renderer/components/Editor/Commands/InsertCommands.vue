<template>
  <b-button-group>
    <AppButton icon="italic" @click="emitCommand('italic')"/>
    <AppButton icon="bold" @click="emitCommand('bold')" />
    <AppButton icon="link" @click="emitCommand('link')" />
    <AppButton icon="code" @click="emitCommand('code')" />
    <AppButton icon="table" @click="emitCommand('table')" />
  </b-button-group>
</template>

<script>
  import { EventBus } from '../../../helper/EventBus'
  import AppButton from '../../Shared/AppButton'

  export default {
    components: {
      AppButton
    },
    methods: {
      emitCommand (template) {
        EventBus.$emit('editor-insert-template', template)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>