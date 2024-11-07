<template>
    <div>
        <div class="info" v-if="product">
            <div class="product-card">
                <div class="product-image">
                    <img :src="getProductImageUrl(product)"
                        :class="{ redMask: product.product_type === 'accessories', blueMask: product.product_type === 'ecycle' }"
                        alt="">
                </div>
                <div class="product-details">
                    <div class="product-text">
                        <h1>{{ product.product_name }}</h1>
                        <p>{{ product.product_description }}</p>
                        <h2>₹{{ product.product_price }}</h2>
                    </div>
                    <div class="product-buttons">
                        <span
                            :class="{ redInfo: product.product_type === 'accessories', blueInfo: product.product_type === 'ecycle' }">
                            <i class="fa-solid fa-heart" id="pink-heart" v-if="isInWishlist(product._id)"
                                @click="toggleWishlist(product._id)"></i>
                            <i class="fa-solid fa-heart" v-else @click="toggleWishlist(product._id)"></i>
                             Wishlist</span>
                        <span
                            :class="{ redInfo: product.product_type === 'accessories', blueInfo: product.product_type === 'ecycle' }">
                            <i class="fa-solid fa-cart-shopping"></i> Add to cart</span>
                    </div>
                </div>
            </div>
            <div class="suggestions">
                <h1>View Similar Products</h1>
                <div class="scrolling-wrapper">
                    <div class="scroll-container-box" v-for="suggestion in filteredSuggestions" :key="suggestion._id">
                        <div class="upper-half">
                            <div class="scroll-container-img">
                                <img :src="getSuggestionImageUrl(suggestion)"
                                    :class="{ redMask: suggestion.product_type === 'accessories', blueMask: suggestion.product_type === 'ecycle' }"
                                    alt="">
                            </div>
                            <h3>₹{{ suggestion.product_price }}</h3>
                        </div>
                        <div class="lower-half">
                            <div id="scroll-container-info"
                                :class="{ scroll_green_info: suggestion.product_type === 'bicycle', scroll_red_info: suggestion.product_type === 'accessories', scroll_blue_info: suggestion.product_type === 'ecycle' }">
                                <i class="fa-solid fa-heart" id="pink-heart" v-if="isInWishlist(suggestion._id)" @click="toggleWishlist(suggestion._id)"></i>
                                <i class="fa-solid fa-heart" v-else @click="toggleWishlist(suggestion._id)"></i>
                                <h1>{{ suggestion.product_name }}</h1>
                                <i class="fa-solid fa-cart-shopping"></i>
                            </div>
                            <NuxtLink :to="{ name: 'info', query: { id: suggestion._id } }">
                                <div id="info-btn"
                                    :class="{ scroll_green_info_btn: suggestion.product_type === 'bicycle', scroll_red_info_btn: suggestion.product_type === 'accessories', scroll_blue_info_btn: suggestion.product_type === 'ecycle' }">
                                    More Info
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const product = ref(null);
        const suggestions = ref([]);
        const filteredSuggestions = ref([]);
        const route = useRoute();
        const wishlist = ref([]);

        const fetchProductDetails = async () => {
            const productId = route.query.id;
            try {
                const response = await axios.get(`https://nuxtjs-backend.onrender.com/products/${productId}`);
                product.value = response.data;
                fetchRelatedProducts();
                fetchWishlist(); // Fetch wishlist after getting the product details
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        const fetchRelatedProducts = async () => {
            const response = await axios.get('https://nuxtjs-backend.onrender.com/products');
            suggestions.value = response.data;
            filterSuggestions();
        };

        const filterSuggestions = () => {
            if (product.value) {
                const filtered = suggestions.value.filter(suggestion => suggestion.product_type === product.value.product_type);
                filteredSuggestions.value = filtered.slice(0, 5);
            }
        };

        const fetchWishlist = async () => {
            try {
                const response = await axios.get('https://nuxtjs-backend.onrender.com/wishlist', { withCredentials: true });
                wishlist.value = response.data;
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };

        const isInWishlist = (productId) => {
            return wishlist.value.some(product => product._id === productId);
        };

        const toggleWishlist = async (productId) => {
            if (isInWishlist(productId)) {
                alert('This product is already in your wishlist.');
                return;
            }

            try {
                await axios.post(`https://nuxtjs-backend.onrender.com/wishlist/${productId}`, {}, { withCredentials: true });
                wishlist.value.push(product.value); // Assuming the product is already available
                alert('Product added to wishlist');
            } catch (err) {
                alert('Failed to update wishlist');
            }
        };

        onMounted(fetchProductDetails);

        watch(route, () => {
            fetchProductDetails();
        });

         // Function to generate the image URL
         const getProductImageUrl = (product) => {
            return `${product.product_url}`; // Adjust this path if needed
        };

        const getSuggestionImageUrl = (suggestion) => {
            return `${suggestion.product_url}`; // Adjust this path if needed
        };


        return { product, fetchRelatedProducts, filteredSuggestions, isInWishlist, toggleWishlist, getProductImageUrl, getSuggestionImageUrl };
    },
};
</script>



<style>
#pink-heart {
    color: red;
}

