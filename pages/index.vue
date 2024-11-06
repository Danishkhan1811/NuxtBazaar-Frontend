<template>
    <div class="index-page">
        <Dice/>
        <section class="hero">
            <div class="hero-text">
                <h1>Ride into Adventure: Explore the World <br> on Two Wheels</h1>
                <p>Discover the thrill of cycling with our expertly curated <br> collection of bikes, gear, and tips
                    for every level of rider</p>
                <!-- <NuxtLink to="/login">
                    <button>Sign Up</button>
                </NuxtLink> -->
            </div>
            <div class="hero-img">
                <img src="../assets/hero.png" alt="">
            </div>
        </section>


        <section class="about">
            <div class="custom-shape">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                    preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        class="shape-fill" fill="#020420" fill-opacity="1"></path>
                </svg>
            </div>
            <div class="about-content">
                <div class="about-img">
                    <img src="../assets/logo-full.png" alt="">
                </div>
                <div class="about-text">
                    <h1>About <span style="color: #fff;">us</span></h1>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat facilis repudiandae mollitia
                        unde
                        dolore qui saepe provident! Impedit vero ducimus voluptatem libero ad error enim accusantium
                        aperiam
                        suscipit? Fugit, atque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
                        facilis
                        repudiandae mollitia unde
                        dolore qui saepe provident! Impedit vero ducimus voluptatem libero ad error enim accusantium
                        aperiam
                        suscipit? Fugit, atque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
                        facilis
                        repudiandae mollitia unde
                        dolore qui saepe provident! Impedit vero ducimus voluptatem libero ad error enim accusantium
                        aperiam
                        suscipit? Fugit, atque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
                        facilis
                        repudiandae mollitia unde
                        dolore qui saepe provident! Impedit vero ducimus voluptatem libero ad error enim accusantium.
                    </p>
                </div>
            </div>
        </section>

        <section class="trending">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                preserveAspectRatio="none">
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    class="shape-fill" fill="#00DC82" fill-opacity="1"></path>
            </svg>
            <div class="trending-container">
                <h1>Our Most Loved Products</h1>
                <div class="trending-row-items">
                    <div class="trending-container-box">
                        <div class="trending-container-img">
                            <img src="../assets/product1.png" alt="">
                        </div>
                        <h3>Product Name</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, eos sint? Necessitatibus
                            sapiente aperiam amet obcaecati voluptatibus eum culpa illo laboriosam alias facilis
                            architecto
                            dicta ipsam, officiis consectetur corrupti recusandae.</p>
                    </div>
                    <div class="trending-container-box">
                        <div class="trending-container-img">
                            <img src="../assets/product2.png" alt="">
                        </div>
                        <h3>Product Name</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, eos sint? Necessitatibus
                            sapiente aperiam amet obcaecati voluptatibus eum culpa illo laboriosam alias facilis
                            architecto
                            dicta ipsam, officiis consectetur corrupti recusandae.</p>
                    </div>
                    <div class="trending-container-box">
                        <div class="trending-container-img">
                            <img src="../assets/product3.png" alt="">
                        </div>
                        <h3>Product Name</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, eos sint? Necessitatibus
                            sapiente aperiam amet obcaecati voluptatibus eum culpa illo laboriosam alias facilis
                            architecto
                            dicta ipsam, officiis consectetur corrupti recusandae.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
.hero {
    display: flex;
    justify-content: space-around;
    gap: 10vh;
    /* align-items: center; */
    padding: 12vh 140px;
}

.hero .hero-text {
    text-align: right;
}

.hero .hero-text h1 {
    font-size: 56px;
    margin: 0px;
}

.hero .hero-text p {
    font-size: 20px;
}

.hero .hero-text button {
    border: none;
    cursor: pointer;
    border-radius: 8px;
    background-color: var(--primary-color);
    color: #fff;
    padding: 10px 40px;
    margin: 15px 0px;
    font-size: 18px;
}

.hero .hero-img {
    padding: 0px 80px;
}

/* ABOUT US CSS */
.about {
    background-color: var(--primary-color);
}

.about .about-content {
    display: flex;
    justify-content: space-around;
    gap: 10vh;
    /* align-items: center; */
    padding: 12vh 140px;
}

.about-content .about-img img {
    width: 70vh;
}

.about-content .about-text h1 {
    font-size: 70px;
    margin: 0px;
    color: var(--color-bg);
}

.about-content .about-text p {
    font-size: 20px;
    font-weight: 500;
    color: var(--color-bg);
    text-align: justify;
}


/* TRENDING SECTION */
.trending h1 {
    text-align: center;
    font-size: 7vh;
}

.trending-container {
    padding: 12vh 140px;
}

.trending-row-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, auto));
    grid-gap: 2rem;
    padding: 25px 0;
}

.trending-container-box {
    backdrop-filter: blur(9px) saturate(169%);
    -webkit-backdrop-filter: blur(9px) saturate(169%);
    background-color: rgba(17, 25, 40, 0.77);
    border: 2px solid rgba(255, 255, 255, 0.125);
    border-radius: 15px;
    transition: all 0.5s ease 0s;
    cursor: pointer;
    padding-bottom: 15px;
    text-align: center;
    padding: 15px;
}

.trending-container-img {
    margin: 10px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.125);
}

.trending-container-img img {
    height: 25vh;
    width: 80%;
    border-radius: 15px;
    cursor: pointer;
}


.trending-container-box h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
}


.trending-container-box p {
    font-size: 16px;
    margin: 10px 0px;
}
</style>