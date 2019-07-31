<template>
  <div class="new-note-component">
    <Menu title="New Note" />

    <div class="new-note-form">
      <p class="lead">
        To create a new note you can add
      </p>
      <b-form-select v-model="selectedProject" :options="projects"></b-form-select>
      <b-button variant="danger">Button</b-button>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Menu from './Settings/Menu'

  export default {
    components: {
      Menu
    },
    data () {
      return {
        selectedProject: ''
      }
    },
    computed: {
      ...mapGetters('editor', [
        'projects'
      ])
    }
  }
</script>

<style lang="scss" scoped>
.new-note-component {
  padding: 30px;

  .new-note-form {
    width: 40%;
  }
}
</style>