.info {
    padding: 2vh 100px;
}

.info .product-card {
    margin: 20px 0px;
    backdrop-filter: blur(9px) saturate(169%);
    -webkit-backdrop-filter: blur(9px) saturate(169%);
    background-color: rgba(17, 25, 40, 0.77);
    border: 2px solid rgba(255, 255, 255, 0.125);
    border-radius: 10px;
    display: flex;
}

.info .product-card .product-image {
    width: 100%;
    margin: 20px;
    display: flex;
    align-items: center;
}

.product-image img {
    width: 100%;
    filter: drop-shadow(0 0 0.75rem var(--primary-color));
}

.product-image .redMask,
.scroll-container-img .redMask {
    filter: drop-shadow(0 0 0.75rem var(--primary-red));
}

.product-image .blueMask,
.scroll-container-img .blueMask {
    filter: drop-shadow(0 0 0.75rem var(--primary-blue));
}

.info .product-card .product-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.product-details .product-text {
    padding: 20px;
}

.product-text h1,
.product-text p,
.product-text h2 {
    margin-bottom: 20px;
}

.product-text h2 {
    font-size: 35px;
}

.product-details .product-buttons {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
}

.product-buttons span {
    width: 50%;
    background-color: var(--primary-color);
    font-size: 20px;
    font-weight: 500;
    padding: 10px 0px;
    cursor: pointer;
    transition: 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-buttons .blueInfo {
    background-color: var(--primary-blue);
}

.product-buttons .redInfo {
    background-color: var(--primary-red);
}

.product-buttons span i {
    padding: 10px;
}

.product-buttons span:hover {
    background-color: #00aa63;
}

.product-buttons .blueInfo:hover {
    background-color: #093da4;
}

.product-buttons .redInfo:hover {
    background-color: #870000;
}

.product-buttons span:first-child {
    border-radius: 10px 0px 0px 0px;
}

.product-buttons span:last-child {
    border-radius: 0px 0px 10px 0px;
    border-left: 2px solid #fff;
}

.product-buttons span img {
    width: 35px;
    height: 35px;
    padding: 0px 5px;
    transition: 0.5s ease;
}

/* SUGGESTION STYLES */

.suggestions {
    margin: 40px 0px;
}

.scrolling-wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}

.scrolling-wrapper .scroll-container-box {
    backdrop-filter: blur(9px) saturate(169%);
    -webkit-backdrop-filter: blur(9px) saturate(169%);
    background-color: rgba(17, 25, 40, 0.77);
    border: 2px solid rgba(255, 255, 255, 0.125);
    border-radius: 15px;
    transition: all 0.5s ease 0s;
    text-align: center;
    display: inline-block;
    margin: 10px;
    /* padding: 15px; */
}

.scroll-container-img {
    margin: 20px;
}

.scroll-container-img img {
    height: 20vh;
    width: 100%;
    border-radius: 15px;
    filter: drop-shadow(0 0 0.75rem var(--primary-color));
}

.scroll-container-box h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
    padding-bottom: 10px;

}

.scroll-container-box #scroll-container-info {
    padding: 20px 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}

.scroll-container-box .scroll_green_info,
.scroll-container-box .scroll_green_info_btn {
    background-color: var(--primary-color);
}

.scroll-container-box .scroll_red_info,
.scroll-container-box .scroll_red_info_btn {
    background-color: var(--primary-red);
}

.scroll-container-box .scroll_blue_info,
.scroll-container-box .scroll_blue_info_btn {
    background-color: var(--primary-blue);
}

#scroll-container-info h1 {
    font-size: 20px;
    text-transform: uppercase;
}

#scroll-container-info i {
    font-size: 30px;
    cursor: pointer;
    padding: 10px;
    color: var(--color-bg);
}

.scroll-container-box #info-btn {
    /* background-color: var(--primary-color); */
    border-radius: 0px 0px 15px 15px;
    font-size: 20px;
    padding: 15px 0px;
    border-top: 1px solid #fff;
    cursor: pointer;
    transition: 0.5s ease;
}

.scroll-container-box .scroll_green_info_btn:hover {
    background-color: #00aa63;
}

.scroll-container-box .scroll_red_info_btn:hover {
    background-color: #870000;
}

.scroll-container-box .scroll_blue_info_btn:hover {
    background-color: #093da4;
}
</style>