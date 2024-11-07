<template>
    <div class="navbar">
        <NuxtLink to="/">
            <div class="logo" id="green-logo">
                <img src="../assets/logo-green.png" alt="">
                <h1><span class="logo-text">Nuxt</span>Bazaar</h1>
            </div>
            <div class="logo" id="red-logo">
                <img src="../assets/logo-red.png" alt="">
                <h1><span class="logo-text">Nuxt</span>Bazaar</h1>
            </div>
            <div class="logo" id="blue-logo">
                <img src="../assets/logo-blue.png" alt="">
                <h1><span class="logo-text">Nuxt</span>Bazaar</h1>
            </div>
        </NuxtLink>
        <div class="list">
            <ul>
                <li>
                    <NuxtLink to="/bicycle">Bicycle</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/accessories">Accessories</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/ecycle">E-Cycles</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="searchbar">
            <!-- <form>
                <input type="text" placeholder="Enter Text.." name="search">
                <button type="submit" class="search-btn">Search</button>
            </form> -->
            <NuxtLink to="/cart"><i class="fa-solid fa-cart-shopping"></i></NuxtLink>
            <NuxtLink to="/wishlist"><i class="fa-solid fa-heart"></i></NuxtLink>
            <i class="fa-solid fa-circle-user" @click="toggleDropdown"></i>
        </div>
        <div class="dropdown-overlay" v-show="showDropdown" @click="toggleDropdown"></div>
        <div class="dropdown" v-show="showDropdown">
            <div class="user-icon">
                <i class="fa-solid fa-circle-user"></i>
            </div>
            <div class="user-info">
                <p>Username: {{ user.username }}</p>
                <p>Email: {{ user.email  }}</p>
            </div>
            <button class="log-btn" @click="logOut">Log out</button>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const showDropdown = ref(false);
        const user = ref({});
        const router = useRouter();

        function toggleDropdown() {
            showDropdown.value = !showDropdown.value;
        }

        onMounted(async () => {
            try {
                const response = await fetch('https://nuxtjs-backend.onrender.com/profile', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    user.value = await response.json();
                } else {
                    const data = await response.json();
                    alert(data.message || 'Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while fetching the profile');
            }
        });

        async function logOut() {
            try {
                const response = await fetch('https://nuxtjs-backend.onrender.com/logout', {
                    method: 'POST',
                    credentials: 'include'
                });

                if (response.ok) {
                    user.value = {}; // Clear the user data
                    alert('Logged out successfully');
                    router.push('/login');
                } else {
                    const data = await response.json();
                    alert(data.message || 'Failed to log out');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while logging out');
            }
        }

        return {
            showDropdown,
            toggleDropdown,
            user,
            logOut
        };
    }
};

</script>

<style>
.navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid var(--primary-color);
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    width: 50px;
    height: 45px;
    padding: 15px 15px 15px 0px;
}

.logo h1 {
    font-weight: 500;
    color: white;
}

.logo .logo-text {
    color: var(--primary-color);
}

.list ul {
    display: flex;
    justify-content: space-evenly;
    padding: 0px;
}

.list ul li {
    padding: 20px 30px;
    font-size: 20px;
}

.list ul li a {
    padding: 20px 5px;
    color: #fff;
}

.list ul li .router-link-active {
    color: var(--primary-color);
}


.list ul li .router-link-active:hover{
    text-shadow: none;
}

.list ul li a:hover {
    text-shadow: 1px 1px 2px var(--primary-color), 0 0 1em var(--primary-color), 0 0 0.2em var(--primary-color);
    cursor: pointer;
    transition: 0.5s ease;
}

.searchbar {
    padding: 30px 0px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.searchbar form {
    height: 30px;
    display: flex;
    align-items: center;
}

.searchbar form input {
    border: none;
    border-radius: 5px 0px 0px 5px;
    padding: 4px 8px;
    font-size: 14px;
    color: #fff;
    height: 100%;
    backdrop-filter: blur(9px) saturate(169%);
    -webkit-backdrop-filter: blur(9px) saturate(169%);
    background-color: rgba(17, 25, 40, 0.77);
    border: 1px solid rgba(255, 255, 255, 0.125);
}

.searchbar form .search-btn {
    border: none;
    cursor: pointer;
    border-radius: 0px 5px 5px 0px;
    background-color: var(--primary-color);
    color: #fff;
    padding: 4px 20px;
    height: 39.5px;
}

.searchbar .router-link-active i {
    color: var(--primary-color);
}

.searchbar i {
    font-size: 30px;
    cursor: pointer;
    margin-left: 20px;
    color: #fff;
    transition: 0.5s ease;
}

.searchbar i:hover {
    text-shadow: 1px 1px 2px var(--primary-color), 0 0 1em var(--primary-color), 0 0 0.2em var(--primary-color);
}


/* DROPDOWN */

.dropdown-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    /* Ensure the overlay appears below the dropdown */
}

.dropdown {
    font-family: var(--plus-jakarta-sans);
    text-align: center;
    font-size: 20px;
    padding: 40px 30px;
    backdrop-filter: blur(9px) saturate(169%);
    -webkit-backdrop-filter: blur(9px) saturate(169%);
    background-color: rgb(17, 25, 40);
    border: 1px solid rgba(255, 255, 255, 0.125);
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    /* Ensure the dropdown appears above other content */
}

.dropdown .user-icon i{
    font-size: 60px;
    margin: 15px;
}

.dropdown .user-info p {
    background-color: #020420;
    padding: 15px 40px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    margin: 10px 0px;
}

.dropdown button{
    border: none;
    cursor: pointer;
    border-radius: 8px;
    background-color: var(--primary-color);
    color: #fff;
    padding: 10px 40px;
    margin: 15px 0px;
    font-size: 18px;
}
</style>