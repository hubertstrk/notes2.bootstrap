<template>
  <div class="note-card" @click="setActiveNoteId(id)" :class="{'active-note': id === activeNoteId}">
    <div class="note-card-title">
      {{title}}
    </div>
  </div>
</template>

<script>
  import {getHeadings} from '../../helper/notes'
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'NoteCard',
    props: ['id'],
    computed: {
      ...mapState('editor', {
        activeNoteId: state => state.activeNoteId
      }),
      ...mapGetters('editor', [
        'visibleNotes'
      ]),
      text () {
        return this.visibleNotes.find(x => x.id === this.id).text
      },
      title () {
        const headings = getHeadings(this.text)
        return headings && headings[0] ? headings[0].title : 'no title'
      }
    },
    methods: {
      ...mapMutations('editor', [
        'setActiveNoteId'
      ])
    }
  }
</script>

<style lang="scss" scoped>
.note-card {

  display: flex;
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
