<template>
    <section class="footer">
        <div class="custom-shape">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                preserveAspectRatio="none">
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    class="shape-fill" fill="#020420" fill-opacity="1"></path>
            </svg>
        </div>
       <div class="footer-inner">
        <div class="footer-content">
            <div class="footer-row">
                <h2><span class="dark-text">Quick</span> Links</h2>
                <p><NuxtLink to="/">Home</NuxtLink></p>
                <p><NuxtLink to="/bicycle">Bicycles</NuxtLink></p>
                <p><NuxtLink to="/accessories">Accessories</NuxtLink></p>
                <p><NuxtLink to="/ecycle">E-Cycles</NuxtLink></p>
            </div>
            <div class="footer-row">
                <h2><span class="dark-text">Contact</span> Info</h2>
                <p>98 West 21th Street</p>
                <p>New York NY 10016</p>
                <p>+1(123)-456-7890</p>
                <p>DanishKhan@Gmail.com</p>
            </div>
            <div class="footer-row">
                <h2><span class="dark-text">Social</span> Handles</h2>
                <p>Instagram</p>
                <p>Twitter</p>
                <p>Facebook</p>
                <p>Github</p>
            </div>
        </div>
        <div class="footer-logo">
            <img src="../assets/logo-light.png" alt="">
            <h1><span class="dark-text">Nuxt</span> Bazaar</h1>
        </div>
       </div>
    </section>
</template>

<style>
.footer {
    background-color: var(--primary-color);
}

.footer .footer-inner{
    display: flex;
    justify-content: space-between;
    padding: 50px 140px 80px 140px;
}

.footer .footer-content {
    display: flex;
    justify-content: start;
    gap: 15vh;
}

.footer .footer-content h2 {
    font-size: 30px;
}

.footer .footer-content p {
    font-size: 20px;
}

.footer .footer-content p a{
    color: #fff;
}

.footer .footer-content p .router-link-active{
    color: var(--color-bg);
}

.footer-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer-logo img {
    height: 70%;
    width: 70%;
}

.footer-logo h1 {
    font-size: 35px;
}

.dark-text{
    color: var(--color-bg);
}
</style>