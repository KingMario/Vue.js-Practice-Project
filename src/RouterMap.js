import Passengers from './components/Passengers'
import Services from './components/Services'
import Confirm from './components/Confirm'

export default {
  '/': {
    component: Passengers
  },
  '/services': {
    component: Services
  },
  '/confirm': {
    component: Confirm
  }
}
