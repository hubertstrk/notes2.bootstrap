import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Editor',
      component: require('@/components/Editor').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
