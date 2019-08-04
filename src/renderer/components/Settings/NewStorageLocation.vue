<template>
  <div>

      <h3>Add Location</h3>

      <b-form-group class="input-form" id="input-group" label="Name" label-for="location-name-input" description="Use an appropriate name to better identify your projects">
        <b-form-input id="location-name-input" v-model="location.name" type="text" required placeholder=""></b-form-input>
      </b-form-group>

      <div class="directory-selection">
        <b-form-group id="input-group" label="Directory" label-for="location-directory-control" description="Make your projects available on all devices and choose a folder which is synchronized with a cloud storage">
          <b-form-input disabled id="location-directory-control" v-model="location.directory" type="text" required placeholder=""></b-form-input>
        </b-form-group>
      </div>
      <AppButton icon="folder" success @click="openDirectorySelection" text="Select" />
      <AppButton icon="plus" primary @click="onAddLocation" text="Add directory" />
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
        locations: state => state.storageLocations
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
.input-form {
  width: 400px;
}

.directory-selection {
  display: flex;
  width: 400px;
}
</style>