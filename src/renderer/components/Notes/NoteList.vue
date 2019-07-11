<template>
  <div class="note-list">
    <template v-for="(heading, i) in headings" >
      <NoteCard :title="heading" :key="i" />
    </template>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import NoteCard from './NoteCard'

  import {parseHeadings} from '../../helper/notes'

  export default {
    name: 'NoteList',
    components: {
      NoteCard
    },
    computed: {
      ...mapGetters('editor', [
        'visibleNotes'
      ]),
      headings () {
        return this.visibleNotes
          .map(note => parseHeadings(note.text))
          .map(headings => headings[0].text || '')
      }
    }
  }
</script>

<style lang="scss" scoped>
.note-list {
  background-color: #73777A;
  flex: 1;
}
</style>