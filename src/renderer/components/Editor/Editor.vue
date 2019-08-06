<template>
  <div class="editor-component">
    <div class="editor-upper">
      <EditorMenu class="editor-menu" />
      <Ace class="editor-ace" :value="text" @input="onTextChanged" :options="{fontSize}" />
    </div>
    <Footer />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {NoteMixin} from '@/mixins/NoteMixin'

  import EditorMenu from './EditorMenu'
  import Ace from './Ace'
  import Footer from './Footer.vue'

  export default {
    name: 'Editor',
    mixins: [NoteMixin],
    components: {
      EditorMenu,
      Ace,
      Footer
    },
    computed: {
      ...mapState('settings', {
        fontSize: state => state.fontSize
      })
    },
    methods: {
      onTextChanged (text) {
        if (text !== '') {
          this.text = text
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.editor-component {

  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;

  .editor-upper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .editor-menu {
    display: flex;
  }

  .editor-ace {
    display: flex;
    flex: 1;
  }
}

</style>