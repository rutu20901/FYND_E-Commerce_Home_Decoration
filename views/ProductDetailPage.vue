<template>
    <div class="grid-wrap" v-if="product">
        <div class="img-grid">
            <img v-bind:src="product.imageUrl">
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">${{ product.price }}</h3>
            <p>Average Rating: {{ product.averageRating }}</p>
            <button 
            id="add-to-cart"
            v-if="!itemIsCart && !showSuccessMessage"
            v-on:click="addToCart"
            class="green-button"
            >Add to cart</button>
            <button 
            id="add-to-cart"
            v-if="!itemIsCart && showSuccessMessage"
            class="green-button"
            >Successfully added item to cart!</button>
            <button 
            id="add-to-cart"
            v-if="itemIsCart"
            class="grey-button"
            >Item is already in cart</button>
            <h4>Description</h4>
            <p>{{ product.description }}</p>
        </div>
    </div>
    <NotFoundPage v-else/>
</template>
<script>
import axios from 'axios';
import {NotFoundPage} from './NotFoundPage';
export default{
    name:'ProductDetailPage',
    components:{
        NotFoundPage,
    },
    data(){
        return{
            product:{},
            cartpage:[],
            showSuccessMessage:false,
        };
    },
    computed:{
        itemIsCart(){
            return this.cartpage.some(item => item.id === this.product.id)

        }
    },
    methods:{
        async addToCart(){
            await axios.post('/api/users/12345/cart' ,{
                productId: this.$route.params.id ,
            });
            this.showSuccessMessage = true;
            setTimeout(() => {
                this.$router.push('/products');
            }, 1500);
            
        },
    },
    async created(){
        const { data:product } = await axios.get(`/api/products/${this.$route.params.id}`);
        this.product = product;

        const { data: cartpage } = await axios.get('/api/users/12345/cart')
        this.cartpage = cartpage;
    }
}
</script>
<style scoped>
.grid-wrap{
    width: 40%;
    border: 1px solid rgb(202, 198, 198);
    border-radius: 5px;
    margin: 0 0 0 23rem;
}
img{
    width: 80%;
    height: 80%;
}
h1{
    font-family: math;
    font-weight: 600;
    color: black;
    font-size: 2rem;
}
h3{
    font-family: math;
    font-weight: 600;
    color: black;
    font-size: 2.5rem;
    margin: -0.5rem 0 0 0;
}
button{
    padding: 0.6rem 1rem;
    font-size: 1rem;
    background-color: black;
    color: white;
    outline: none;
    border: 1px solid black;
   width: 50%;
   border-radius: 6px;
    cursor: pointer;
  }
  button:hover{
    background-color: white;
    color: black;
  }
p{
    color: grey;
    font-size: 1rem;
}

p{
    width: 50%;
    text-align:center;
    margin-left: 8rem;
}
.green-button{
    background-color: green;;
}

.grey-button{
    background-color: #888;
}
</style>