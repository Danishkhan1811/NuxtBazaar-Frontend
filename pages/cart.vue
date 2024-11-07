<template>
    <div class="cart">
        <div class="full-cart" v-if="cartItems.length > 0">
            <div class="cart-row-items">
                <div class="cart-product-card" v-for="item in cartItems" :key="item.product._id">
                    <div class="cart-product-image">
                        <img src="../public/product9.png"
                            :class="{ redMask: item.product.product_type === 'accessories', blueMask: item.product.product_type === 'ecycle' }"
                            alt="">
                    </div>
                    <div class="cart-product-details">
                        <div class="cart-product-text">
                            <h1>{{ item.product.product_name }}</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolorem in unde quod
                                natus aperiam expedita a, quisquam asperiores accusantium odit nihil debitis fugiat,
                                consequuntur sapiente maxime eligendi, temporibus perferendis.</p>
                            <div class="confirm">
                                <h2>₹{{ item.product.product_price }} x {{ item.quantity }}</h2>
                                <h2>Total: ₹{{ item.product.product_price * item.quantity }}</h2>
                                <button @click="decrementFromCart(item.product._id)"
                                    :class="{ greenbtn: item.product.product_type === 'bicycle', 
                                              redbtn: item.product.product_type === 'accessories', 
                                              bluebtn: item.product.product_type === 'ecycle' }">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-confirmation">
                <h2>Grand Total: ₹{{ calculateTotal() }}</h2>
                <h2> >>> </h2>
                <button @click="confirmOrder" class="confirm-order-btn">Confirm Order</button>
            </div>
        </div>
        <div class="empty-cart" v-else>
            <h1><i class="fa-solid fa-circle-exclamation"></i> It's so empty here! Kuch to order karle bhai</h1>
        </div>
        <orderHistory />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const cartItems = ref([]);
        const loading = ref(false);
        const error = ref(null);

        const fetchCartItems = async () => {
            loading.value = true;
            try {
                const response = await axios.get('https://nuxtjs-backend.onrender.com/cart', { withCredentials: true });
                cartItems.value = response.data;
                loading.value = false;
            } catch (err) {
                error.value = err.message;
                loading.value = false;
            }
        };

        const decrementFromCart = async (productId) => {
            try {
                await axios.put(`https://nuxtjs-backend.onrender.com/cart/${productId}`, {}, { withCredentials: true });
                const item = cartItems.value.find(item => item.product._id === productId);
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cartItems.value = cartItems.value.filter(item => item.product._id !== productId);
                }
                alert('Product quantity updated in cart');
            } catch (err) {
                alert('Failed to update product quantity in cart');
            }
        };

        const confirmOrder = async () => {
            try {
                const response = await axios.post('https://nuxtjs-backend.onrender.com/order', {}, { withCredentials: true });
                alert('Order confirmed!');
                cartItems.value = []; // Clear the cart after order confirmation
            } catch (err) {
                alert('Failed to confirm order');
            }
        };

        const calculateTotal = () => {
            return cartItems.value.reduce((total, item) => total + item.product.product_price * item.quantity, 0);
        };

        onMounted(fetchCartItems);

        return { cartItems, loading, error, decrementFromCart, confirmOrder, calculateTotal };
    },
};
</script>

<style>
.cart {
    padding: 2vh 12vh;
}

.cart-row-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(600px, auto));
    grid-gap: 2rem;
    margin: 20px 0px 60px 0px;
}

.cart .cart-product-card {
    backdrop-filter: blur(9px) saturate(169%);
    -webkit-backdrop-filter: blur(9px) saturate(169%);
    background-color: rgba(17, 25, 40, 0.77);
    border: 2px solid rgba(255, 255, 255, 0.125);
    border-radius: 10px;
    display: flex;
    max-width: 660px;
}

.cart .cart-product-card .cart-product-image {
    width: 100%;
    margin: 20px;
    display: flex;
    align-items: center;
}

.cart-product-image img {
    width: 100%;
    filter: drop-shadow(0 0 0.75rem var(--primary-color));
}

.cart-product-image .redMask {
    filter: drop-shadow(0 0 0.75rem var(--primary-red));
}

.cart-product-image .blueMask {
    filter: drop-shadow(0 0 0.75rem var(--primary-blue));
}

.cart .cart-product-card .cart-product-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cart-product-details .cart-product-text {
    padding: 20px;
}

.cart-product-text h1 {
    font-size: 22px;
}

.cart-product-text p {
    font-size: 14px;
    margin-top: 20px;
}

.cart-product-text h2 {
    font-size: 22px;
}

.cart-product-text .confirm {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

.cart-product-text .confirm button {
    color: #fff;
    padding: 5px 25px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.5s ease;
}

.confirm .greenbtn {
    background: var(--primary-color);
}

.confirm .redbtn {
    background: var(--primary-red);
}

.confirm .bluebtn {
    background: var(--primary-blue);
}

.confirm .greenbtn:hover {
    background-color: #00aa63;
}

.confirm .redbtn:hover {
    background-color: #870000;
}

.confirm .bluebtn:hover {
    background-color: #093da4;
}


.order-confirmation {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
}

.order-confirmation h2 {
    padding: 0px 35px 0px 0px;
}

.order-confirmation button {
    background: var(--primary-color);
    color: #fff;
    padding: 5px 55px;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    transition: 0.5s ease;
}

.order-confirmation button:hover{
    background-color: #00aa63;
}

.empty-cart {
    margin: 6vh 0vh;
    padding: 20vh 6vh;
    display: flex;
    justify-content: center;
    text-align: center;
    backdrop-filter: blur(9px) saturate(169%);
    -webkit-backdrop-filter: blur(9px) saturate(169%);
    background-color: rgba(17, 25, 40, 0.77);
    border: 2px solid rgba(255, 255, 255, 0.125);
    border-radius: 15px;
}
</style>


<!-- 
<template>
    <div class="cart">
        <div class="cart-row-items">
            <div class="cart-product-card" v-for="item in cartItems" :key="item.product._id">
                <div class="cart-product-image">
                    <img src="../assets/product3.png" alt="">
                </div>
                <div class="cart-product-details">
                    <div class="cart-product-text">
                        <h1>{{ item.product.product_name }}</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolorem in unde quod
                            natus
                            aperiam expedita a, quisquam asperiores accusantium odit nihil debitis fugiat,
                            consequuntur
                            sapiente
                            maxime eligendi, temporibus perferendis.
                        </p>
                        <div class="confirm">
                            <h2>₹{{ item.product.product_price }} x {{ item.quantity }}</h2>
                            <p>Total: ₹{{ item.product.product_price * item.quantity }}</p>
                            <button @click="removeFromCart(item.product._id)">Remove</button>
                        </div>
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
        const cartItems = ref([]);
        const loading = ref(false);
        const error = ref(null);

        const fetchCartItems = async () => {
            loading.value = true;
            try {
                const response = await axios.get('https://nuxtjs-backend.onrender.com/cart', { withCredentials: true });
                cartItems.value = response.data;
                loading.value = false;
            } catch (err) {
                error.value = err.message;
                loading.value = false;
            }
        };

        const removeFromCart = async (productId) => {
            try {
                await axios.delete(`https://nuxtjs-backend.onrender.com/cart/${productId}`, { withCredentials: true });
                cartItems.value = cartItems.value.filter(item => item.product._id !== productId);
                alert('Product removed from cart');
            } catch (err) {
                alert('Failed to remove product from cart');
            }
        };

        onMounted(fetchCartItems);

        return { cartItems, loading, error, removeFromCart };
    },
};
</script> -->
