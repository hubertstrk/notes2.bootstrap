<template>
  <div
    class="navigation-card"
    :class="{active: selectedName === name}"
    @click="$emit('click', name)"
  >
    <div class="navigation-card-icon">
      <slot name="icon" />
    </div>
    <div class="navigation-card-title">
      <slot name="title" />
    </div>
    <div class="navigation-card-info">
      <slot name="info" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavigationCard',
    props: ['name', 'selected-name']
  }
</script>

<style lang="scss" scoped>
$active-color: rgb(200, 200, 200);

.navigation-card {
  display: flex;
  font-size: 1.1rem;
  margin-bottom: 20px;
  cursor: pointer;

  > div {
    display: flex;
    align-items: center;
  }

  .navigation-card-icon {
    font-size: 1rem;
  }

  .navigation-card-icon, .navigation-card-info {
    width: 35px;
    justify-content: center;
  }

  .navigation-card-title {
    width: 100%;
    margin: 0 10px;
  }
}

.active {
  color: $active-color;
}

</style>