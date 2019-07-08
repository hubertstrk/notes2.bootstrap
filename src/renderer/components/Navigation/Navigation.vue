<template>
  <div class="navigation">
    <NavigationCard
      @click="setSelectionMode('all')"
      mode="all"
      icon="sticky-note"
      title="All Notes"
      :count="all.length"
    />
    <NavigationCard
      @click="setSelectionMode('starred')"
      mode="starred"
      icon="star"
      title="Starred"
      :count="starred.length"
    />
    <NavigationCard
      @click="setSelectionMode('deleted')"
      mode="deleted"
      icon="trash"
      title="Deleted"
      :count="deleted.length"
    />

    <h4 class="project-title">Projects</h4>
    <NavigationCard
      v-for="(project, i) in projects" :key="i"
      :mode="project" icon="chevron-right" :title="project" :count="all.filter(x => x.project === project).length"
      @click="setSelectedProject(project)"
    />

  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'

  import NavigationCard from './NavigationCard'

  export default {
    name: 'Navigation',
    components: {
      NavigationCard
    },
    computed: {
      ...mapGetters('editor', [
        'all',
        'starred',
        'deleted',
        'projects'
      ])
    },
    methods: {
      ...mapMutations('editor', [
        'setSelectionMode',
        'setSelectedProject'
      ])
    }
  }
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: column;
  color: #73777A;
  padding: 20px;

  .project-title {
    margin: 15px 0;
  }
}
</style>