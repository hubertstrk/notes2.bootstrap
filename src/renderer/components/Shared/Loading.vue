<template>
  <div class="loading-screen">
    <h1>Loading... {{percentage}}</h1>
  </div>
</template>

<script>
  import { EventBus } from '@/helper/EventBus'

  export default {
    name: 'LoadingScreen',
    data () {
      return {
        percentage: 0
      }
    },
    created () {
      EventBus.$on('loading-percentage', percentage => {
        console.info(percentage)
        this.percentage = percentage
      })
    }
  }
</script>

<style lang="scss" scoped>
.loading-screen {
  height: 100vh;
  width: 100vw;
}
</style>