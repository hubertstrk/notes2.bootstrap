<template>
  <div class="menu-component">
    <slot class="menu-content" />
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
.menu-component {
  display: flex;
  align-items: center;

  .menu-content {
    display: flex;
  }

}
</style>