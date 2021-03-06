import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue'

const routes: Array<any> = [
{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/list/:type',
  name: 'List',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/List.vue')
},
{
  path: '/detail/:id',
  name: 'Detail',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue')
},
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
