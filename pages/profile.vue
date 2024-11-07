<template>
    <div>
        <h1>User Profile</h1>
        <div v-if="user">
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const user = ref(null);

        const fetchUser = async () => {
            try {
                const response = await fetch('https://nuxtjs-backend.onrender.com/profile', {
                    credentials: 'include' // Ensure cookies are sent with the request
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                user.value = data;
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(fetchUser);

        return {
            user
        };
    }
};
</script>

<style></style>