<template>
  <div
    class="navigation-card"
    :class="{active: selectedName === name}"
    @click="$emit('click', name)"
  >
    <div class="card-icon">
      <slot name="icon" />
    </div>
    <div class="card-title">
      <slot name="title" />
    </div>
    <div class="card-info">
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

  :hover {
    color: $active-color;
  }

  > div {
    display: flex;
    align-items: center;
  }

  .card-icon {
    font-size: 1rem;
  }

  .card-icon, .card-info {
    width: 35px;
    justify-content: center;
  }

  .card-title {
    width: 100%;
    margin: 0 10px;
  }
}
.active {
  color: $active-color;
}
</style>