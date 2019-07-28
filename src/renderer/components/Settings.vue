<template>
  <div>
    <Menu />
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
</style>