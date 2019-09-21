<template>
  <div class="markup-menu">
    <b-form-checkbox :value="reader" @input="toggleReader()" button button-variant="success">
      <font-awesome-icon icon="book-open" /> Reader
    </b-form-checkbox>
    <AppButton secondary icon="print" @click="print" text="Print" />
    <AppButton secondary icon="cog" @click="$router.push('/Settings/LocationManagement')" text="Settings" />
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import AppButton from '@/components/Shared/AppButton'

export default {
  components: {
    AppButton
  },
  computed: {
    isReaderMode: {
      get () {
        return this.reader
      },
      set (value) {
        this.toggleReader()
      }
    }
  },
  methods: {
    ...mapState('settings', {
      reader: state => state.reader
    }),
    ...mapMutations('settings', [
      'toggleReader'
    ]),
    print () {
      document.querySelector('#iframe').contentWindow.print()
    }
  }
}
</script>

<style lang="scss" scoped>
.markup-menu {
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: flex-end;

  > * {
    display: flex;
    margin-left: 4px;
  }
}
</style>