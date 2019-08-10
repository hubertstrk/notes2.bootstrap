<template>
  <div class="settings-menu">
    <h1 class="display-4">{{title}}</h1>
    <div class="settings-close" @click="$router.push('/')">
      <div><font-awesome-icon icon="times" size="3x" /></div>
      <h4 class="close-text">Close</h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SettingsMenu',
    props: {
      title: {
        type: String,
        default: 'menu-title'
      }
    }
  }
</script>

<style lang="scss" scoped>
.settings-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .settings-close {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

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