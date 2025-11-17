<template>
  <div class="about-page">
    <div class="about-content">
      <h1 class="about-title">About me</h1>

      <div class="about-section">
        <p class="about-text">Proud dad & vibe coder</p>

        <div class="links">
          <a href="https://github.com/festeh" target="_blank" rel="noopener noreferrer" class="link" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
          <a href="https://t.me/festeh" target="_blank" rel="noopener noreferrer" class="link" aria-label="Telegram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span>Telegram</span>
          </a>
          <a href="https://www.linkedin.com/in/dmitry-lipin/" target="_blank" rel="noopener noreferrer" class="link" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  /* Same gradient as home */
  background: linear-gradient(
    135deg,
    #1e1e2e 0%,
    #2d2b55 25%,
    #3d3a6e 50%,
    #2d2b55 75%,
    #1e1e2e 100%
  );
}

.about-content {
  max-width: 800px;
  text-align: center;
}

.about-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #cdd6f4;
  margin: 0 0 3rem 0;
}

.about-section {
}

.about-text {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #a6adc8;
  margin: 0 0 3rem 0;
  font-weight: 300;
}

.links {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.link {
  color: #89b4fa;
  text-decoration: none;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 500;
  padding: 0.75rem 2rem;
  border: 2px solid #89b4fa;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.link svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.link:hover {
  background-color: #89b4fa;
  color: #1e1e2e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(137, 180, 250, 0.3);
}

.link:active {
  transform: translateY(0);
}
</style>
