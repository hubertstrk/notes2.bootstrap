<template>
  <div class="note-list">
    <template v-for="note in visibleNotes" >
      <NoteCard :id="note.id" :key="note.id" />
    </template>
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
.note-list {
  flex: 1;

  > div {
    border-bottom: 1px solid rgb(216, 216, 216);
  }
}
</style>