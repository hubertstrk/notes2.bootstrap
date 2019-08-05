<template>
  <div
    class="note-card"
    :class="{'active-note' : note.id === activeNoteId}"
    @click="$emit('click', note.id)"
  >
    <div class="note-card-title">
      <div class="lead">{{title}}</div>
    </div>
  </div>
</template>

<script>
  import {getHeadings} from '@/helper/Marked'
  import {NoteMixin} from '@/mixins/NoteMixin'

  export default {
    name: 'NoteCard',
    mixins: [NoteMixin],
    props: ['note'],
    computed: {
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
