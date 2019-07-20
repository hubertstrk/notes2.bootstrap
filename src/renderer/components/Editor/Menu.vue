<template>
  <div class="editor-menu-component">
    <div>
      <b-button :value="starred" @update="updateNote({id: activeNoteId, starred: $event.target.value})" variant="light">
        <font-awesome-icon icon="bookmark" />
      </b-button>
      <app-devider xlarge />
      <b-button-group>
        <app-button light icon="search-plus" @click="zoomIn" />
        <app-button light icon="search-minus" @click="zoomOut" />
      </b-button-group>
      <app-devider xlarge />
      <b-button-group>
        <app-button light icon="italic" />
        <app-button light icon="bold" />
        <app-button light icon="link" />
        <app-button light icon="code" />
        <app-button light icon="table" />
      </b-button-group>
    </div>
    <div>
      <app-button icon="trash" @click="$emit('delete')" text="Delete" danger />
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {NoteMixin} from '../../mixins/NoteMixin'
  import {notify} from '../../helper/AppNotifications'

  import AppButton from '../Shared/AppButton'
  import AppDevider from '../Shared/AppDevider'

  export default {
    components: {
      AppDevider,
      AppButton
    },
    mixins: [
      NoteMixin
    ],
    computed: {
      ...mapState('editor', {
        settings: state => state.settings
      })
    },
    methods: {
      ...mapActions('editor', [
        'deleteNote',
        'updateNote',
        'updateSettings'
      ]),
      async onDeleteNote () {
        await this.deleteNote()
        notify('Note deleted')
      },
      zoomIn (value) {
        this.updateSettings({fontSize: (this.settings.fontSize + value) * 1.1})
      },
      zoomOut (value) {
        this.updateSettings({fontSize: (this.settings.fontSize + value) * 0.9})
      }
    },
    watch: {
      checked (value) {
        if (!value) return
        this.updateNote({id: this.activeNoteId, starred: value})
      },
      starred () {
        this.checked = this.starred
      }
    },
    created () {
      this.checked = this.starred
    }
  }
</script>

<style lang="scss" scoped>
.editor-menu-component {
    display: flex;
    justify-content: space-between;
    padding: 10px 3px;

    > div {
      display: flex;
    }
  }
</style>