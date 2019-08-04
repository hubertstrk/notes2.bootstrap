<template>
  <div>
    <h1>Add</h1>
    <b-alert show variant="primary">
      To add a storage location select a folder and provide a name.
      To make your projects available on all devices choose a directory which is synchronized with a cloud storage such as
      the Google Drive or Dropbox. If you want to keep your data locally choose a directory on your computer which is not synchronized with a cloud storage.
    </b-alert>
    <AppButton icon="plus" success @click="openDirectorySelection" text="Add directory" />
    <div>{{location.directory}}</div>
    <b-form-input
      v-model="location.name" type="text" >
    </b-form-input>
    <AppButton icon="plus" success @click="onAddLocation" text="Create directory" />
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
</style>