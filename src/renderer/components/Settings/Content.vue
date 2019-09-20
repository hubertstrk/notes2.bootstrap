<template>
  <div class="settings-component">
    <div class="settings-sidebar">
      <a href="#" @click="$router.push('/Settings/LocationManagement')">Locations</a>
      <a href="#" @click="$router.push('/Settings/Appearance')">Appearance</a>
      <a href="#" @click="$router.push('/Settings/About')">About</a>
    </div>
    <div class="settings-tab-content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SettingsContent',
    data () {
      return {
        active: 'locations'
      }
    }
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

    .fade-enter-active, .fade-leave-active {
      transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>