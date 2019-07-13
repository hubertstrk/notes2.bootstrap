<template>
  <div id="iframe-container"></div>
</template>

<script>
  import {getHtml} from '../../helper/notes'

  export default {
    name: 'MarkdownViewer',
    props: ['text'],
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
        return iFrame
      },
      mountedIFrame (iFrame) {
        const el = document.querySelector('#iframe-container')
        el.appendChild(iFrame, el)
      },
      addMarkup (html) {
        const container = document.createElement('div')
        container.innerHTML = html

        const iFrame = document.querySelector('#iframe')
        iFrame.contentDocument.body.innerHTML = container.innerHTML
        iFrame.onload = function () {
          iFrame.contentDocument.body.innerHTML = container.innerHTML
        }
      }
    },
    watch: {
      text () {
        const html = getHtml(this.text)
        this.addMarkup(html)
      }
    },
    mounted () {
      const iFrame = this.createIFrame()
      this.mountedIFrame(iFrame)
    }
  }
</script>

<style lang="scss" scoped>
#iframe-container {
  display: flex;
  flex: 1;
}
</style>