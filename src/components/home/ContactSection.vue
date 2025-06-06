<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '../../composables/useIntersectionObserver'

const { isVisible: isHeaderVisible, targetRef: headerRef } = useIntersectionObserver({ threshold: 0.2 })
const { isVisible: isFormVisible, targetRef: formRef } = useIntersectionObserver({ threshold: 0.1 })
const { isVisible: isInfoVisible, targetRef: infoRef } = useIntersectionObserver({ threshold: 0.1 })

// Form data
const form = ref({
  name: '',
  email: '',
  message: ''
})

// Form validation
const errors = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

// Validate form
const validateForm = () => {
  let isValid = true
  errors.value = {
    name: '',
    email: '',
    message: ''
  }
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
    isValid = false
  }
  
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }
  
  if (!form.value.message.trim()) {
    errors.value.message = 'Message is required'
    isValid = false
  }
  
  return isValid
}

// Submit form
const submitForm = () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  // Simulate form submission
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      message: ''
    }
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      isSubmitted.value = false
    }, 5000)
  }, 1500)
}

// Contact info
const contactInfo = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>`,
    title: 'Email',
    content: 'cintaavalenciaa@gmail.com',
    link: 'mailto:cintaavalenciaa@gmail.com'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>`,
    title: 'Phone',
    content: '+62 831 3194 3924',
    link: 'tel:+6283131943924'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>`,
    title: 'Location',
    content: 'Pekanbaru, Riau',
    link: null
  }
]
</script>

<template>
  <section :id="$attrs.id" class="section bg-neutral-50 dark:bg-neutral-800">
    <div class="container">
      <!-- Section header -->
      <div 
        ref="headerRef"
        class="text-center mb-16 transition-all duration-700 ease-out"
        :class="{ 'opacity-0 translate-y-8': !isHeaderVisible, 'opacity-100 translate-y-0': isHeaderVisible }"
      >
        <h2 class="text-3xl md:text-4xl font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
          Get In Touch
        </h2>
        <div class="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
        <p class="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Have a question or want to work together? Feel free to contact me!
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact form -->
        <div 
          ref="formRef"
          class="bg-white dark:bg-neutral-900 rounded-2xl shadow-soft p-8 transition-all duration-700 ease-out"
          :class="{ 'opacity-0 translate-y-8': !isFormVisible, 'opacity-100 translate-y-0': isFormVisible }"
        >
          <h3 class="text-2xl font-heading font-medium text-neutral-800 dark:text-neutral-100 mb-6">
            Send A Message
          </h3>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Name
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="input"
                :class="{ 'border-error-500': errors.name }"
                placeholder="Your name"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-error-500">{{ errors.name }}</p>
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="input"
                :class="{ 'border-error-500': errors.email }"
                placeholder="Your email"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-error-500">{{ errors.email }}</p>
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                class="input"
                :class="{ 'border-error-500': errors.message }"
                placeholder="Your message"
              ></textarea>
              <p v-if="errors.message" class="mt-1 text-sm text-error-500">{{ errors.message }}</p>
            </div>
            
            <button
              type="submit"
              class="btn-primary w-full"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else-if="isSubmitted">Message Sent!</span>
              <span v-else>Send Message</span>
            </button>
          </form>
        </div>
        
        <!-- Contact info -->
        <div 
          ref="infoRef"
          class="transition-all duration-700 ease-out"
          :class="{ 'opacity-0 translate-y-8': !isInfoVisible, 'opacity-100 translate-y-0': isInfoVisible }"
        >
          <h3 class="text-2xl font-heading font-medium text-neutral-800 dark:text-neutral-100 mb-8">
            Contact Information
          </h3>
          
          <div class="space-y-8 mb-12">
            <div 
              v-for="(item, index) in contactInfo" 
              :key="index"
              class="flex items-start"
            >
              <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                <span v-html="item.icon"></span>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-neutral-800 dark:text-neutral-100">
                  {{ item.title }}
                </h4>
                <a 
                  v-if="item.link" 
                  :href="item.link"
                  class="text-neutral-600 hover:text-primary-500 dark:text-neutral-300 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {{ item.content }}
                </a>
                <p v-else class="text-neutral-600 dark:text-neutral-300">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Social media links -->
          <h4 class="text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-4">
            Follow Me
          </h4>
          
          <div class="flex space-x-4">
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
            
            <a 
              href="https://github.com/cintavalencia" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a 
              href="https://instagram.com/cintaavalencia" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>