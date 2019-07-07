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
      background-color: rgb(30, 30, 30);
      color: rgb(220, 220, 220)
    }

    .notes {
      min-width: 150px;
      display: flex;
      flex: 1;
      background-color: rgb(235, 235, 235);
      border-right: 1px solid rgb(200, 200, 200);
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
