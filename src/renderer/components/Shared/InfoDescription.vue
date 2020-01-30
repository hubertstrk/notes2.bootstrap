<template>
  <div class="note-info">
    <div class="note-info-title lead">{{title}}</div>
    <div class="note-info-description">
        <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoDescription',
  props: ['title']
}
</script>

<style lang="scss" scoped>
.note-info {

  .note-info-title {
    font-size: 1.4rem;
    text-transform: capitalize;
  }

  .note-info-description {
    font-size: 1.0rem;
  }

  > div {
    margin: 6px 0;
  }
}
</style>