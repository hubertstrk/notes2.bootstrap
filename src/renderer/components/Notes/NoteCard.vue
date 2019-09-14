<template>
  <div
    ref="note"
    class="note-card"
    draggable
    @dragstart="onDragStart"
    :class="{'active-note' : note.id === activeNoteId}"
    @click="$emit('click', note.id)"
  >
    <div class="note-card-title">
      <div>{{title}}</div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getTitle} from '@/helper/Note'
  import {NoteMixin} from '@/mixins/NoteMixin'

  export default {
    name: 'NoteCard',
    mixins: [NoteMixin],
    props: ['note'],
    computed: {
      ...mapState('editor', [
        'notes'
      ]),
      title () {
        return getTitle(this.note.text)
      }
    },
    methods: {
      ...mapMutations('editor', [
        'setDragId'
      ]),
      onDragStart (event) {
        this.setDragId(this.note.id)
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
