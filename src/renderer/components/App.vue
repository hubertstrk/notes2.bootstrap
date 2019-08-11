<template>
  <div>
    <Loading v-if="isLoading" />
    <div v-else id="component" class="component">
      <div class="navigation">
        <Navigation />
      </div>
      <div class="notes">
        <NoteList />
      </div>
      <div class="editor">
        <Editor />
      </div>
      <div class="markup">
        <Markdown />
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  import Navigation from './Navigation/Navigation'
  import NoteList from './Notes/NoteList'
  import Editor from './Editor/Editor'
  import Markdown from './Markdown/Markdown'
  import Loading from './Shared/Loading'

  export default {
    name: 'App',
    components: {
      Navigation,
      NoteList,
      Editor,
      Markdown,
      Loading
    },
    computed: {
      ...mapState('loading', [
        'isLoading'
      ])
    },
    methods: {
      ...mapMutations('loading', [
        'setLoading'
      ])
    },
    async created () {
      this.setLoading(true)
      await this.$store.dispatch('settings/reloadSettings')
      await this.$store.dispatch('editor/reloadNotes')
      this.setLoading(false)
      console.info('App.vue created finished')
    }
  }
</script>

<style lang="scss" scoped>
.component {
  display: flex;
  height: 100%;

  .navigation {
    min-width: 300px;
    display: flex;
    flex: 1;
    overflow-y: auto;
  }

  .notes {
    min-width: 300px;
    display: flex;
    flex: 1;
    overflow-y: auto;
  }

  .editor {
    display: flex;
    flex: 2;
  }

  .markup {
    display: flex;
    flex: 2;
  }
}
</style>
