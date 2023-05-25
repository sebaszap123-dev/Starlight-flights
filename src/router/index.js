import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, FlightsView } from '../views/views'
import { SignIn, SignUp, Dashboard } from '../views/auth/auth'

import { auth } from '../firebase';
import CrudFlights from '../views/auth/CrudFlights.vue';
import CrudAccomodations from '../views/auth/CrudAccomodations.vue';
import FavoritesView from '../views/auth/FavoritesView.vue'
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
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'dash',
          component: Dashboard,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'flights',
          name: 'FlightsDash',
          component: CrudFlights,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'hotels',
          name: 'HotelsDash',
          component: CrudAccomodations,
          meta: {
            requiresAuth: true,
          },
        }
      ]
    },
  ]
})

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return !!auth.currentUser; // Verifica si hay un usuario autenticado
};

// Guard de navegación
router.beforeEach((to, from, next) => {
  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Verifica si el usuario está autenticado
    if (isAuthenticated()) {
      // El usuario está autenticado, permite el acceso a la ruta
      next();
      return;
    } else {
      // El usuario no está autenticado, redirecciona a la página de inicio de sesión
      next('/login'); // Reemplaza '/login' con la ruta de inicio de sesión en tu proyecto
      return;
    }
  } else {
    // La ruta no requiere autenticación, permite el acceso sin restricciones
    next();
    return;
  }
});


export default router
