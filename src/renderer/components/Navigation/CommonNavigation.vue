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
        {{groupStatistics[link.name]}}
      </template>

    </NavigationCard>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'

  import NavigationCard from './NavigationCard'

  export default {
    name: 'CommonNavigation',
    components: {
      NavigationCard
    },
    data () {
      return {
        links: [
          {name: 'all', icon: 'sticky-note', title: 'All'},
          {name: 'starred', icon: 'star', title: 'Starred'},
          {name: 'deleted', icon: 'trash', title: 'Deleted'}
        ]
      }
    },
    computed: {
      ...mapState('editor', {
        selectionMode: state => state.ui.selectionMode
      }),
      ...mapGetters('editor', [
        'all',
        'starred',
        'deleted',
        'projects'
      ]),
      groupStatistics () {
        return ['starred', 'all', 'deleted'].reduce((lookup, group) => {
          lookup[group] = this[group].length
          return lookup
        }, {})
      }
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