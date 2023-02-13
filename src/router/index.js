import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import ContactIndex from '../pages/contact-index.vue'
import ContactDetails from '../pages/contact-details.vue'
import Stats from '../pages/stats.vue'
import ContactEdit from '../pages/contact-edit.vue'
import LoginSignup from '../pages/login-signup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/contact',
      component: ContactIndex
    },
    {
      path: '/contact/:_id',
      component: ContactDetails
    },
    {
      path: '/stats',
      component: Stats
    },
    {
      path: '/contact/edit/:_id?',
      component: ContactEdit
    },
    {
      path: '/signup',
      component: LoginSignup
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutView.vue')
    }
  ]
})

export default router
