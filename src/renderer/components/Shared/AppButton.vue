<template>
  <b-button class="app-button" @click="$emit('click', null)" :variant="variant">
    <span><font-awesome-icon :icon="icon" /></span>
    <span v-if="text" class="text">{{text}}</span>
  </b-button>
</template>

<script>
  export default {
    props: {
      text: {
        default: null,
        type: String
      },
      primary: {
        default: false,
        type: Boolean
      },
      success: {
        default: false,
        type: Boolean
      },
      danger: {
        default: false,
        type: Boolean
      },
      info: {
        default: false,
        type: Boolean
      },
      light: {
        default: false,
        type: Boolean
      },
      dark: {
        default: false,
        type: Boolean
      },
      icon: {
        default: '',
        type: String
      }
    },
    computed: {
      variant () {
        if (this.primary) {
          return 'primary'
        } else if (this.danger) {
          return 'danger'
        } else if (this.light) {
          return 'light'
        } else if (this.dark) {
          return 'dark'
        } else if (this.info) {
          return 'info'
        } else if (this.success) {
          return 'success'
        } else {
          return ''
        }
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