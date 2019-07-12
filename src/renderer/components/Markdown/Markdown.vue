<template>
  <div id="iframe-container"></div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import {getHtml} from '../../helper/notes'

  export default {
    name: 'Editor',
    computed: {
      ...mapState('editor', {
        activeNoteId: state => state.activeNoteId
      }),
      ...mapGetters('editor', [
        'all'
      ])
    },
    methods: {
      createIFrame () {
        const ifrm = document.createElement('iframe')
        ifrm.setAttribute('id', 'iframe')
        ifrm.classList.add('iframe')
        ifrm.setAttribute('src', '/static/page/index.html')
        ifrm.setAttribute('frameborder', 0)
        ifrm.setAttribute('border', 0)
        ifrm.setAttribute('height', '100%')
        ifrm.setAttribute('width', '100%')
        const el = document.querySelector('#iframe-container')
        el.appendChild(ifrm, el)
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
      activeNoteId () {
        if (this.activeNoteId) {
          const activeNote = this.all.find(x => x.id === this.activeNoteId)
          const html = getHtml(activeNote.text)
          this.addMarkup(html)
        }
      }
    },
    mounted () {
      this.createIFrame()
    }
  }
</script>

<style lang="scss" scoped>
#iframe-container {
  display: flex;
  flex: 1;
}
</style>