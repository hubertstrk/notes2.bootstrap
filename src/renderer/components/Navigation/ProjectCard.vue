<template>
  <div
    class="project-card"
    :class="{active: selectedProject === project}"
    @click="setSelectedProject(project)"
  >
    {{project}}
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    props: ['project'],
    computed: {
      ...mapState('editor', {
        selectedProject: state => state.ui.selectedProject
      })
    },
    methods: {
      ...mapMutations('editor', [
        'setSelectedProject'
      ])
    }
  }
</script>

<style lang="scss" scoped>
.project-card {
  margin-left: 15px;
}

.project-card:hover {
  cursor: pointer;
}

.active {
  color: whitesmoke;
}
</style>