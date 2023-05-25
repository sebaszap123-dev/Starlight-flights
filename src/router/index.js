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
      component: SignIn,
    },
    {
      path: '/sign_up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/verification',
      name: 'Verification',
      component: GetVerification
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})

export default router
