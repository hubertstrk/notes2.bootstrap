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
      <div>{{note.title}}</div>
      <div class="note-card-subtitle">{{note.project}}</div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {NoteMixin} from '@/mixins/NoteMixin'

  export default {
    name: 'NoteCard',
    mixins: [NoteMixin],
    props: ['note'],
    computed: {
      ...mapState('editor', [
        'notes'
      ])
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

  width: 100%;
  padding: 10px;
  cursor: pointer;

  .note-card-title {
    font-size: 1.1rem;
  }
  .note-card-subtitle {
    font-size: 0.8rem;
    color:rgb(120, 120, 120);
  }
}

.active-note {
  background-color: rgb(240,240,240);
  border-left: 8px solid rgb(255, 100, 100);
}

</style>
