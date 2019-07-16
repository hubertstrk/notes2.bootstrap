<template>
  <div
    class="note-card"
    :class="{'active-note': note.id === activeNoteId}"
    @click="$emit('click', note.id)"
  >
    <div class="note-card-title">
      {{title}}
    </div>
  </div>
</template>

<script>
  import {getHeadings} from '../../helper/notes'
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'NoteCard',
    props: ['note'],
    computed: {
      ...mapState('editor', {
        activeNoteId: state => state.activeNoteId
      }),
      ...mapGetters('editor', [
        'visibleNotes'
      ]),
      title () {
        const headings = getHeadings(this.note.text)
        return headings && headings[0] ? headings[0].title : 'no title'
      }
    }
  }
</script>

<style lang="scss" scoped>
.note-card {
  padding: 10px;
  cursor: pointer;

  .note-card-title {
    font-size: 1.3rem;
  }
}

.active-note {
  background-color: rgb(240,240,240);
}
</style>
