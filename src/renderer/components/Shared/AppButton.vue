<template>
  <b-button class="app-button" @click="$emit('click', null)" :variant="variant ? variant : 'light'">
    <span><font-awesome-icon :icon="icon" /></span>
    <span v-if="text" class="text">{{text}}</span>
  </b-button>
</template>

<script>
  export default {
    props: {
      success: Boolean,
      danger: Boolean,
      primary: Boolean,
      info: Boolean,
      dark: Boolean,
      light: Boolean,
      text: String,
      icon: String
    },
    computed: {
      variant () {
        if (this.primary) return 'primary'
        else if (this.danger) return 'danger'
        else if (this.light) return 'light'
        else if (this.dark) return 'dark'
        else if (this.info) return 'info'
        else if (this.success) return 'success'
        else return null
      }
    }
  }
</script>

<style lang="scss" scoped>
.app-button {

  .text {
    margin-left: 10px;
  }

}
</style>