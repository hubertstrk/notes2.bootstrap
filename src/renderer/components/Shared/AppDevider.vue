<template>
  <div class="devider" :class="{'large': large, 'xlarge': xlarge}" />
</template>

<script>
  export default {
    props: {
      large: {
        default: false,
        type: Boolean
      },
      xlarge: {
        default: false,
        type: Boolean
      }
    }
  }
</script>

<style lang="scss" scoped>
.devider {
  display: flex;
}
.large {
  margin: 0 3px;
}
.xlarge {
  margin: 0 6px;
}

</style>