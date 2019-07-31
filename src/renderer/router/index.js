import Vue from 'vue'
import Router from 'vue-router'

import Appearance from '../components/Settings/Appearance'
import About from '../components/Settings/About'
import StorageLocations from '../components/Settings/StorageLocations'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: require('@/components/App').default
    },
    {
      path: '/NewNote',
      name: 'NewNote',
      component: require('@/components/NewNote').default
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: require('@/components/Settings').default,
      children: [
        {
          name: 'Appearance',
          path: 'Appearance',
          component: Appearance
        },
        {
          name: 'About',
          path: 'About',
          component: About
        },
        {
          name: 'StorageLocations',
          path: 'StorageLocations',
          component: StorageLocations
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
