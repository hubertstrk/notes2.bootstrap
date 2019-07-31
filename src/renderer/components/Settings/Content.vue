<template>
  <div class="settings-component">
    <div class="settings-sidebar">
      <a href="#" @click="$router.push('/Settings/StorageLocations')">Storage</a>
      <a href="#" @click="$router.push('/Settings/Appearance')">Appearance</a>
      <a href="#" @click="$router.push('/Settings/About')">About</a>
    </div>
    <div class="settings-tab-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SettingsContent'
  }
</script>

<style lang="scss" scoped>
.settings-component {
  display: flex;
  flex: 1;
  flex-direction: column;

  .settings-sidebar {
    display: flex;
    flex: 1;
    padding: 10px 0;

    > * {
      margin-right: 10px;
    }
  }

  .settings-tab-content {
    display: flex;
    flex: 4;
  }
}
</style>