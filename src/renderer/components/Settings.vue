<template>
  <div class="settings">
    <Menu title="Settings" />
    <Content />
  </div>
</template>

<script>
import Menu from './Settings/Menu'
import Content from './Settings/Content'

export default {
  name: 'Settings',
  components: {
    Menu,
    Content
  }
}
</script>

<style lang="scss" scoped>
.settings {
  width: 100%;
  padding: 30px;
  overflow: auto;
}
</style>