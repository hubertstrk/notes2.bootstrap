<template>
  <b-button-group>
    <AppButton icon="italic" @click="emitCommand('**italic**')"/>
    <AppButton icon="bold" @click="emitCommand('*bold*')" />
    <AppButton icon="strikethrough" @click="emitCommand('~~strike~~')" />
    <AppButton icon="link" @click="emitCommand('[Google](www.google.com)')" />
    <AppButton icon="code" @click="emitCommand('```js\n\n```')" />
    <AppButton icon="table" @click="emitCommand('Tables | Are | Cool\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n')" />
  </b-button-group>
</template>

<script>
  import { EventBus } from '@/helper/EventBus'
  import AppButton from '@/components/Shared/AppButton'

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