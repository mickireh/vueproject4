import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Guide from '../views/Guide.vue'
import GuideNew from '../views/GuideNew.vue'
import WeatherApp from '../views/WeatherApp.vue'
import Edit from '../views/Edit.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/guide',
    name: 'Guide',
    component: Guide
  },
  {
    path: '/guidenew',
    name: 'GuideNew',
    component: GuideNew
  },
  {
    path: '/guide/edit/:guideId',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/weatherapp',
    name: 'WeatherApp',
    component: WeatherApp
  }
]

const router = new VueRouter({
  routes
})

export default router
