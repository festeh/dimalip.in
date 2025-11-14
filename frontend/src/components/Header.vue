<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/" class="logo">Home</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 2rem;
  backdrop-filter: blur(10px);
  background-color: rgba(30, 30, 46, 0.8); /* Catppuccin Mocha Base with transparency */
  border-bottom: 1px solid rgba(137, 180, 250, 0.1);
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #cdd6f4; /* Catppuccin Mocha Text */
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo:hover {
  color: #89b4fa; /* Catppuccin Mocha Blue */
}

.nav-link {
  color: #bac2de; /* Catppuccin Mocha Subtext1 */
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #89b4fa; /* Catppuccin Mocha Blue */
}

.nav-link.router-link-active {
  color: #89b4fa;
}
</style>
