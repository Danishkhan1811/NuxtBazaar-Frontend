<template>
    <div class="wish-container">
        <h1>Your Wishlist</h1>
        <div class="wish-row-items">
            <div class="wish-container-box" v-for="product in wishlist" :key="product._id">
                <div class="upper-half">
                    <div class="wish-container-img">
                        <img :src="getProductImageUrl(product)"
                            :class="{ redMask: product.product_type === 'accessories', blueMask: product.product_type === 'ecycle' }"
                            alt="">
                    </div>
                    <h3>₹{{ product.product_price }}</h3>
                </div>
                <div id="lower-half"
                    :class="{ green: product.product_type === 'bicycle', red: product.product_type === 'accessories', blue: product.product_type === 'ecycle' }">
                    <div class="wish-container-info">
                        <h1>{{ product.product_name }}</h1>
                    </div>
                    <div class="actions">
                        <NuxtLink class="info-btn" :to="{ name: 'info', params: { id: product._id } }">
                            <div id="info-btn">
                                More Info
                            </div>
                        </NuxtLink>
                        <span @click="removeFromWishlist(product._id)"><i
                                class="fa-solid fa-trash"></i></span>
                    </div>
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
        const wishlist = ref([]);
        const loading = ref(false);
        const error = ref(null);

        onMounted(async () => {
            loading.value = true;
            try {
                const response = await axios.get('http://localhost:5000/wishlist', { withCredentials: true });
                wishlist.value = response.data;
                loading.value = false;
            } catch (err) {
                error.value = err.message;
                loading.value = false;
            }
        });

         // Function to generate the image URL
         const getProductImageUrl = (product) => {
            return `${product.product_url}`;
        };

        const removeFromWishlist = async (productId) => {
            try {
                await axios.delete(`http://localhost:5000/wishlist/${productId}`, { withCredentials: true });
                wishlist.value = wishlist.value.filter(product => product._id !== productId);
                alert('Product removed from wishlist');
            } catch (err) {
                alert('Failed to remove product from wishlist');
            }
        };

        return { wishlist, loading, error, removeFromWishlist, getProductImageUrl };
    },
};
</script>


<style>
.wish-container {
    padding: 3vh 12vh 10vh;
}

.wish-row-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, auto));
    grid-gap: 2rem;
    padding: 25px 0;
}

.wish-container-box {
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
    max-width: 400px;
    /* padding: 15px; */
}

.wish-container-img {
    margin: 20px;
}

.wish-container-img img {
    height: 20vh;
    width: 100%;
    border-radius: 15px;
    filter: drop-shadow(0 0 0.75rem var(--primary-color));
}

.wish-container-img .redMask {
    filter: drop-shadow(0 0 0.75rem var(--primary-red));
}

.wish-container-img .blueMask {
    filter: drop-shadow(0 0 0.75rem var(--primary-blue));
}

.wish-container-box h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
    padding-bottom: 10px;

}

#lower-half {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0px 0px 15px 15px;
}

.green {
    background-color: var(--primary-color);
}

.red {
    background-color: var(--primary-red);
}

.blue {
    background-color: var(--primary-blue);
}

.wish-container-box .wish-container-info {
    /* border-radius: 0px 0px 15px 15px; */
    padding: 20px 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}

.wish-container-info h1 {
    font-size: 20px;
    text-transform: uppercase;
}

#lower-half .actions{
    border-top: 1px solid #fff;
    display: flex;
    justify-content: center;
}


#lower-half .info-btn {
    font-size: 20px;
    padding: 15px 0px;
    cursor: pointer;
    transition: 0.5s ease;
    width: 50%;
    border-radius: 0px 0px 0px 15px;
}


#lower-half .info-btn:hover {
    background-color: #15161680;
}

#lower-half span {
    border-radius: none;
    border-left: 1px solid #fff;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 15px 0px;
    cursor: pointer;
}

#lower-half span:hover {
    background-color: #15161680;
    transition: 0.5s ease;
}
</style>
