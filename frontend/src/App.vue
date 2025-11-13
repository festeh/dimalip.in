<template>
  <div class="hero">
    <h1 class="hero-text">Hi, I'm Dima</h1>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Catppuccin Mocha gradient */
  background: linear-gradient(
    135deg,
    #1e1e2e 0%,    /* Base */
    #313244 25%,   /* Surface0 */
    #45475a 50%,   /* Surface1 */
    #585b70 75%,   /* Surface2 */
    #313244 100%   /* Surface0 */
  );

  /* Animated gradient */
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero-text {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: #cdd6f4; /* Catppuccin Mocha Text */
  text-align: center;
  letter-spacing: -0.02em;

  /* Subtle text shadow for depth */
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2);

  /* Smooth fade-in animation */
  animation: fadeIn 1.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
