<template>
  <div class="note-card" @click="setActiveNoteId(id)">
    <div class="note-card-title">
      {{title}}
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'NoteCard',
    props: ['id'],
    computed: {
      ...mapGetters('editor', [
        'visibleNotesTitles'
      ]),
      title () {
        const titles = this.visibleNotesTitles[this.id]
        return titles[0].title || ''
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
</style>