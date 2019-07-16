<template>
  <div class="note-list">
    <template v-for="note in visibleNotes" >
      <NoteCard :note="note" :key="note.id" @click="setActiveNoteId" />
    </template>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
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
    },
    methods: {
      ...mapMutations('editor', [
        'setActiveNoteId'
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