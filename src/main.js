import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import RouterMap from './RouterMap'

Vue.use(VueRouter)

var router = new VueRouter({
  linkActiveClass: 'active'
})
router.map(RouterMap)

router.start(App, 'app')
