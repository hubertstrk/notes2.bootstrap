<template>
  <div
    class="navigation-card"
    :class="{active: selectionMode === mode || selectedProject === mode}"
    @click="$emit('click', mode)"
  >
    <div class="navigation-card-icon">
      <font-awesome-icon :icon="icon" />
    </div>
    <div class="navigation-card-title">
      {{title}}
    </div>
    <div class="navigation-card-counter">
      {{count}}
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    props: ['mode', 'icon', 'title', 'count'],
    computed: {
      ...mapState('editor', {
        selectionMode: state => state.ui.selectionMode,
        selectedProject: state => state.ui.selectedProject
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
$active-color: rgb(200, 200, 200);

.navigation-card {
  display: flex;
  cursor: pointer;
  font-size: 1.1rem;
  margin: 10px 0;

  :hover {
    color: $active-color;
  }

  > div {
    display: flex;
    align-items: center;
  }

  .navigation-card-icon {
    width: 35px;
    justify-content: center;
  }

  .navigation-card-title {
    width: 100%;
    margin: 0 10px;
  }

  .navigation-card-counter {
    width: 35px;
    justify-content: center;
  }
}
.active {
  color: $active-color;
}
</style>