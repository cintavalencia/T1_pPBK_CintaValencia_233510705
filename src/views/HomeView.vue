<script setup>
import { ref } from 'vue'
import HeroSection from '../components/home/HeroSection.vue'
import AboutSection from '../components/home/AboutSection.vue'
import ContactSection from '../components/home/ContactSection.vue'
</script>

<template>
  <div>
    <HeroSection id="home" />
    <AboutSection id="about" />
    <ContactSection id="contact" />
  </div>
</template>