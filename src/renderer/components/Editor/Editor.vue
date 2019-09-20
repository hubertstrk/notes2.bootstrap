<template>
  <div class="editor-component">
    <div class="editor-upper">
      <EditorMenu class="editor-menu" />
      <Ace class="editor-ace" :value="activeText" @input="onTextChanged" :options="{fontSize}" />
    </div>
    <Footer />
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {NoteMixin} from '@/mixins/NoteMixin'
  import {debounce} from 'lodash'

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
      }),
      activeText () {
        if (!this.activeNoteId) return ''
        return this.notes[this.activeNoteId].text
      }
    },
    methods: {
      ...mapActions('editor', [
        'updateNote'
      ]),
      onTextChanged: debounce(function (text) {
        if (text === '') {
          return
        }
        this.updateNote({id: this.activeNoteId, text})
      }, 300)
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
    height: 60px;
  }

  .editor-ace {
    display: flex;
    flex: 1;
  }
}

</style>