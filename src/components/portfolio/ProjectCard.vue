<script setup>
import { useIntersectionObserver } from '../../composables/useIntersectionObserver'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const { isVisible, targetRef } = useIntersectionObserver({ threshold: 0.1 })
</script>

<template>
  <div 
    ref="targetRef"
    class="group bg-white dark:bg-neutral-900 rounded-2xl shadow-soft overflow-hidden transition-all duration-700 ease-out"
    :class="{ 'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible }"
  >
    <!-- Project image -->
    <div class="relative overflow-hidden aspect-[4/3]">
      <img 
        :src="project.image" 
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      
      <!-- Overlay with links -->
      <div class="absolute inset-0 bg-primary-500/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a 
          v-if="project.githubUrl"
          :href="project.githubUrl" 
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-primary-500 hover:bg-neutral-100 transition-colors duration-200"
          aria-label="View GitHub repository"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        
        <a 
          :href="project.demoUrl" 
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-primary-500 hover:bg-neutral-100 transition-colors duration-200"
          aria-label="View live demo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
      <!-- Category badge -->
      <div class="absolute top-4 left-4 px-3 py-1 bg-white dark:bg-neutral-800 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 shadow-soft">
        {{ project.category }}
      </div>
    </div>
    
    <!-- Project info -->
    <div class="p-6">
      <h3 class="text-xl font-heading font-medium text-neutral-800 dark:text-neutral-100 mb-2">
        {{ project.title }}
      </h3>
      
      <p class="text-neutral-600 dark:text-neutral-300">
        {{ project.description }}
      </p>
    </div>
  </div>
</template>