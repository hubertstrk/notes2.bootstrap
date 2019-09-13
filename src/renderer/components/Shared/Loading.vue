<template>
  <div class="loading-screen element">
    <h3>Loading...</h3>
  </div>
</template>

<script>
  export default {
    name: 'LoadingScreen'
  }
</script>

<style lang="scss" scoped>
.element {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    background-color: #001F3F;
  }
  100% {
    background-color: #FF4136;
  }
}

.loading-screen {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>