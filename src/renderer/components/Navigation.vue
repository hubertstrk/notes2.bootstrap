<template>
  <div class="component">
    <div :class="{active: selectionMode === 'all'}" @click="setSelectionMode('all')">All Notes</div>
    <div :class="{active: selectionMode === 'starred'}" @click="setSelectionMode('starred')">Starred</div>

    <div v-b-toggle.collapse-projects variant="primary">Projects</div>
    <b-collapse id="collapse-projects" class="mt-2">
      <div v-for="project in projects" :key="project">{{project}}</div>
    </b-collapse>

    <div :class="{active: selectionMode === 'deleted'}" @click="setSelectionMode('deleted')">Deleted</div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    name: 'navigation',
    computed: {
      ...mapState({
        selectionMode: state => state.editor.ui.selectionMode,
        selectedProject: state => state.editor.ui.selectedProject
      }),
      ...mapGetters([
        'projects'
      ])
    },
    methods: {
      ...mapMutations([
        'setSelectionMode'
      ])
    }
  }
</script>

<style lang="scss" scoped>
.component {
  display: flex;
  flex-direction: column;
  color: #73777A;
  padding: 20px;

  > div {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .active {
    color: whitesmoke;
  }

  .icon-text {
    display: flex;
    > div {
      align-self: center;
      margin-right: 10px;
    }
  }
}
</style>