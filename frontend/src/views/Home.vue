<template>
  <div class="home-page">
    <section class="visualizations">
      <div class="section-heading">
        <h1 class="greeting">Hi, I'm Dima</h1>
        <p class="subgreeting">here's some cool stuff</p>
      </div>

      <VisualizationCards />
    </section>
  </div>
</template>

<script setup lang="ts">
import VisualizationCards from '../components/VisualizationCards.vue'
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #1e1e2e 0%,
    #2d2b55 25%,
    #3d3a6e 50%,
    #2d2b55 75%,
    #1e1e2e 100%
  );
}

.visualizations {
  padding: 8rem 1.5rem 5rem;
  color: #cdd6f4;
}

.section-heading {
  max-width: 768px;
  margin: 0 auto 4rem auto;
  text-align: center;
}

.greeting {
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 700;
  color: #cdd6f4;
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem 0;
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2);
}

.subgreeting {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: #bac2de;
  margin: 0 0 3rem 0;
  letter-spacing: 0.02em;
}


@media (max-width: 640px) {
  .visualizations {
    padding: 3rem 1rem 4rem;
  }
}
</style>
