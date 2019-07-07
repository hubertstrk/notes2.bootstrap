<template>
  <div>
    <div v-for="(note, i) in visibleNotes" :key="i">
      <NoteCard :note="note" />
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import NoteCard from './NoteCard'

  export default {
    name: 'NoteList',
    components: {
      NoteCard
    },
    computed: {
      ...mapGetters('editor', [
        'visibleNotes'
      ])
    }
  }
</script>

<style lang="scss" scoped>
</style>