<template>
    <div class="product-container">
    <img class="product-image" :src="product.imageUrl">
    <div class="details-wrap">
       <h3> {{ product.name }}</h3>
       <p>${{ product.price }}</p>
    </div>
    <button
     class="remove-button"
     v-on:click="$emit('remove-from-cart',product.id)"
     >Remove from Cart</button>
    </div>
</template>
<script>
export default{
    name:'ProductListItem',
    props:['product'],
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