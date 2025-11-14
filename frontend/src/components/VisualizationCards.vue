<template>
  <div>
    <div v-if="loading" class="viz-status">Loading visualizations…</div>
    <div v-else-if="error" class="viz-status viz-error">{{ error }}</div>
    <div v-else>
      <div v-if="visibleCards.length" class="card-grid" role="list">
        <a
          v-for="card in visibleCards"
          :key="card.id"
          class="viz-card"
          :href="card.url"
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
        >
           <div class="card-content">
             <h3>{{ card.title }}</h3>
             <div class="card-icon">
               <img
                 v-if="card.icon"
                 :src="card.icon"
                 :alt="card.title"
                 @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
                 style="width: 200px; height: 200px; object-fit: contain; border-radius: 8px;"
               />
               <FallbackIcon v-else />
             </div>
           </div>
            <span class="card-hover-hint">Open →</span>
        </a>
      </div>
      <div v-else class="viz-status">No visualizations available yet.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import FallbackIcon from './FallbackIcon.vue'

type VisualizationCard = {
  id: string
  title: string
  url: string
  icon?: string
}

const MAX_CARDS = 16
const DEV_FALLBACK_API_BASE = import.meta.env.DEV ? 'http://localhost:8080' : ''
const rawApiBase = (import.meta.env.VITE_API_BASE as string | undefined) ?? DEV_FALLBACK_API_BASE
const API_BASE = rawApiBase ? rawApiBase.replace(/\/$/, '') : ''
const cards = ref<VisualizationCard[]>([])
const loading = ref(false)
const error = ref('')

const visibleCards = computed(() => cards.value.slice(0, MAX_CARDS))

function resolveApiUrl(path: string) {
  if (!path.startsWith('/')) {
    path = `/${path}`
  }

  return API_BASE ? `${API_BASE}${path}` : path
}

function normalizeCards(payload: unknown): VisualizationCard[] {
  if (!Array.isArray(payload)) {
    return []
  }

  const normalized: VisualizationCard[] = []

  payload.forEach((item) => {
    if (!item || typeof item !== 'object') {
      return
    }

    const raw = item as Partial<VisualizationCard> & Record<string, unknown>
    if (typeof raw.title !== 'string' || typeof raw.url !== 'string') {
      return
    }

    normalized.push({
      id: typeof raw.id === 'string' ? raw.id : raw.title,
      title: raw.title,
      url: raw.url,
      icon: typeof raw.icon === 'string' ? raw.icon : undefined,
    })
  })

  return normalized
}

async function fetchVisualizations() {
  loading.value = true
  error.value = ''

  try {
    const endpoint = resolveApiUrl('/api/visualizations')
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error(`Failed to load visualizations: ${response.status}`)
    }

    const contentType = response.headers.get('content-type') ?? ''
    let payload: unknown

    if (contentType.includes('application/json')) {
      payload = await response.json()
    } else {
      const text = await response.text()
      throw new Error(`Unexpected response from server: ${text.substring(0, 120)}...`)
    }

    cards.value = normalizeCards(payload)
  } catch (err) {
    console.error(err)
    error.value = 'Unable to load visualizations right now. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchVisualizations)
</script>

<style scoped>
.card-grid {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  max-width: 1200px;
  margin: 0 auto;
}

.viz-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 16px;
  text-decoration: none;
  background: transparent;
  border: none;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.viz-card:hover {
  transform: translateY(-4px);
  border-color: #89b4fa;
  box-shadow: 0 12px 24px rgba(17, 17, 27, 0.4);
}

.card-icon {
  display: flex;
  justify-content: center;
}

.card-icon img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
}

.card-content {
  max-width: 200px;
  margin: 0 auto;
}

.card-content h3 {
  margin: 0 0 1rem 0;
  padding-bottom: 0.75rem;
  font-size: 1.25rem;
  color: #cdd6f4;
  text-align: center;
  border-bottom: 2px solid rgba(137, 180, 250, 0.3);
}

.card-content p {
  margin: 0 0 1rem 0;
  color: #bac2de;
  font-size: 0.95rem;
  line-height: 1.4;
}

.tag-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-list li {
  font-size: 0.75rem;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(137, 180, 250, 0.4);
  color: #89b4fa;
}

.card-hover-hint {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  font-weight: 600;
  color: #a6e3a1;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.viz-card:hover .card-hover-hint {
  opacity: 1;
}

.viz-status {
  text-align: center;
  color: #bac2de;
  margin-top: 1.5rem;
}

.viz-error {
  color: #f38ba8;
}

@media (min-width: 1200px) {
  .card-grid {
    grid-template-columns: repeat(3, minmax(280px, 1fr));
  }
}

@media (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
