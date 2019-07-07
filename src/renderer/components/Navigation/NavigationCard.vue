<template>
  <div
    class="navigation-card"
    :class="{active: selectionMode === mode}"
    @click="setSelectionMode(mode)"
  >
    {{title}}
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    props: ['mode', 'title'],
    computed: {
      ...mapState('editor', {
        selectionMode: state => state.ui.selectionMode
      })
    },
    methods: {
      ...mapMutations('editor', [
        'setSelectionMode'
      ])
    }
  }
</script>

<style lang="scss" scoped>
.navigation-card:hover {
  cursor: pointer;
}
.active {
  color: whitesmoke;
}
</style>