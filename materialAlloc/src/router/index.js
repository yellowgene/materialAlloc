import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Warehouse from '@/views/Warehouse.vue';
import List from '@/views/List.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/warehouse',
      name: 'warehouse',
      component: Warehouse
    },
    {
      path: '/list',
      name: 'materialList',
      component: List
    },
  ]
})

export default router
