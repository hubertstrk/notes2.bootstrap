<template>
  <div class="note-list-component">
    <div class="note-list-menu">
      <label class="sr-only" for="inline-form-input-search">Search</label>
      <b-input-group>
        <b-input id="inline-form-input-search" v-model="search" placeholder="Search"></b-input>
      </b-input-group>
      <app-button @click="$router.push('NewNote')" text=" Add" success />
    </div>
    <div class="note-list">
      <template v-for="note in visibleNotes">
        <NoteCard :note="note" :key="note.id" @click="setActiveNoteId(note.id)" />
      </template>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapMutations, mapGetters} from 'vuex'

  import {notify} from '@/helper/AppNotifications'

  import AppButton from '@/components/Shared/AppButton'
  import NoteCard from './NoteCard'

  export default {
    name: 'NoteList',
    data () {
      return {
        search: ''
      }
    },
    components: {
      AppButton,
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
      ]),
      ...mapActions('editor', [
        'addNote'
      ]),
      async onAddNote () {
        await this.addNote()
        notify('Note created')
      }
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

  .note-list {

    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;

    > div {
      border-bottom: 1px solid rgb(220, 220, 220);
    }

    > div:first-child {
      border-top: 1px solid rgb(220, 220, 220);
    }
  }
}
</style>