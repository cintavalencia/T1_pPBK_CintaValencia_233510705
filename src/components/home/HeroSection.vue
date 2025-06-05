<script setup>
import { useIntersectionObserver } from '../../composables/useIntersectionObserver'

const { isVisible, targetRef } = useIntersectionObserver()

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="..."/></svg>`
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="..."/></svg>`
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="..."/></svg>`
  }
]

const scrollToAbout = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section 
    :id="$attrs.id"
    class="min-h-screen flex items-center relative overflow-hidden pt-16"
  >
    <!-- Background Gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-neutral-900 -z-10"></div>

    <div class="container max-w-7xl mx-auto px-4">
      <div 
        ref="targetRef"
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out"
        :class="{ 'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible }"
      >
        <!-- Text content -->
        <div class="text-center lg:text-left">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-6">
            <span class="block">Hi, I'm</span>
            <span class="text-primary-600 dark:text-primary-400">Cinta Valencia</span>
          </h1>
          <p class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-8">
            Web Designer & UI/UX Designer. Crafting intuitive, responsive, and user-centered digital experiences.
          </p>

          <!-- Buttons -->
          <div class="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <button @click="scrollToAbout" class="btn-primary">
              About Me
            </button>
          </div>

          <!-- Social Icons -->
          <div class="flex justify-center lg:justify-start space-x-6">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors duration-200"
              :aria-label="social.name"
            >
              <span v-html="social.icon"></span>
            </a>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="flex justify-center">
          <div class="relative">
            <div class="absolute -inset-4 bg-primary-200/50 dark:bg-primary-800/30 rounded-full -z-10"></div>
            <img
              src="../../assets/images/palen.jpg"
              alt="Jessica Parker"
              class="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white dark:border-neutral-800 shadow-soft-lg"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <button 
        @click="scrollToAbout" 
        class="p-2 rounded-full bg-white dark:bg-neutral-800 shadow-soft"
        aria-label="Scroll down"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </div>
  </section>
</template>
