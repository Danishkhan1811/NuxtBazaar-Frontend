<template>
    <div class="container">
        <div class="row-items">
            <div class="container-box" v-for="product in filteredProducts" :key="product._id">
                <div class="upper-half">
                    <div class="container-img">
                        <!-- <img src="../assets/bicycle/product1.png" alt=""> -->
                        <img :src="getProductImageUrl(product)" alt="">
                        <!-- <img :src="`../assets/bicycle/${product.product_url}`" alt=""> -->
                    </div>
                </div>
                <div class="lower-half">
                    <h3>₹{{ product.product_price }}</h3>
                    <div class="container-info">
                        <i class="fa-solid fa-heart" id="pink-heart" v-if="isInWishlist(product._id)"></i>
                        <i class="fa-solid fa-heart" v-else @click="toggleWishlist(product._id)"></i>
                        <h1>{{ product.product_name }}</h1>
                        <i class="fa-solid fa-cart-shopping" @click="addToCart(product._id)"></i>
                    </div>
                    <NuxtLink :to="{ name: 'info', query: { id: product._id } }">
                        <div class="info-btn">
                            More Info
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const products = ref([]);
        const loading = ref(false);
        const error = ref(null);
        const wishlist = ref([]);

        onMounted(async () => {
            loading.value = true;
            try {
                const response = await axios.get('https://nuxtjs-backend.onrender.com/products');
                products.value = response.data;

                // Fetch wishlist
                const wishlistResponse = await axios.get('https://nuxtjs-backend.onrender.com/wishlist', { withCredentials: true });
                wishlist.value = wishlistResponse.data;

                loading.value = false;
                filterProducts(); // Filter products after fetching data
            } catch (err) {
                error.value = err.message;
                loading.value = false;
            }
        });

        const filteredProducts = ref([]);

        // Filter products for bicycles
        const filterProducts = () => {
            filteredProducts.value = products.value.filter(product => product.product_type === 'bicycle');
        };

        // Check if product is in wishlist
        const isInWishlist = (productId) => {
            return wishlist.value.some(product => product._id === productId);
        };

         // Function to generate the image URL
         const getProductImageUrl = (product) => {
            return `${product.product_url}`; // Adjust this path if needed
        };

        // Toggle wishlist (add/remove)
        const toggleWishlist = async (productId) => {
            if (isInWishlist(productId)) {
                alert('This product is already in your wishlist.');
                return;
            }

            try {
                await axios.post(`https://nuxtjs-backend.onrender.com/wishlist/${productId}`, {}, { withCredentials: true });
                wishlist.value.push(products.value.find(product => product._id === productId));
                alert('Product added to wishlist');
            } catch (err) {
                alert('Failed to update wishlist');
            }
        };

        // Add to Cart
        const addToCart = async (productId) => {
            try {
                const quantity = 1; // You can customize this as needed
                await axios.post(`https://nuxtjs-backend.onrender.com/cart/${productId}`, { quantity }, { withCredentials: true });
                alert('Product added to cart');
            } catch (err) {
                alert('Failed to add product to cart');
            }
        };

        return { filteredProducts, loading, error, toggleWishlist, isInWishlist, addToCart, getProductImageUrl };
    },
};
</script>



<style>

#pink-heart {
    color: rgb(255, 0, 43);
}

.row-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, auto));
    grid-gap: 2rem;
    padding: 25px 0;
}

.container-box {
    backdrop-filter: blur(9px) saturate(169%);
    -webkit-backdrop-filter: blur(9px) saturate(169%);
    background-color: rgba(17, 25, 40, 0.77);
    border: 2px solid rgba(255, 255, 255, 0.125);
    border-radius: 15px;
    transition: all 0.5s ease 0s;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* padding: 15px; */
}

.container-img {
    margin: 20px;
}

.container-img img {
    /* height: 24vh; */
    width: 90%;
    border-radius: 15px;
    filter: drop-shadow(0 0 0.75rem var(--primary-color));
}

.container-box h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
    padding-bottom: 10px;

}

.container-box .container-info {
    background-color: var(--primary-color);
    /* border-radius: 0px 0px 15px 15px; */
    padding: 20px 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}

.container-info h1 {
    font-size: 20px;
    text-transform: uppercase;
}

.container-info i {
    font-size: 30px;
    cursor: pointer;
    padding: 10px;
    color: var(--color-bg);
}

.container-box .info-btn {
    background-color: var(--primary-color);
    border-radius: 0px 0px 15px 15px;
    font-size: 20px;
    padding: 15px 0px;
    border-top: 1px solid #fff;
    cursor: pointer;
    transition: 0.5s ease;
}

.container-box .info-btn:hover {
    background-color: #00aa63;
}
</style>