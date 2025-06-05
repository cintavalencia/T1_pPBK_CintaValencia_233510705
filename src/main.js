import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import PortfolioView from './views/PortfolioView.vue'

// Create pinia store
const pinia = createPinia()

// Create router
const routes = [
  { 
    path: '/', 
    component: HomeView,
    meta: { title: 'Home' }
  },
  { 
    path: '/portfolio', 
    component: PortfolioView,
    meta: { title: 'Portfolio' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update document title based on route
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Portofolio` : 'Portfolio'
})

// Create and mount the app
createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')