import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faStar,
  faStickyNote,
  faTrash,
  faFolder,
  faChevronRight,
  faBookmark,
  faPlus,
  faSearchPlus,
  faSearchMinus,
  faItalic,
  faBold,
  faTable,
  faLink,
  faCode,
  faPrint,
  faCog,
  faArchive,
  faStrikethrough,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

import {
  faBookmark as farBookmark
} from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

library.add(
  faStar,
  faStickyNote,
  faTrash,
  faFolder,
  faChevronRight,
  faBookmark,
  faPlus,
  faSearchPlus,
  faSearchMinus,
  faItalic,
  faBold,
  faTable,
  faLink,
  faCode,
  faPrint,
  faCog,
  faStrikethrough,
  faArchive,
  faTimes,
  farBookmark
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
