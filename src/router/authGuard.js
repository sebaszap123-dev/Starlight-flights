import { auth } from '../firebase';
import router from './index';

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
        } else {
            // El usuario no está autenticado, redirecciona a la página de inicio de sesión
            next('/login'); // Reemplaza '/login' con la ruta de inicio de sesión en tu proyecto
        }
    } else {
        // La ruta no requiere autenticación, permite el acceso sin restricciones
        next();
    }
});
