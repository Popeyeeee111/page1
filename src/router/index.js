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
  },
  {
    path: '/test2',
    name: 'test2',
    component: ()=>import('@/views/TestStore.vue')
  },
  {
    path: '/fruit',
    name: 'fruit',
    component: ()=>import('@/views/AboutView.vue')
  },
  {
    path: '/professor',
    name: 'professor',
    component: ()=>import('@/views/query/professor-query.vue')
  },
  {
    path: '/fruit',
    name: 'fruit',
    component: ()=>import('@/views/query/fruit-query.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局守卫配置
// router.beforeEach((to, from, next) => {
//   if(to.name==='home') {
//     // 在此处完成setPinia
//
//   }
// })

export default router
