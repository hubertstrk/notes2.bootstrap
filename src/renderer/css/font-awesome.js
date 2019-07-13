import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faStar,
  faStickyNote,
  faTrash,
  faFolder,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faStar,
  faStickyNote,
  faTrash,
  faFolder,
  faChevronRight
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
