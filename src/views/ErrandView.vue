<template>
  <section class="page">
    <div class="page-header">
      <div class="header-content">
        <h1>&#x1F3C3; 跑腿委托</h1>
        <p>发布或接取跑腿任务，互帮互助，轻松赚取小报酬</p>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-num">{{ items.length }}</span>
          <span class="stat-label">任务</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">{{ urgentCount }}</span>
          <span class="stat-label">紧急</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">{{ totalReward }}</span>
          <span class="stat-label">总报酬</span>
        </div>
      </div>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <span class="search-icon">&#x1F50D;</span>
        <input v-model="search" placeholder="搜索跑腿任务..." class="search-input" />
      </div>
      <div class="filter-group">
        <button
          v-for="t in typeFilters"
          :key="t.key"
          class="filter-btn"
          :class="{ active: activeType === t.key }"
          @click="activeType = t.key"
        >{{ t.label }}</button>
        <button
          class="filter-btn"
          :class="{ active: urgentOnly }"
          @click="urgentOnly = !urgentOnly"
        >&#x1F6A8; 仅看紧急</button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
    <EmptyState v-else-if="filtered.length === 0" text="没有找到符合条件的跑腿任务" />
    <div v-else class="list">
      <ItemCard
        v-for="item in filtered"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.taskType"
        :tag-type="urgentTag(item)"
        :location="`${item.from}  \u2192  ${item.to}`"
        :time="'截止: ' + item.deadline"
        :badge="item.urgent ? '\u{1F6A8} 紧急' : ''"
        :badge-type="item.urgent ? 'urgent' : ''"
      >
        <template #image>
          <div class="item-img" :class="{ urgent: item.urgent }">
            <div class="route-line">
              <div class="route-dot start"></div>
              <div class="route-path"></div>
              <div class="route-dot end"></div>
            </div>
            <div class="route-text">
              <span class="route-from">{{ shortLoc(item.from) }}</span>
              <span class="route-arrow">&#x2192;</span>
              <span class="route-to">{{ shortLoc(item.to) }}</span>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="reward-area">
            <span class="reward-label">报酬</span>
            <strong class="reward-amount">&yen;{{ item.reward }}</strong>
          </div>
          <div class="footer-right">
            <button
              class="fav-btn"
              :class="{ active: fav.isFavorited('errand', item.id) }"
              @click="fav.toggleFavorite({ type: 'errand', id: item.id, title: item.title, description: item.description, tag: item.taskType, addedAt: '' })"
            >{{ fav.isFavorited('errand', item.id) ? '&#x2764;&#xFE0F;' : '&#x1F90D;' }}</button>
            <span v-if="item.views > 80" class="hot-tag">&#x1F525; {{ item.views }}</span>
            <span class="publisher">{{ item.publisher }}</span>
          </div>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getErrands, type ErrandItem } from '../api/errand'
import { useFavoriteStore } from '@/stores/favorite'

const fav = useFavoriteStore()

const items = ref<ErrandItem[]>([])
const loading = ref(true)
const search = ref('')
const activeType = ref('全部')
const urgentOnly = ref(false)

const typeFilters = computed(() => {
  const seen = new Set(items.value.map(i => i.taskType))
  return [{ key: '全部', label: '全部' }, ...Array.from(seen).map(t => ({ key: t, label: t }))]
})

const urgentCount = computed(() => items.value.filter(i => i.urgent).length)
const totalReward = computed(() => items.value.reduce((s, i) => s + i.reward, 0))

const filtered = computed(() => {
  return items.value.filter(item => {
    const matchSearch = !search.value || item.title.includes(search.value) || item.description.includes(search.value)
    const matchType = activeType.value === '全部' || item.taskType === activeType.value
    const matchUrgent = !urgentOnly.value || item.urgent
    return matchSearch && matchType && matchUrgent
  })
})

function shortLoc(loc: string) {
  return loc.length > 8 ? loc.slice(0, 6) + '..' : loc
}

function urgentTag(item: ErrandItem) {
  if (item.urgent) return 'red'
  if (item.reward >= 8) return 'orange'
  return 'blue'
}

onMounted(async () => {
  try {
    const res = await getErrands()
    items.value = res.data
  } catch {
    // handled
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; }

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-radius: 16px;
  background: linear-gradient(135deg, #fff, #fff0f8);
  border: 1px solid #f0d8e8;
}
.header-content h1 { margin: 0 0 4px; font-size: 1.4em; color: #1a1a2e; }
.header-content p { margin: 0; color: #636e72; font-size: 0.88em; }
.header-stats { display: flex; gap: 20px; }
.stat-item { text-align: center; }
.stat-num { display: block; font-size: 1.4em; font-weight: 800; color: #d63031; }
.stat-label { font-size: 0.75em; color: #b2bec3; }

.toolbar { display: flex; flex-direction: column; gap: 12px; }
.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eef0f2;
  transition: border-color 0.2s;
}
.search-box:focus-within { border-color: #d63031; }
.search-icon { font-size: 1em; }
.search-input { flex: 1; border: none; outline: none; font-size: 0.9em; background: transparent; }

.filter-group { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn {
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid #eef0f2;
  background: #fff;
  color: #636e72;
  font-size: 0.82em;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn:hover { border-color: #d63031; color: #d63031; }
.filter-btn.active {
  background: linear-gradient(135deg, #d63031, #e17055);
  color: #fff;
  border-color: transparent;
}

.loading-state { text-align: center; padding: 60px 0; color: #b2bec3; }
.loading-spinner {
  width: 36px; height: 36px;
  margin: 0 auto 12px;
  border: 3px solid #eef0f2;
  border-top-color: #d63031;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.item-img {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #f0fff4, #e8f8f0);
}
.item-img.urgent { background: linear-gradient(135deg, #fee2e2, #fecaca); }

.route-line {
  display: flex;
  align-items: center;
  gap: 0;
}
.route-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  border: 2px solid #fff;
}
.route-dot.start { background: #2ecc71; }
.route-dot.end { background: #d63031; }
.route-path {
  width: 50px; height: 2px;
  background: linear-gradient(90deg, #2ecc71, #d63031);
  position: relative;
}
.route-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78em;
  color: #636e72;
}
.route-arrow { color: #b2bec3; font-weight: 700; }

.reward-area {
  display: flex;
  align-items: center;
  gap: 6px;
}
.reward-label {
  font-size: 0.75em;
  color: #b2bec3;
}
.reward-amount {
  font-size: 1.15em;
  font-weight: 800;
  color: #d63031;
}
.footer-right { display: flex; align-items: center; gap: 8px; }
.hot-tag { font-size: 0.78em; color: #d63031; }
.publisher { color: #b2bec3; font-size: 0.8em; }
.fav-btn {
  background: none; border: none; cursor: pointer;
  font-size: 1.1em; padding: 2px; line-height: 1;
  transition: transform 0.2s;
}
.fav-btn:hover { transform: scale(1.2); }
.fav-btn.active { animation: heartBeat 0.3s ease; }
@keyframes heartBeat { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }

@media (max-width: 640px) {
  .list { grid-template-columns: 1fr; }
  .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
}
</style>
