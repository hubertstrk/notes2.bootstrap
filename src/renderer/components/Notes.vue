<template>
  <div>
    <div v-for="(note, i) in visibleNotes" :key="i">
      <div>{{note.title}}</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Notes',
    computed: {
      ...mapGetters([
        'visibleNotes'
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>