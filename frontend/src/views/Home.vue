<template>
  <div class="hero">
    <div class="hero-content">
      <h1 class="hero-text">Hi, I'm Dima</h1>
      <p class="hero-subtext">here's some cool stuff</p>
    </div>
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

  /* Static darker purple gradient for better text visibility */
  background: linear-gradient(
    135deg,
    #1e1e2e 0%,    /* Base */
    #2d2b55 25%,   /* Dark purple */
    #3d3a6e 50%,   /* Medium purple */
    #2d2b55 75%,   /* Dark purple */
    #1e1e2e 100%   /* Base */
  );
}

.hero-content {
  text-align: center;
}

.hero-text {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: #cdd6f4; /* Catppuccin Mocha Text */
  letter-spacing: -0.02em;
  margin: 0;

  /* Subtle text shadow for depth */
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2);

  /* Smooth fade-in animation */
  animation: fadeIn 1.5s ease-out;
}

.hero-subtext {
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 400;
  color: #bac2de; /* Catppuccin Mocha Subtext1 */
  margin-top: 1rem;
  letter-spacing: 0.02em;

  /* Delayed fade-in animation */
  animation: fadeIn 1.5s ease-out 0.3s both;
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
