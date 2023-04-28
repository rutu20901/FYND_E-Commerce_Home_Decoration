import { createRouter, createWebHistory } from 'vue-router'
import ProductPage from '../views/ProductPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';
import CartPage from '../views/CartPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import userShipping from '../views/userShipping.vue';

//Vue.use(VueRouter)
const routes = [
  {
    path:'/products',
    name:'Products',
    component:ProductPage,
  },
  {
    path:'/products/:id',
    name:'ProductsDetail',
    component:ProductDetailPage,
  },
  {
    path:'/cart',
    name:'cart',
    component:CartPage,
  },
  {
    path:'/',
    redirect:'products',
  },
  {
    path: '/:pathMatch(.*)*',
    component:NotFoundPage,
    name: 'NotFoundPage'
  },
  {
    path:'/shipping',
    name:'userShipping',
    component:userShipping
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
