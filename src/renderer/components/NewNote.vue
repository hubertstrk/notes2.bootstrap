<template>
  <div class="new-note-component">
    <Menu title="New Note" />

    <div class="new-note-form">

      <b-form-group id="input-group-title" label="Title" label-for="title" description="Enter a title for your note">
        <b-form-input id="title" v-model="title" type="text"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-location-selection" label="Location name" label-for="location-selection" description="Select a storage location">
        <b-form-select id="location-selection" v-model="location" :options="locationOptions"></b-form-select>
      </b-form-group>

      <b-form-radio-group buttons style="margin: 0 0 15px 0;"
        id="btn-radios-project-mode" v-model="useExtisingProject"
        :options="projectModeOptions" name="radios-btn-project-mode"
      ></b-form-radio-group>

      <b-form-group id="input-group-project-selection" label="Project name" label-for="project-selection" description="Select an existing project">
        <b-form-select :disabled="!useExtisingProject" id="project-selection" v-model="projectName" :options="projectOptions"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-project-input" label="Project name" label-for="project-input" description="Enter a new project">
        <b-form-input :disabled="useExtisingProject" id="project-input" v-model="projectName" type="text"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-starred">
        <b-form-checkbox v-model="starred" value="true">Starred</b-form-checkbox>
      </b-form-group>

    </div>

    <AppButton :disabled="!createEnabled" primary @click="onNewNote()" text="Create Note" />

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
        projectName: '',
        useExtisingProject: true,
        starred: false,
        title: ''
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
      },
      projectModeOptions () {
        return [
          { text: 'Existing Project', value: true },
          { text: 'New Project', value: false }
        ]
      },
      createEnabled () {
        return this.location !== null && this.projectName !== ''
      }
    },
    methods: {
      ...mapActions('editor', [
        'addNote'
      ]),
      async onNewNote () {
        await this.addNote({location: this.location, project: this.projectName, starred: this.starred, title: this.title})
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