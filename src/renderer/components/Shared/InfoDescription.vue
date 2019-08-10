<template>
  <div class="note-info">
    <span class="note-info-title lead">{{title}}</span>
    <span class="note-info-description"><pre><code>{{description}}</code></pre></span>
  </div>
</template>

<script>
  export default {
    name: 'InfoDescription',
    props: ['title', 'description']
  }
</script>

<style lang="scss" scoped>
.note-info {

  .note-info-title {
    font-size: 1.4em;
    text-transform: capitalize;
  }

  .note-info-description {
    font-size: 1.2em;
  }

}
</style>