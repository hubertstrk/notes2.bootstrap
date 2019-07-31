<template>
  <div class="markup-menu">
    <div>
      <AppButton icon="print" text="Print" @click="print" />
    </div>
    <div>
      <AppButton icon="cog" text="Settings" @click="$router.push('/Settings/StorageLocations')" />
    </div>
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
  justify-content: space-between;

  > div {
    display: flex;
  }
}
</style>