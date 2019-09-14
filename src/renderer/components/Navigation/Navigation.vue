<template>
  <div class="d-flex flex-column navigation">
    <CommonNavigation />

    <div v-b-toggle.collapse-1>
      <NavigationCard name="project-collapse">

        <template #icon>
          <font-awesome-icon icon="chevron-right" />
        </template>

        <template #title>
          Projects
        </template>

        <template #info>
          <NumericTween :value="projects.length" />
        </template>

      </NavigationCard>
    </div>

    <b-collapse id="collapse-1" class="collapse-container" visible>
      <ProjectNavigation />
    </b-collapse>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import NavigationCard from './NavigationCard'
  import CommonNavigation from './CommonNavigation'
  import ProjectNavigation from './ProjectNavigation'
  import NumericTween from '@/components/Shared/NumericTween'

  export default {
    name: 'Navigation',
    components: {
      NavigationCard,
      CommonNavigation,
      ProjectNavigation,
      NumericTween
    },
    computed: {
      ...mapGetters('editor', [
        'projects'
      ])
    }
  }
</script>

<style lang="scss" scoped>
.navigation {
  background-color: #2D3134;
  color: rgb(160, 160, 160);
  padding: 20px;
}
</style>