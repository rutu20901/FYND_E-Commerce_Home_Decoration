<template>
  <div id="page-wrap"> 
    
    <ProductsGrid :products="products" />
  </div>
</template>
<script>
import axios from 'axios';
import ProductsGrid from '../components/ProductsGrid.vue'

export default{
    name:'ProductPage',
    components:{
      ProductsGrid,
      
    },
    data(){
    return{
        products:[],
      };   
    },
    async created() {
      const result = await axios.get('/api/products');
      const products = result.data;
      this.products = products; 
    }
}
</script>
