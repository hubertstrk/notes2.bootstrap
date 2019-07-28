<template>
  <div class="settings-menu">
    <div class='settings-title'>
      <h1 class="display-4">Settings</h1>
    </div>
    <div class="settings-close" @click="$router.push('/')">
      <div><font-awesome-icon icon="times" size="3x" /></div>
      <h4 class="close-text">Close</h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SettingsMenu'
  }
</script>

<style lang="scss" scoped>
.settings-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;

  .settings-close {
    display: flex;
    flex-direction: column;
    align-items: center;

    .close-text {
      text-transform: uppercase;
      font-weight: 400;
    }
  }

  .settings-title {
    display: flex;
  }
}
</style>