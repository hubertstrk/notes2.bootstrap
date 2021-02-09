<template>
  <div>
    <NavigationCard v-for="project in sortedProjects"
      :key="project" :name="project" :selectedName="selectedProject"
      @click="setSelectedProject(project)"
    >
      <template #icon>
        <font-awesome-icon v-if="selectedProject === project" icon="folder-open" />
        <font-awesome-icon v-else icon="folder" />
      </template>

      <template #title>
        {{project}}
      </template>

      <template #info>
        {{all.filter(x => x.project === project).filter(x => !x.archived).length}}
      </template>

    </NavigationCard>
  </div>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'

import NavigationCard from './NavigationCard'

export default {
  name: 'Navigation',
  components: {
    NavigationCard
  },
  computed: {
    ...mapGetters('editor', [
      'all',
      'projects'
    ]),
    ...mapState('editor', {
      selectedProject: state => state.ui.selectedProject
    }),
    sortedProjects () {
      return this.projects.sort((p1, p2) => p1.toLowerCase().localeCompare(p2.toLowerCase()))
    }
  },
  methods: {
    ...mapMutations('editor', [
      'setSelectedProject'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>