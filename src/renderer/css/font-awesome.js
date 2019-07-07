import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faStickyNote, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStar, faStickyNote, faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)
