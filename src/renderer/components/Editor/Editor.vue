<template>
  <div class="editor-component">
    <EditorMenu class="editor-menu" />
    <Ace class="editor-ace" v-model="text" :options="{fontSize}" />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {NoteMixin} from '../../mixins/NoteMixin'

  import EditorMenu from './EditorMenu'
  import Ace from './Ace'

  export default {
    name: 'Editor',
    mixins: [NoteMixin],
    components: {
      EditorMenu,
      Ace
    },
    computed: {
      ...mapState('editor', {
        fontSize: state => state.settings.fontSize
      })
    }
  }
</script>

<style lang="scss" scoped>
.editor-component {

  display: flex;
  flex-direction: column;
  flex: 1;

  .editor-menu {
    display: flex;
  }

  .editor-ace {
    display: flex;
    flex: 1;
  }
}

</style>