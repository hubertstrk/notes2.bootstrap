<template>
  <div ref="iFrameContainer" class="iFrame-container"></div>
</template>

<script>
import {mapState} from 'vuex'
import {getHtml} from '@/helper/Marked'
import {NoteMixin} from '@/mixins/NoteMixin'

export default {
  name: 'MarkdownViewer',
  mixins: [NoteMixin],
  data () {
    return {
      iFrame: null,
      markdown: '<div></div>'
    }
  },
  computed: {
    ...mapState('editor', {
      activeNoteId: state => state.ui.activeNoteId,
      all: state => state.notes
    }),
    text () {
      return this.activeNoteId ? this.notes[this.activeNoteId].text : '<div></div>'
    }
  },
  methods: {
    createIFrame () {
      const iFrame = document.createElement('iframe')
      iFrame.setAttribute('id', 'iframe')
      iFrame.classList.add('iframe')
      iFrame.setAttribute('src', '/static/page/index.html')
      iFrame.setAttribute('frameborder', 0)
      iFrame.setAttribute('border', 0)
      iFrame.setAttribute('height', '100%')
      iFrame.setAttribute('width', '100%')
      iFrame.onload = () => {
        this.addMarkup(this.markdown)
      }
      this.$refs.iFrameContainer.appendChild(iFrame)
    },
    addMarkup (text) {
      const html = getHtml(text)
      const container = document.createElement('div')
      container.innerHTML = html

      const iFrame = document.querySelector('#iframe')
      console.info('add Markup')
      iFrame.contentDocument.body.innerHTML = container.innerHTML
    }
  },
  watch: {
    text: {
      immediate: true,
      handler (text) {
        if (text) {
          this.markdown = text
        }
      }
    },
    markdown () {
      if (this.markdown) {
        this.addMarkup(this.markdown)
      }
    }
  },
  mounted () {
    this.createIFrame()
  }
}
</script>

<style lang="scss" scoped>
.iFrame-container {
  display: flex;
  flex: 1;
}
</style>