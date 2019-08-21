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
  import {getTitle} from '@/helper/Note'
  import {NoteMixin} from '@/mixins/NoteMixin'

  export default {
    name: 'NoteCard',
    mixins: [NoteMixin],
    props: ['note'],
    computed: {
      title () {
        return getTitle(this.note.text)
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
