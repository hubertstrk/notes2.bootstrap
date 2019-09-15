<template>
  <div ref="iFrameContainer" class="iFrame-container"></div>
</template>

<script>
  import {getHtml} from '@/helper/Marked'
  import {NoteMixin} from '@/mixins/NoteMixin'

  export default {
    name: 'MarkdownViewer',
    mixins: [NoteMixin],
    data () {
      return {
        iFrame: null
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
        this.$refs.iFrameContainer.appendChild(iFrame)
      },
      addMarkup (text) {
        const html = getHtml(text)
        const container = document.createElement('div')
        container.innerHTML = html

        const iFrame = document.querySelector('#iframe')
        iFrame.contentDocument.body.innerHTML = container.innerHTML
      }
    },
    watch: {
      text () {
        if (this.text) {
          this.addMarkup(this.text)
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