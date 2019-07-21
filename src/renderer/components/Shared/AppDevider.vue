<template>
  <div class="devider-component" :class="{'large': large}" />
</template>

<script>
  export default {
    props: ['large', 'xlarge']
  }
</script>

<style lang="scss" scoped>
.devider-component {
  margin: 0 3px;
}
.large {
  margin: 0 6px;
}

</style>