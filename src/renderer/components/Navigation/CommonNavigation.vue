<template>
  <div>
    <NavigationCard v-for="link in navigationLinks"
      @click="setSelectionMode(link.name)"
      :key="link.name"
      :name="link.name"
      :selectedName="selectionMode"
    >
      <template #icon>
        <font-awesome-icon :icon="link.icon" />
      </template>

      <template #title>
        {{link.title}}
      </template>

      <template #info>
        {{link.info}}
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
    computed: {
      ...mapGetters('editor', ['all', 'starred', 'deleted', 'projects']),
      ...mapState('editor', {
        selectionMode: state => state.ui.selectionMode
      }),
      navigationLinks () {
        return [
          {name: 'all', icon: 'sticky-note', title: 'All Notes', info: this.all.length},
          {name: 'starred', icon: 'star', title: 'Starred', info: this.starred.length},
          {name: 'deleted', icon: 'trash', title: 'Deleted', info: this.deleted.length}
        ]
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