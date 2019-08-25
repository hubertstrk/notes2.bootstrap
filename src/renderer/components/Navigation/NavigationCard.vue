<template>
  <div
    @dragover.prevent @drop="onDrop"
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
  import {mapActions} from 'vuex'

  export default {
    name: 'NavigationCard',
    props: ['name', 'selectedName'],
    methods: {
      ...mapActions('editor', [
        'onDropped'
      ]),
      onDrop (event) {
        event.preventDefault()
        this.onDropped(this.name)
      }
    }
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