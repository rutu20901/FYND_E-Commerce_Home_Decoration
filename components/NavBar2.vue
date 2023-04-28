<template>
    
        <div class="btn-group">
            <div v-if="category == null" class="btn-category">
                <button 
                    v-for="category in categories"
                    :key="category"
                    :class="{ active: category === selectedCategory }"
                    @click="selectCategory(category)"
                >
                {{ category }}
                </button>
            </div>
            
            <button id="btn-all"
                    :class="{ active: !selectedCategory }"
                    @click="selectCategory('')"
                    >
                    All categories
            </button>
            
            <div class="btn-pro">
            <div class="all">
                <div class="product-item" v-for="product in filteredProducts" :key="product._id">
                    <img  v-bind:src="product.imageUrl">
                    <h3 class="product-name">{{ product.name }}</h3>
                    <p class="product-price">${{ product.price }}</p>
                    <router-link v-bind:to="'/products/' + product.id">
                        <button>View Details</button>
                    </router-link>
                </div>
            </div>
            </div>
            
            
        </div>
    

        
   
</template>
<script>
import axios from 'axios';
export default{
    name:'NavBar2',
    props:['product'],
    data(){
        return{
            products:[],
            filteredProducts:[],
            selectedCategory: '',
            categories:[],
        };
    },
    methods: {
    async getProducts() {
      const response = await axios.get('/api/products');
      this.products = response.data;
      this.categories = [...new Set(this.products.map((product) => product.category))];
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.filterProducts();
    },
    filterProducts() {
      this.filteredProducts = this.selectedCategory
        ? this.products.filter((product) => product.category === this.selectedCategory)
        : this.products;
    },
  },
  async mounted() {
    await this.getProducts();
    this.filterProducts();
    },
        
};
        
       


    
    </script>
    <style scoped>
    
    button{
        padding: 0.6rem 1rem;
        font-size: 1rem;
        background-color: white;
        color: black;
        outline: none;
        border: 1px solid black;
       width: auto;
       border-radius: 25px;
        cursor: pointer;
        margin-left: 1rem;
      }
      button:hover{
        background-color: black;
        color: white;
      }

      .btn-group{
        width:125%,
      }

      .btn-category{
        margin-left: -14rem;
        margin-top: 1.5rem;
      }
    
      .con{
        margin-top: 1rem;
      }
      #btn-all{
        float: right;
        margin-top:-2.3rem;
        margin-right: 11rem;
      }

      .all{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 2%;
        margin-top: 2rem;
      }

      .product-item{
        display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: calc(33.33% - 10px);
      }

      img{
        height: 210px;
        width: 210px;
      }
    
    </style>