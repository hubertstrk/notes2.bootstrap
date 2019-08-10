<template>
  <div class="markup-menu">
    <AppButton icon="print" @click="print" />
    <AppButton primary icon="cog" @click="$router.push('/Settings/StorageLocations')" />
  </div>
</template>

<script>
  import AppButton from '@/components/Shared/AppButton'

  export default {
    components: {
      AppButton
    },
    methods: {
      print () {
        document.querySelector('#iframe').contentWindow.print()
      }
    }
  }
</script>

<style lang="scss" scoped>
.markup-menu {
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
  }
}
</style>