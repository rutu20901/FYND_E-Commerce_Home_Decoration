<template>
    <div id="page-wrap">
        <h1>Shopping Cart</h1>
        <hr>
        <ProductList 
        :products="cartpage"
        v-on:remove-from-cart="removeFromCart($event)"
         />
       <h3 id="total-price">Total: ${{ totalPrice }}</h3>
       <router-link to="/shipping">
            <button id="checkout-button">Proceed to checkout </button>
       </router-link>
</div>
    
</template>
<script>
import axios from 'axios';
import ProductList from '../components/ProductList.vue';

export default{
    name:'CartPage',
    components:{
      ProductList,
    },
    data(){
        return{
            cartpage:[],
        }
    },
    computed:{
        totalPrice(){
            return this.cartpage.reduce(
                (sum,item) => sum + Number(item.price),
                0,
            ); 
        }
    },
    methods:{
      async removeFromCart(productId){
        const result = await axios.delete(`/api/users/12345/cart/${productId}`);
        this.cartpage = result.data;
      }
    },
    async created() { 
      const result = await axios.get(`/api/users/12345/cart`);
      const cartpage = result.data;
      this.cartpage = cartpage; 
    }
};
</script>
<style scoped>

hr{
    width: 60%;
    border: 2px solid black;
}

.page-wrap{
    text-align: center;
}

button{
    padding: 0.6rem 1rem;
    font-size: 1rem;
    background-color: black;
    color: white;
    outline: none;
    border: 1px solid black;
    width: 40%;
    border-radius: 6px;
    cursor: pointer;
    height: 10%;

  }
  button:hover{
    background-color: white;
    color: black;
  }

  .product-container {
    align-content: 'center';
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 10px;
    width: 60%;
    margin-left: 15rem;
  }

  .product-image {
    flex: 1;
    height: 100px;
    max-width: 100px;
  }

  .details-wrap {
    padding: 0 16px;
    flex: 3;
  }

  .remove-button {
    flex: 1;
    margin: auto;
  }

</style>