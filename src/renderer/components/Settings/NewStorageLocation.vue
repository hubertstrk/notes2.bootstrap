<template>
  <div class="new-storage-location-component">
    <h3>Add Location</h3>
    <b-alert show variant="primary">Add a new location by entering a name and selecting a storage directory.</b-alert>
    <b-form-group id="input-group" label="Name" label-for="location-name-input" description="Use an appropriate name to better identify your projects">
      <b-form-input id="location-name-input" v-model="location.name" type="text"></b-form-input>
    </b-form-group>
    <div>
      <b-form-group id="input-group" label="Directory" label-for="location-directory-control" description="Make your projects available on all devices and
        choose a folder which is synchronized with a cloud storage">
        <b-form-input disabled id="location-directory-control" v-model="location.directory" type="text"></b-form-input>
      </b-form-group>
    </div>
    <div class="action-buttons">
      <AppButton icon="folder" success @click="openDirectorySelection" text="Select" />
      <AppButton :disabled="!location.directory || !location.name" icon="plus" primary @click="onAddLocation" text="Add directory" />
    </div>
  </div>
</template>

<script>
  import AppButton from '@/components/Shared/AppButton'
  import {mapState, mapActions} from 'vuex'
  const {dialog} = require('electron').remote

  export default {
    name: 'NewStorageLocation',
    components: {
      AppButton
    },
    data () {
      return {
        location: {
          directory: null,
          name: null
        }
      }
    },
    computed: {
      ...mapState('settings', {
        locations: state => state.locations
      })
    },
    methods: {
      ...mapActions('settings', [
        'addLocation'
      ]),
      openDirectorySelection () {
        dialog.showOpenDialog({
          title: 'Select Folder',
          properties: ['openDirectory']
        }, (folders) => {
          if (folders && folders.length === 1) {
            this.location.directory = folders[0]
          }
        })
      },
      async onAddLocation () {
        await this.addLocation(this.location)
        this.location = {directory: null, name: null}
      }
    }
  }
</script>

<style lang="scss" scoped>
.new-storage-location-component {

  display: flex;
  flex-direction: column;
  width: 600px;

  .action-buttons {

    display: flex;
    margin-bottom: 10px;

    > *:first-child {
      margin-right: 6px;
    }
  }
}
</style>