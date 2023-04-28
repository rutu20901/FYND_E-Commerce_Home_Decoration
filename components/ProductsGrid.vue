<template>
    <div class="grid-wrap">
        
        <ProductsGridItem />
    </div>

</template>
<script>
import ProductsGridItem from './ProductsGridItem.vue';
export default{
    name:'ProductsGrid',
    props:['products'],
    components:{
        ProductsGridItem,
    },
};
</script>
<style scoped>

</style>