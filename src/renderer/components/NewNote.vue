<template>
  <div class="new-note-component">
    <Menu title="New Note" />

    <div class="new-note-form">

      <b-form-group id="input-group-location-selection" label="Location name" label-for="location-selection" description="Select a location">
        <b-form-select id="location-selection" v-model="location" :options="locationOptions"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-project-selection" label="Project name" label-for="project-selection" description="Select an existing project name">
        <b-form-select id="project-selection" v-model="project" :options="projectOptions"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-project-input" label="Project name" label-for="project-input" description="Enter a new project name">
        <b-form-input id="project-input" v-model="newProjectName" type="text"></b-form-input>
      </b-form-group>

    </div>

    <AppButton primary @click="onNewNote()" text="Create Note" />

  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
  import Menu from './Settings/Menu'
  import AppButton from '@/components/Shared/AppButton'

  export default {
    components: {
      Menu,
      AppButton
    },
    data () {
      return {
        location: null,
        project: null,
        newProjectName: ''
      }
    },
    computed: {
      ...mapState('settings', {
        locations: state => state.locations
      }),
      ...mapGetters('editor', [
        'projects'
      ]),
      locationOptions () {
        return this.locations ? this.locations.map(location => ({value: location, text: location.name})) : null
      },
      projectOptions () {
        return this.projects ? this.projects : null
      }
    },
    methods: {
      ...mapActions('editor', [
        'addNote'
      ]),
      async onNewNote () {
        await this.addNote({location: this.location, project: this.newProjectName !== '' ? this.newProjectName : this.project})
        this.$router.push('/')
      }
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