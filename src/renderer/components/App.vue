<template>
  <div id="component" class="component">
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
</template>

<script>
  import Navigation from './Navigation/Navigation'
  import NoteList from './Notes/NoteList'
  import Editor from './Editor/Editor'
  import Markdown from './Markdown/Markdown'

  export default {
    name: 'App',
    components: {
      Navigation,
      NoteList,
      Editor,
      Markdown
    },
    async created () {
      this.$store.dispatch('settings/reloadSettings').then(() => {
        this.$store.dispatch('editor/reloadNotes')
          .then(() => {
            this.$router.push('/')
          })
      })
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
