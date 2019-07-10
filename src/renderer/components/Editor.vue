<template>
  <div id="component" class="component">
    <div class="navigation">
      <Navigation />
    </div>
    <div class="notes">
      <NoteList />
    </div>
    <div class="markdown">
      <Markdown />
    </div>
    <div class="markup">
      <Markup />
    </div>
  </div>
</template>

<script>
  import Navigation from './Navigation/Navigation'
  import NoteList from './Notes/NoteList'
  import Markdown from './Markdown/Markdown'
  import Markup from './Markup/Markup'

  export default {
    name: 'landing-page',
    components: {
      Navigation,
      NoteList,
      Markdown,
      Markup
    },
    created () {
      this.$store.dispatch('editor/reloadNotes')
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
    }

    .notes {
      min-width: 300px;
      display: flex;
      flex: 1;
    }

    .markdown {
      display: flex;
      flex: 2;
    }

    .markup {
      display: flex;
      flex: 2;
    }
}
</style>
