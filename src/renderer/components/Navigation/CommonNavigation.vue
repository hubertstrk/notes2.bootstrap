<template>
  <div>
    <NavigationCard v-for="link in links"
      :key="link.name"
      :name="link.name"
      :selectedName="selectionMode"
      @click="setSelectionMode(link.name)"
    >
      <template #icon>
        <font-awesome-icon :icon="link.icon" />
      </template>

      <template #title>
        {{link.title}}
      </template>

      <template #info>
        <NumericTween :value="groupStatistic[link.name]" />
      </template>

    </NavigationCard>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'

  import NavigationCard from './NavigationCard'
  import NumericTween from '@/components/Shared/NumericTween'

  export default {
    name: 'CommonNavigation',
    components: {
      NavigationCard,
      NumericTween
    },
    data () {
      return {
        links: [
          {name: 'all', icon: 'sticky-note', title: 'All'},
          {name: 'starred', icon: 'star', title: 'Starred'},
          {name: 'archived', icon: 'archive', title: 'Archived'}
        ]
      }
    },
    computed: {
      ...mapState('editor', {
        selectionMode: state => state.ui.selectionMode
      }),
      ...mapGetters('editor', [
        'groupStatistic',
        'projects'
      ])
    },
    methods: {
      ...mapMutations('editor', [
        'setSelectionMode'
      ])
    }
  }
</script>

<style lang="scss" scoped>
</style>