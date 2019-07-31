<template>
  <div>
    <h1>Add</h1>
    <b-alert show variant="primary">
      To add a storage location select a folder and provide a name.
      To make your projects available on all devices choose a directory which is synchronized with a cloud storage such as
      the Google Drive or Dropbox. If you want to keep your data locally choose a directory on your computer which is not synchronized with a cloud storage.
    </b-alert>
    <AppButton icon="plus" success @click="openDirectorySelection" text="Add directory" />
    <div>{{directory}}</div>
    <b-form-input
      v-model="name" type="text" directoryplaceholder="Enter directory name" >
    </b-form-input>
    <AppButton :disabled="!directory && !name" icon="plus" success @click="onAddStorageLocation" text="Create directory" />
  </div>
</template>

<script>
  import AppButton from '@/components/Shared/AppButton'
  import {mapActions} from 'vuex'
  const {dialog} = require('electron').remote

  export default {
    name: 'NewStorageLocation',
    components: {
      AppButton
    },
    data () {
      return {
        directory: null,
        name: null
      }
    },
    methods: {
      ...mapActions('editor', [
        'addStorageLocation'
      ]),
      openDirectorySelection () {
        dialog.showOpenDialog({
          title: 'Select Folder',
          properties: ['openDirectory']
        }, (folders) => {
          if (folders && folders.length === 1) {
            this.directory = folders[0]
          }
        })
      },
      async onAddStorageLocation () {
        await this.addStorageLocation({directory: this.directory, name: this.name})
        this.selectedDirectory = null
        this.storgaeLocationName = null
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>