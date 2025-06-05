<script setup>
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '../composables/useIntersectionObserver'
import ProjectCard from '../components/portfolio/ProjectCard.vue'

const { isVisible, targetRef } = useIntersectionObserver()

// Filter categories
const categories = ['All', 'Web', 'Design']
const activeCategory = ref('All')

// Project data
const projects = [
  {
    id: 1,
    title: 'Minimalist E-commerce Website',
    description: 'A clean and modern e-commerce platform designed for a boutique clothing brand.',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Web',
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    id: 2,
    title: 'Health & Wellness Mobile App',
    description: 'A mobile application for tracking fitness goals, nutrition, and meditation practices.',
    image: 'https://images.pexels.com/photos/4339970/pexels-photo-4339970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Mobile',
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    id: 3,
    title: 'Creative Agency Portfolio',
    description: 'A dynamic portfolio website showcasing the work and services of a creative agency.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Web',
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    id: 4,
    title: 'Restaurant Booking System',
    description: 'An online reservation system for a high-end restaurant with table management features.',
    image: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Web',
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    id: 5,
    title: 'Photography Portfolio',
    description: 'A beautiful portfolio website designed for a professional photographer with gallery features.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Web',
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    id: 6,
    title: 'Personal Finance Dashboard',
    description: 'An interactive dashboard for tracking personal finances, expenses, and investments.',
    image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Web',
    githubUrl: '#',
    demoUrl: '#'
  }
];


// Filter projects based on active category
const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects
  }
  return projects.filter(project => project.category === activeCategory.value)
})

// Set active category
const setCategory = (category) => {
  activeCategory.value = category
}
</script>

<template>
  <div class="pt-24 md:pt-32 pb-16">
    <div class="container">
      <!-- Header -->
      <div 
        ref="targetRef"
        :class="{ 'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible }"
        class="text-center mb-12 transition-all duration-700 ease-out"
      >
        <h1 class="text-4xl md:text-5xl font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
          My Portfolio
        </h1>
        <p class="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          A collection of my creative work and projects. Browse through to see my skills and expertise.
        </p>
      </div>
      
      <!-- Filter Buttons -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="category in categories"
          :key="category"
          @click="setCategory(category)"
          class="px-6 py-2 rounded-full transition-all duration-300"
          :class="activeCategory === category 
            ? 'bg-primary-500 text-white shadow-md' 
            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'"
        >
          {{ category }}
        </button>
      </div>
      
      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>