<template>
    <div>
      <form @submit.prevent="uploadImage">
        <input type="file" @change="onFileChange" />
        <button type="submit">Upload Image</button>
      </form>
  
      <div v-if="product.image">
        <img :src="`data:image/jpeg;base64,${product.image}`" alt="Product Image" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  
  export default {
    setup() {
      const product = ref({});
      const file = ref(null);
  
      const onFileChange = (e) => {
        file.value = e.target.files[0];
      };
  
      const uploadImage = async () => {
        const formData = new FormData();
        formData.append('image', file.value);
        try {
          const response = await axios.post(`https://nuxtjs-backend.onrender.com/upload/${product.value._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          alert('Image uploaded successfully');
          product.value.image = (await axios.get(`https://nuxtjs-backend.onrender.com/products/${product.value._id}`)).data.image;
        } catch (error) {
          alert('Failed to upload image');
        }
      };
  
      return { product, onFileChange, uploadImage };
    }
  };
  </script>
  