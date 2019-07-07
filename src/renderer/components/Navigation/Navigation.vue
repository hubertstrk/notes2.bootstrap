<template>
  <div class="navigation">
    <NavigationCard mode="all" title="All Notes" />
    <NavigationCard mode="starred" title="Starred" />
    <ProjectList />
    <NavigationCard mode="deleted" title="Deleted" />
  </div>
</template>

<script>
  import NavigationCard from './NavigationCard'
  import ProjectList from './ProjectList'

  export default {
    name: 'Navigation',
    components: {
      NavigationCard,
      ProjectList
    }
  }
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: column;
  color: #73777A;
  padding: 20px;

  > div {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .icon-text {
    display: flex;
    > div {
      align-self: center;
      margin-right: 10px;
    }
  }
}
</style>