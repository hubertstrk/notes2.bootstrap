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
      tween (oldValue, newValue) {
        TweenLite.to(this.tweenObject, 1, {value: newValue, onUpdate: () => { this.numericValue.value = this.tweenObject.value.toFixed(0) }})
      }
    },
    watch: {
      value (oldValue, newValue) {
        console.info(`numericTween watch ${newValue}`)
        this.tween(oldValue, newValue)
      }
    },
    mounted () {
      this.tween(0, this.value)
    }
  }
</script>

<style lang="scss" scoped>
</style>