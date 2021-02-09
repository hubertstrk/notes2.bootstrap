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

      <template #info v-if="link.showInfo">
        {{groupStatistic[link.name]}}
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
          {name: 'all', icon: 'sticky-note', title: 'All', showInfo: true},
          {name: 'recent', icon: 'eye', title: 'Recent', showInfo: false},
          {name: 'starred', icon: 'heart', title: 'Starred', showInfo: true},
          {name: 'archived', icon: 'archive', title: 'Archived', showInfo: true}
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