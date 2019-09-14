<template>
  <span>
    {{numericValue.value}}
  </span>
</template>

<script>
  import TweenLite from 'gsap/TweenLite'

  export default {
    props: ['value'],
    data () {
      return {
        tweenObject: {value: 0},
        numericValue: {value: 0}
      }
    },
    methods: {
      tween (value) {
        TweenLite.to(this.tweenObject, 1, {value: value, onUpdate: () => { this.numericValue.value = this.tweenObject.value.toFixed(0) }})
      }
    },
    watch: {
      value (value) {
        this.tween(value)
      }
    },
    mounted () {
      this.tween(this.value)
    }
  }
</script>

<style lang="scss" scoped>
</style>