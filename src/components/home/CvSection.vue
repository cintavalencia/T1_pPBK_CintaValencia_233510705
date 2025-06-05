<script setup>
import { useIntersectionObserver } from '../../composables/useIntersectionObserver'

const { isVisible, targetRef } = useIntersectionObserver()

// Download CV function
const downloadCV = () => {
  // In a real application, this would trigger a file download
  alert('CV download would start here. In a real app, this would download a PDF file.')
}
</script>

<template>
  <section :id="$attrs.id" class="section bg-white dark:bg-neutral-900">
    <div class="container">
      <div 
        ref="targetRef"
        class="max-w-3xl mx-auto text-center transition-all duration-700 ease-out"
        :class="{ 'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible }"
      >
        <div class="bg-primary-50 dark:bg-primary-900/20 p-8 md:p-12 rounded-2xl shadow-soft">
          <h2 class="text-3xl md:text-4xl font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-6">
            My Curriculum Vitae
          </h2>
          
          <p class="text-neutral-600 dark:text-neutral-300 mb-8">
            Download my CV to learn more about my experience, skills, and qualifications. Feel free to reach out if you have any questions!
          </p>
          
        </div>
      </div>
    </div>
  </section>
</template>