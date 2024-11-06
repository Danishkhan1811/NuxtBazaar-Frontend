<template>
    <div class="page-box">
        <div class="login-container">
            <div class="banner">
                <img src="../assets/logo-full.png" alt="">
            </div>
            <div class="main-section">
                <div class="slider">
                    <span @click="currentForm = 'login'" :class="{ activeForm: currentForm === 'login' }">Login</span>
                    <span @click="currentForm = 'signup'" :class="{ activeForm: currentForm === 'signup' }">Signup</span>
                </div>
                <div class="login" v-if="currentForm === 'login'">
                    <h1>Login</h1>
                    <form @submit.prevent="login">
                        <label for="loginEmail">E-Mail</label>
                        <input id="loginEmail" v-model="loginEmail" type="text" required>
                        <label for="loginPassword">Password</label>
                        <input id="loginPassword" v-model="loginPassword" type="password" required>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div class="signup" v-if="currentForm === 'signup'">
                    <h1>Signup</h1>
                    <form @submit.prevent="signup">
                        <label for="signupUsername">Username</label>
                        <input id="signupUsername" v-model="signupUsername" type="text" required>
                        <label for="signupEmail">E-Mail</label>
                        <input id="signupEmail" v-model="signupEmail" type="text" required>
                        <label for="signupPassword">Password</label>
                        <input id="signupPassword" v-model="signupPassword" type="password" required>
                        <button type="submit">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const currentForm = ref('login');
const loginEmail = ref('');
const loginPassword = ref('');
const signupUsername = ref('');
const signupEmail = ref('');
const signupPassword = ref('');
const router = useRouter();

async function login() {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loginEmail.value, password: loginPassword.value }),
            credentials: 'include'  // Ensure cookies are included in requests
        });

        if (response.ok) {
            router.push('/');
        } else {
            const data = await response.json();
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
}

async function signup() {
    try {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signupUsername.value, email: signupEmail.value, password: signupPassword.value }),
            credentials: 'include'  // Ensure cookies are included in requests
        });

        if (response.ok) {
            alert('Signup successful');
            currentForm.value = 'login';
        } else {
            const data = await response.json();
            alert(data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during signup');
    }
}
</script>

<style>
.page-box {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-container {
    display: flex;
    gap: 20px;
    width: 60%;
    height: 70vh;
    padding: 20px;
    border-radius: 8px;
    backdrop-filter: blur(9px) saturate(169%);
    -webkit-backdrop-filter: blur(9px) saturate(169%);
    background-color: rgba(17, 25, 40, 0.77);
    border: 2px solid rgba(254, 254, 254, 0.238);
}

.page-box .login-container .banner {
    width: 50%;
}

.banner img {
    width: 100%;
    height: 100%;
}

.page-box .login-container .main-section {
    padding: 10px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}


.main-section .slider {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    border: 3px solid rgba(255, 255, 255, 0.238);
    border-radius: 5px;
}

.main-section .slider span {
    width: 50%;
    text-align: center;
    /* border-radius: 5px;
    background-color: var(--primary-color);*/
    cursor: pointer;
    padding: 5px 0px;
}

.main-section .slider .activeForm {
    border-radius: 5px;
    background-color: var(--primary-color);
    cursor: pointer;
}

.page-box .main-section .login,
.page-box .main-section .signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.main-section .login form,
.main-section .signup form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.main-section .login form label,
.main-section .signup form label {
    width: 100%;
    font-size: 20px;
    margin: 10px 0px 0px 0px;
    text-align: left;
}

.main-section .login form input,
.main-section .signup form input {
    margin: 10px 0px;
    width: 95%;
    padding: 4px 10px;
    font-size: 14px;
    color: #fff;
    border-radius: 5px;
    backdrop-filter: blur(9px) saturate(169%);
    -webkit-backdrop-filter: blur(9px) saturate(169%);
    background-color: rgba(17, 25, 40, 0.77);
    border: 2px solid rgba(254, 254, 254, 0.238);
}

form button {
    padding: 10px 40px;
    margin: 30px 0px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background-color: var(--primary-color);
    color: #fff;
    font-size: 16px;
    font-weight: 600;
}
</style>