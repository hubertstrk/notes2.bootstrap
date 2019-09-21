<template>
  <div class="main-component">
    <Loading v-if="isLoading" />
    <div v-else id="component" class="component">
      <div class="navigation" :class="{reading: reader}">
        <Navigation />
      </div>
      <div class="notes" :class="{reading: reader}">
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
      ]),
      ...mapState('settings', {
        reader: state => state.reader
      })
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
    }
  }
</script>

<style lang="scss" scoped>
.main-component {
  height: 100%;
  width: 100%;

  .component {
    display: flex;
    height: 100%;

    .navigation {
      width: 300px;
      flex: 1;
      display: flex;
      overflow-y: auto;
      transition: all .5s;
    }

    .notes {
      width: 300px;
      flex: 1;
      display: flex;
      overflow-y: auto;
      transition: all 1s;
    }

    .reading {
      width: 0px;
      flex: 0;
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
}
</style>
