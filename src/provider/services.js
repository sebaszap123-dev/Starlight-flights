import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '../router';
export const useUser = defineStore('user', () => {
    const user = ref({ "userData": null, "admin": false })

    const verifiedUser = () => {
        router.push('/dashboard')
    }

    return {
        user, verifiedUser
    }
});
