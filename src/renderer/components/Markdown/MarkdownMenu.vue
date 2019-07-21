<template>
  <div v-if="activeNoteId" class="markup-menu">
    <div>
      <AppButton icon="print" text="Print" />
    </div>
    <div>
      <AppButton icon="cog" text="Settings" />
    </div>
  </div>
</template>

<script>
  import {NoteMixin} from '../../mixins/NoteMixin'
  import AppButton from '../Shared/AppButton'

  export default {
    mixins: [NoteMixin],
    components: {
      AppButton
    }
  }
</script>

<style lang="scss" scoped>
.markup-menu {
  display: flex;
  padding: 10px;
  justify-content: space-between;

  > div {
    display: flex;
  }
}
</style>