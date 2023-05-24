import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, FlightsView, GetVerification } from '../views/views'
import { SignIn, SignUp, Dashboard } from '../views/auth/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/flights',
      name: 'Flights',
      component: FlightsView
    },
    {
      path: '/login',
      name: 'login',
      children: [
        {
          path: '',
          name: 'sign_in',
          component: SignIn,
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/verification',
      name: 'Verification',
      component: GetVerification
    }
  ]
})

export default router
