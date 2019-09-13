<template>
  <div class="note-info">
    <div class="note-info-title lead">{{title}}</div>
    <div class="note-info-description">
        <slot />
    </div>
  </div>
</template>

<script>
import NumericTween from '@/components/Shared/NumericTween'

export default {
  name: 'InfoDescription',
  props: ['title'],
  components: {
    NumericTween
  }
}
</script>

<style lang="scss" scoped>
.note-info {

  .note-info-title {
    font-size: 1.4em;
    text-transform: capitalize;
  }

  .note-info-description {
    font-size: 1.0em;
  }

}
</style>