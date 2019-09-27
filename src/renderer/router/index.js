import Vue from 'vue'
import Router from 'vue-router'

import Appearance from '../components/Settings/Appearance'
import About from '../components/Settings/About'
import LocationManagement2 from '../components/Settings/LocationManagement2'
import NewStorageLocation from '../components/Settings/NewStorageLocation'

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
      path: '/NoteInfo',
      name: 'NoteInfo',
      component: require('@/components/NoteInfo').default
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: require('@/components/Settings').default,
      children: [
        {
          name: 'LocationManagement2',
          path: 'LocationManagement2',
          component: LocationManagement2
        },
        {
          name: 'NewStorageLocation',
          path: 'NewStorageLocation',
          component: NewStorageLocation
        },
        {
          name: 'Appearance',
          path: 'Appearance',
          component: Appearance
        },
        {
          name: 'About',
          path: 'About',
          component: About
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
