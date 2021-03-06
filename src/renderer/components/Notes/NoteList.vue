<template>
  <div class="note-list-component">
    <div class="note-list-menu">
      <label class="sr-only" for="inline-form-input-search">Search</label>
      <b-input-group>
        <b-input id="inline-form-input-search" v-model="search" placeholder="Search"></b-input>
      </b-input-group>
      <app-button @click="$router.push('NewNote')" text=" Add" />
    </div>
    <div class="note-list">
      <transition-group name="list-complete" tag="div" class="notes-list-transition-group">
        <template v-for="note in sortedNotes">
          <ErrorBoundary :key="note.id">
            <NoteCard
              :note="note"
              class="list-complete-item"
              @click="selectNote(note.id)"
            />
          </ErrorBoundary>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import {sortBy} from 'lodash'
import {mapActions, mapGetters} from 'vuex'

import ErrorBoundary from '../ErrorBoundary.js'
import Fuse from 'fuse.js'

import AppButton from '@/components/Shared/AppButton'
import NoteCard from './NoteCard'

export default {
  name: 'NoteList',
  data () {
    return {
      search: '',
      options: {
        keys: ['text'],
        threshold: 0.1,
        location: 0,
        distance: 65535,
        maxPatternLength: 16,
        minMatchCharLength: 1
      }
    }
  },
  props: {
    sort: {
      tyoe: Boolean,
      default: () => true
    }
  },
  components: {
    AppButton,
    NoteCard,
    ErrorBoundary
  },
  computed: {
    ...mapGetters('editor', [
      'visibleNotes'
    ]),
    filteredNotes () {
      if (this.search.length <= 0) return this.visibleNotes
      const fuse = new Fuse(this.visibleNotes, this.options)
      return fuse.search(this.search)
    },
    sortedNotes () {
      return this.sort ? sortBy(this.filteredNotes, ['title']) : this.filteredNotes
    }
  },
  methods: {
    ...mapActions('editor', [
      'selectNote'
    ])
  }
}
</script>

<style lang="scss" scoped>

.note-list-component {

  display: flex;
  flex-direction: column;
  flex: 1;

  .note-list-menu {
    display: flex;
    padding: 10px;

    > * {
      display: flex;
    }
  }

  .notes-list-transition-group {

    > * {
      border-bottom: 1px solid rgb(240, 240, 240);
    }

    > *:first-child {
      border-top: 1px solid rgb(240, 240, 240);
    }

  }

  .note-list {

    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;

    .list-complete-item {
      transition: all .2s;
    }

    .list-complete-enter, .list-complete-leave-to {
      opacity: 0;
      transform: translateY(10px);
    }

    .list-complete-leave-active {
      position: absolute;
    }
  }
}
</style>