<template>
    <div class="order-history">
        <h1>Order History</h1>
        <div v-if="loading">Loading...</div>
        <div class="order" v-else-if="orders.length === 0">No orders found.</div>
        <div v-else>
            <div v-for="order in orders" :key="order._id" class="order">
                <!-- <h2>Order ID: {{ order._id }}</h2> -->
                <div v-for="item in order.items" :key="item._id">
                    {{ item.product.product_name }} - Quantity: {{ item.quantity }}
                </div>
                <h2><span class="green-text">Total Amount: </span>₹{{ order.totalAmount }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const orders = ref([]);
        const loading = ref(false);
        const error = ref(null);

        const fetchOrders = async () => {
            loading.value = true;
            try {
                const response = await axios.get('http://localhost:5000/orders', { withCredentials: true });
                orders.value = response.data.reverse();
                loading.value = false;
            } catch (err) {
                error.value = err.message;
                loading.value = false;
            }
        };

        onMounted(fetchOrders);

        return { orders, loading, error };
    }
};
</script>


<style>
.order-history {
    margin: 3vh 0vh;
}

.order-history .order {
    margin: 20px 0px;
    padding: 20px;
    backdrop-filter: blur(9px) saturate(169%);
    -webkit-backdrop-filter: blur(9px) saturate(169%);
    background-color: rgba(17, 25, 40, 0.77);
    border: 2px solid rgba(255, 255, 255, 0.125);
    border-radius: 15px;
}

.order .green-text {
    color: var(--primary-color);
}
</style>