<template>
  <div class="note-info">
    <span class="note-info-title">{{title}}</span>
    <span class="note-info-description">{{description}}</span>
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
    font-size: 1.2em;
    text-transform: capitalize;
  }

  .note-info-description {
    color: rgb(80,80,80);
  }

}
</style>