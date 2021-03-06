import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faStar,
  faHeart,
  faEye,
  faStickyNote,
  faTrash,
  faFolder,
  faFolderOpen,
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
  faTimes,
  faInfoCircle,
  faDatabase,
  faChartLine,
  faCalendarAlt,
  faHdd,
  faBookOpen,
  faPalette
} from '@fortawesome/free-solid-svg-icons'

import {
  faBookmark as farBookmark
} from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

library.add(
  faStar,
  faHeart,
  faEye,
  faStickyNote,
  faTrash,
  faFolder,
  faFolderOpen,
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
  faInfoCircle,
  faDatabase,
  faChartLine,
  faBookOpen,
  faCalendarAlt,
  faHdd,
  farBookmark,
  faPalette
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
