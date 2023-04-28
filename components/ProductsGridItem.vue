<template>
  <NavBar2/>
   
  
</template>
<script>
import NavBar2 from '../components/NavBar2.vue';
export default{
    name: 'ProductsGridItem',
    props:['product'],
    components:{
      NavBar2,
    },
    
}
</script>

<style scoped>


button{
  padding: 0.6rem 1rem;
  font-size: 1rem;
  background-color: black;
  color: white;
  outline: none;
  border: 1px solid black;
 width: auto;
 border-radius: 6px;
  cursor: pointer;
}
button:hover{
  background-color: white;
  color: black;
}

</style>