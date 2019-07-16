<template>
  <div class="note-list-component">
    <Menu>
      <div class="note-list-search">
        <label class="sr-only" for="inline-form-search-note">Search</label>
        <b-input
          id="inline-form-search-note"
          placeholder="Search"
        ></b-input>
      </div>
    </Menu>
    <div class="note-list">
      <template v-for="note in visibleNotes">
        <NoteCard :note="note" :key="note.id" @click="setActiveNoteId" />
      </template>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'

  import Menu from '../Shared/Menu'
  import NoteCard from './NoteCard'

  export default {
    name: 'NoteList',
    components: {
      Menu,
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
.note-list-component {

  display: flex;
  flex-direction: column;
  flex: 1;

  .note-list-search {

    width: 100%;
  }

  .note-list {

    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;

    > div {
      border-bottom: 1px solid rgb(216, 216, 216);
    }

    > div:first-child {
      border-top: 1px solid rgb(216, 216, 216);
    }
  }
}
</style>