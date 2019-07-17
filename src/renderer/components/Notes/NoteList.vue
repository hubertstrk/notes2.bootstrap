<template>
  <div class="note-list-component">
    <Menu>
      <div class="note-list-menu">
        <label class="sr-only" for="inline-form-input-search">Search</label>
        <b-input-group>
          <b-input id="inline-form-input-search" v-model="search" placeholder="Search"></b-input>
        </b-input-group>
        <b-button v-if="selectedProject" variant="primary" @click="onAddNote">
          <font-awesome-icon icon="plus" /> Add
        </b-button>
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
  import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

  import Menu from '../Shared/Menu'
  import NoteCard from './NoteCard'

  export default {
    name: 'NoteList',
    data () {
      return {
        search: ''
      }
    },
    components: {
      Menu,
      NoteCard
    },
    computed: {
      ...mapState('editor', {
        selectedProject: state => state.ui.selectedProject
      }),
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
      onAddNote () {
        // https://electronjs.org/docs/tutorial/notifications

        this.addNote().then(() => {
          let notification = new Notification('Note', {
            body: 'Your note has been successfully created.'
          })
          notification.onclick = () => {}
        })
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
    flex: 1;
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