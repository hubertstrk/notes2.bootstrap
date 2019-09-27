import CustomError from './CustomError'

export default {
  name: 'ErrorBoundary',
  data: () => ({
    error: false
  }),
  errorCaptured () {
    this.error = true
  },
  style: {
    fontSize: '16px'
  },
  render (createElement) {
    return this.error ? createElement(CustomError, {}) : this.$slots.default[0]
  }
}
