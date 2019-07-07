<template>
  <div id="component" class="component">
    <div class="navigation">
      <Navigation></Navigation>
    </div>
    <div class="notes">
      <Notes></Notes>
    </div>
    <div class="markdown">
      <Markdown></Markdown>
    </div>
    <div class="markup">
      <Markup></Markup>
    </div>
  </div>
</template>

<script>
  import Navigation from './Navigation'
  import Notes from './Notes'
  import Markdown from './Markdown'
  import Markup from './Markup'

  export default {
    name: 'landing-page',
    components: {
      Navigation,
      Notes,
      Markdown,
      Markup
    },
    created () {
      this.$store.dispatch('reloadNotes')
    }
  }
</script>

<style lang="scss" scoped>
.component {
    display: flex;
    height: 100%;

    .navigation {
      min-width: 150px;
      display: flex;
      flex: 1;
      background-color: #2D3134;
    }

    .notes {
      min-width: 150px;
      display: flex;
      flex: 2;
      background-color: rgb(190, 190, 190);
    }

    .markdown {
      display: flex;
      flex: 3;
    }

    .markup {
      display: flex;
      flex: 3;
    }
}
</style>
