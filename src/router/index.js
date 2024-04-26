import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView},
  { path: '/about', name: 'about', component: function () {return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')}},
  { path: '/personal', name: 'personal', component: function () {return import(/* webpackChunkName: "about" */ '../views/Personal.vue')}},
  {
    path: '/test',
    name: 'test',
    component: () => import( '@/views/Test.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
