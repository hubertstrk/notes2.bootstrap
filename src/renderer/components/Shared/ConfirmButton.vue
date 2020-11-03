<template>
  <div class="confirm-button-component">
    <transition name="slide">
      <div class="confirm-button-component-action" v-if="!actionCalled" key="delete">
        <AppButton icon="trash" secondary @click="actionCalled = true" :text="text" />
      </div>
      <div v-else key="confirm" class="confirm-button-component-action">
        <AppButton @click="actionCalled = false" text="Cancel" />
        <AppButton icon="trash" danger @click="onConfirm" text="Confirm" />
      </div>
    </transition>
  </div>
</template>

<script>
  import AppButton from '@/components/Shared/AppButton'

  export default {
    name: 'ConfirmButton',
    props: ['text'],
    data () {
      return {
        actionCalled: false
      }
    },
    methods: {
      onConfirm () {
        this.$emit('confirm')
        this.actionCalled = false
      }
    },
    components: {
      AppButton
    }
  }
</script>

<style lang="scss" scoped>
.confirm-button-component {
  position: relative;

  .confirm-button-component-action {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right:0;
    width: 300px;
  }
}

.slide-enter-active {
  animation: fade-in .3s;
}
.slide-leave-active {
  animation: fade-out .3s;
}

@keyframes fade-in {
  0% {
    transform: translate(100px);
    opacity: 0;
  }
  100% {
    transform: translate(0px);
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    transform: translate(0px);
    opacity: 1;
  }
  100% {
    transform: translate(-100px);
    opacity: 0;
  }
}
</style>