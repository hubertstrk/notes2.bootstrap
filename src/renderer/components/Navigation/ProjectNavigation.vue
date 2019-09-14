<template>
  <div>
    <NavigationCard v-for="project in projects.sort()"
      :key="project" :name="project" :selectedName="selectedProject"
      @click="setSelectedProject(project)"
    >
      <template #icon>
        <font-awesome-icon icon="folder" />
      </template>

      <template #title>
        {{project}}
      </template>

      <template #info>
        <NumericTween :value="all.filter(x => x.project === project).filter(x => !x.archived).length" />
      </template>

    </NavigationCard>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'

  import NavigationCard from './NavigationCard'
  import NumericTween from '@/components/Shared/NumericTween'

  export default {
    name: 'Navigation',
    components: {
      NavigationCard,
      NumericTween
    },
    computed: {
      ...mapGetters('editor', [
        'all',
        'projects'
      ]),
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
</style>