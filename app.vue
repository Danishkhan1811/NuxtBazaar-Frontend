<template>
    <div class="app">
        <Navbar v-if="!isLoginPage"
            :class="{ greenNav: !isEcyclePage && !isAccPage, blueNav: isEcyclePage, redNav: isAccPage }" />
        <div :class="{ page: isBicyclePage || isEcyclePage || isAccPage }">
            <!-- <Sidebar id="app-sidebar"
                :class="{ bicycleSidebar: isBicyclePage, ecycleSidebar: isEcyclePage, accSidebar: isAccPage }"
                v-if="isBicyclePage || isEcyclePage || isAccPage" /> -->
            <NuxtPage :class="{ productPage: isBicyclePage || isEcyclePage || isAccPage }" />
        </div>
        <Footer v-if="!isLoginPage"
            :class="{ bicycleFooter: isBicyclePage, ecycleFooter: isEcyclePage, accFooter: isAccPage }" />
    </div>
</template>

<script setup>
const route = useRoute()
const isLoginPage = computed(() => route.fullPath == '/login');
const isBicyclePage = computed(() => route.fullPath == '/bicycle');
const isAccPage = computed(() => route.fullPath == '/accessories');
const isEcyclePage = computed(() => route.fullPath == '/ecycle');
// const isHomePage = computed(() => route.fullPath == '/');
// const isCartPage = computed(() => route.fullPath == '/cart');
// const isInfoPage = computed(() => route.fullPath == '/info');
// const isWishlistPage = computed(() => route.fullPath == '/wishlist');
</script>

<style>
.page {
    min-width: 100%;
    display: flex;
    justify-content: center;
}

.productPage {
    padding: 0px 90px 100px 90px;
    width: 100%;
}

/* #app-sidebar {
    width: 7%;
} */

.bicycleSidebar h1 {
    color: var(--primary-color);
}

.ecycleSidebar h1 {
    color: var(--primary-blue);
}

.accSidebar h1 {
    color: var(--primary-red);
}


/* NAVBAR COLOR CHANGE */

.greenNav #blue-logo,
.greenNav #red-logo {
    display: none;
}

.blueNav #green-logo,
.blueNav #red-logo {
    display: none;
}

.blueNav {
    border-bottom: 1px solid var(--primary-blue);
}

.blueNav .logo .logo-text,
.blueNav .list ul li .router-link-active {
    color: var(--primary-blue);
}

.blueNav .searchbar form .search-btn {
    background-color: var(--primary-blue);
}

.redNav #green-logo,
.redNav #blue-logo {
    display: none;
}

.redNav {
    border-bottom: 1px solid var(--primary-red);
}

.redNav .logo .logo-text,
.redNav .list ul li .router-link-active {
    color: var(--primary-red);
}

.redNav .searchbar form .search-btn {
    background-color: var(--primary-red);
}

/* --------------------------- */


.bicycleFooter {
    background-color: var(--primary-color);
}

.ecycleFooter {
    background-color: var(--primary-blue);
}

.accFooter {
    background-color: var(--primary-red);
}
</style>
