<template>
  <div>
    <Header />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<style>
/* Global styles can go here if needed */
</style>
