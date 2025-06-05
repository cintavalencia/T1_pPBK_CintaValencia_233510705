<script setup>
import { useIntersectionObserver } from '../../composables/useIntersectionObserver'

const { isVisible: isHeaderVisible, targetRef: headerRef } = useIntersectionObserver({ threshold: 0.2 })
const { isVisible: isContentVisible, targetRef: contentRef } = useIntersectionObserver({ threshold: 0.1 })
const { isVisible: isTimelineVisible, targetRef: timelineRef } = useIntersectionObserver({ threshold: 0.1 })

// Skills data (tanpa Responsive Design & UI/UX Design)
const skills = [
  { name: 'HTML5', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Vue.js', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Tailwind CSS', image: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
  { name: 'Figma', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
]
</script>


<template>
  <section :id="$attrs.id" class="section bg-white dark:bg-neutral-900">
    <div class="container">
      <!-- Section header -->
      <div 
        ref="headerRef"
        class="text-center mb-16 transition-all duration-700 ease-out"
        :class="{ 'opacity-0 translate-y-8': !isHeaderVisible, 'opacity-100 translate-y-0': isHeaderVisible }"
      >
        <h2 class="text-3xl md:text-4xl font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
          About Me
        </h2>
        <div class="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
        <p class="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          I'm a passionate web designer and ui/ux designer with a love for creating beautiful, functional websites.
        </p>
      </div>

      <!-- Bio and skills -->
      <div 
        ref="contentRef"
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 transition-all duration-700 ease-out"
        :class="{ 'opacity-0 translate-y-8': !isContentVisible, 'opacity-100 translate-y-0': isContentVisible }"
      >
        <!-- Bio -->
        <div class="space-y-6">
          <h3 class="text-2xl font-heading font-medium text-neutral-800 dark:text-neutral-100">
            My Story
          </h3>
          <p class="text-neutral-600 dark:text-neutral-300">
            I’m an Informatics Engineering student with a strong passion for web design and UI/UX development. I specialize in crafting user-centered interfaces that are not only visually appealing but also functional and responsive across devices.
          </p>
          <p class="text-neutral-600 dark:text-neutral-300">
            I combine technical skills with creative design thinking to build digital solutions that not only look beautiful but also perform exceptionally well. My approach emphasizes clean code, intuitive interfaces, and attention to detail.
          </p>
          <p class="text-neutral-600 dark:text-neutral-300">
            When I'm not coding, you'll find me exploring new design trends, attending tech conferences, or enjoying outdoor photography.
          </p>
        </div>

        <!-- Skills -->
        <div>
          <h3 class="text-2xl font-heading font-medium text-neutral-800 dark:text-neutral-100 mb-6">
            My Skills
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div
              v-for="skill in skills"
              :key="skill.name"
              class="flex flex-col items-center space-y-2"
            >
              <img
                :src="skill.image"
                :alt="skill.name"
                class="w-12 h-12 object-contain"
              />
              <span class="text-sm font-medium text-neutral-700 dark:text-neutral-200 text-center">
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div
        ref="timelineRef"
        class="transition-all duration-700 ease-out"
        :class="{ 'opacity-0 translate-y-8': !isTimelineVisible, 'opacity-100 translate-y-0': isTimelineVisible }"
      >
        <h3 class="text-2xl font-heading font-medium text-neutral-800 dark:text-neutral-100 text-center mb-12">
       
        </h3>
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800 transform md:-translate-x-0.5"></div>
          <!-- Timeline items -->
          <div class="space-y-12">
            <div
              v-for="(item, index) in timeline"
              :key="index"
              class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            >
              <div class="absolute left-3 md:left-1/2 top-0 w-6 h-6 bg-white dark:bg-neutral-900 border-4 border-primary-500 rounded-full transform -translate-x-1/2"></div>

              <!-- Left column -->
              <div
                class="md:text-right pl-12 md:pl-0"
                :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'"
              >
                <div v-if="index % 2 === 0" class="hidden md:block">
                  <h4 class="text-xl font-heading font-medium text-neutral-800 dark:text-neutral-100">{{ item.title }}</h4>
                  <p class="text-primary-600 dark:text-primary-400 font-medium">{{ item.company }}</p>
                  <p class="text-neutral-600 dark:text-neutral-300 mt-2">{{ item.description }}</p>
                </div>
                <div v-else class="md:hidden">
                  <h4 class="text-xl font-heading font-medium text-neutral-800 dark:text-neutral-100">{{ item.title }}</h4>
                  <p class="text-primary-600 dark:text-primary-400 font-medium">{{ item.company }}</p>
                  <p class="text-neutral-600 dark:text-neutral-300 mt-2">{{ item.description }}</p>
                </div>
                <div v-if="index % 2 !== 0" class="hidden md:block">
                  <p class="text-lg font-medium text-neutral-700 dark:text-neutral-300">{{ item.year }}</p>
                </div>
                <div v-else class="md:hidden">
                  <p class="text-lg font-medium text-neutral-700 dark:text-neutral-300 mt-2">{{ item.year }}</p>
                </div>
              </div>

              <!-- Right column -->
              <div
                class="pl-12 md:pl-0"
                :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1 md:text-right'"
              >
                <div v-if="index % 2 !== 0" class="hidden md:block">
                  <h4 class="text-xl font-heading font-medium text-neutral-800 dark:text-neutral-100">{{ item.title }}</h4>
                  <p class="text-primary-600 dark:text-primary-400 font-medium">{{ item.company }}</p>
                  <p class="text-neutral-600 dark:text-neutral-300 mt-2">{{ item.description }}</p>
                </div>
                <div v-else class="hidden md:block">
                  <p class="text-lg font-medium text-neutral-700 dark:text-neutral-300">{{ item.year }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
