<template>
  <b-button :disabled="disabled" @click="$emit('click', null)" :variant="variant ? variant : 'light'">
    <span v-if="icon"><font-awesome-icon :icon="icon" :style="{color}" /></span>
    <span v-if="text" :class="{text: icon}">{{text}}</span>
  </b-button>
</template>

<script>
  export default {
    props: {
      success: Boolean,
      secondary: Boolean,
      danger: Boolean,
      warning: Boolean,
      primary: Boolean,
      info: Boolean,
      dark: Boolean,
      light: Boolean,
      text: String,
      icon: String,
      color: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      variant () {
        if (this.primary) return 'primary'
        else if (this.secondary) return 'secondary'
        else if (this.danger) return 'danger'
        else if (this.light) return 'light'
        else if (this.dark) return 'dark'
        else if (this.info) return 'info'
        else if (this.warning) return 'warning'
        else if (this.success) return 'success'
        else return null
      }
    }
  }
</script>

<style lang="scss" scoped>
.text {
  margin-left: 7px;
}
</style>