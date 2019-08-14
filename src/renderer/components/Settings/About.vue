<template>
  <div class="about-component">
    <h1>About</h1>
    <div class="about-info">
      <img width="64" height="64" :src="image" />
      <h4 class="lead">2019 Notes</h4>
    </div>
  </div>
</template>

<script>
  import image from '@icons/bookmark.png'

  export default {
    name: 'About',
    data: function () {
      return {
        image: image
      }
    }
  }
</script>

<style lang="scss" scoped>
.about-component {

  width: 100%;

  .about-info {

    display: flex;
    align-items: center;
    
  }
}
</style>