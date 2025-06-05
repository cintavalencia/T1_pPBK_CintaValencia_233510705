<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '../../stores/theme'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

// Check if route is active
const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path === path
}

// Handle scrolling for navbar background
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Smooth scroll to section on home page
const scrollToSection = (sectionId) => {
  isMobileMenuOpen.value = false
  
  if (route.path !== '/') {
    router.push({ path: '/', hash: sectionId })
  } else {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// Set up scroll event listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Toggle theme
const toggleTheme = () => {
  themeStore.toggleTheme()
}

// Navigation items
const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' }
]
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled || isMobileMenuOpen 
        ? 'bg-white dark:bg-neutral-900 shadow-soft' 
        : 'bg-transparent'
    ]"
  >
    <div class="container py-4 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="text-2xl font-heading font-semibold text-primary-600 dark:text-primary-400">
        Portfolio
      </router-link>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <template v-for="item in navItems" :key="item.name">
          <router-link 
            v-if="item.path" 
            :to="item.path"
            class="text-neutral-700 hover:text-primary-500 dark:text-neutral-200 dark:hover:text-primary-400 transition-colors duration-200"
            :class="{ 'text-primary-500 dark:text-primary-400': isActive(item.path) }"
          >
            {{ item.name }}
          </router-link>
          <button 
            v-else
            @click="scrollToSection(item.id)"
            class="text-neutral-700 hover:text-primary-500 dark:text-neutral-200 dark:hover:text-primary-400 transition-colors duration-200"
          >
            {{ item.name }}
          </button>
        </template>
        
        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          <svg v-if="themeStore.isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </nav>
      
      <!-- Mobile Menu Toggle -->
      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen" 
        class="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 shadow-soft-lg border-t border-neutral-100 dark:border-neutral-800"
    >
      <div class="container py-4 flex flex-col space-y-4">
        <template v-for="item in navItems" :key="item.name">
          <router-link 
            v-if="item.path" 
            :to="item.path"
            class="block py-2 text-neutral-700 hover:text-primary-500 dark:text-neutral-200 dark:hover:text-primary-400 transition-colors duration-200"
            :class="{ 'text-primary-500 dark:text-primary-400': isActive(item.path) }"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
          <button 
            v-else
            @click="scrollToSection(item.id)"
            class="block py-2 text-left w-full text-neutral-700 hover:text-primary-500 dark:text-neutral-200 dark:hover:text-primary-400 transition-colors duration-200"
          >
            {{ item.name }}
          </button>
        </template>
        
        <!-- Theme Toggle -->
        <div class="flex items-center justify-between py-2">
          <span class="text-neutral-700 dark:text-neutral-200">Toggle theme</span>
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            <svg v-if="themeStore.isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>