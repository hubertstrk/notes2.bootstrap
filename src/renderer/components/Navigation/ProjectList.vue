<template>
  <div>
    <div
      class="collapse-area"
      v-b-toggle.collapse-projects variant="primary"
    >
      Projects
    </div>
    <b-collapse
      id="collapse-projects"
      class="mt-2"
    >
      <ProjectCard
        v-for="(project, i) in projects"
        :key="i"
        :project="project"
      />
    </b-collapse>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ProjectCard from './ProjectCard'

  export default {
    components: {
      ProjectCard
    },
    computed: {
      ...mapGetters('editor', [
        'projects'
      ])
    }
  }
</script>

<style lang="scss" scoped>
.active {
  color: whitesmoke;
}

.collapse-area:hover {
  cursor: pointer;
}
</style>