<template>
  <div class="markup-menu">
    <b-form-checkbox :value="reader" @input="toggleReader()" button button-variant="success">
      <font-awesome-icon icon="book-open" /> Reader
    </b-form-checkbox>
    <AppButton secondary icon="print" @click="print" text="Print" />
    <AppButton secondary icon="cog" @click="$router.push('/Settings/LocationManagement2')" text="Settings" />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import AppButton from '@/components/Shared/AppButton'

export default {
  components: {
    AppButton
  },
  methods: {
    ...mapState('settings', {
      reader: state => state.reader
    }),
    ...mapActions('settings', [
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