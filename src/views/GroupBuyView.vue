<template>
  <section class="page">
    <div class="page-header">
      <div class="header-content">
        <h1>&#x1F91D; 拼单搭子</h1>
        <p>找拼单、找搭子、找学习伙伴，一起省钱又快乐</p>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-num">{{ items.length }}</span>
          <span class="stat-label">活动</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">{{ types.length }}</span>
          <span class="stat-label">类型</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">{{ totalPeople }}</span>
          <span class="stat-label">已拼人数</span>
        </div>
      </div>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <span class="search-icon">&#x1F50D;</span>
        <input v-model="search" placeholder="搜索拼单活动..." class="search-input" />
      </div>
      <div class="filter-group">
        <button
          v-for="t in allTypes"
          :key="t.key"
          class="filter-btn"
          :class="{ active: activeType === t.key }"
          @click="activeType = t.key"
        >{{ t.label }}</button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
    <EmptyState v-else-if="filtered.length === 0" text="没有找到符合条件的拼单活动" />
    <div v-else class="list">
      <ItemCard
        v-for="item in filtered"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type"
        :tag-type="tagColor(item.type)"
        :location="item.location"
        :time="timeDisplay(item.deadline)"
        :badge="item.currentCount >= item.targetCount ? '&#x2705; 已成团' : isNearDeadline(item.deadline) ? '&#x23F0; 即将截止' : ''"
        :badge-type="item.currentCount >= item.targetCount ? 'new' : 'urgent'"
      >
        <template #image>
          <div class="item-img" :style="{ background: gradColors[item.id % gradColors.length] }">
            <div class="progress-ring">
              <svg viewBox="0 0 80 80" class="ring-svg">
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="6"/>
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="6"
                  :stroke-dasharray="201" :stroke-dashoffset="201 - (item.currentCount / item.targetCount) * 201"
                  stroke-linecap="round" transform="rotate(-90 40 40)"/>
              </svg>
              <span class="ring-text">{{ Math.round(item.currentCount / item.targetCount * 100) }}%</span>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="progress-area">
            <span class="progress-label">{{ item.currentCount }}/{{ item.targetCount }} 人</span>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: Math.min(100, item.currentCount / item.targetCount * 100) + '%' }"></div>
            </div>
          </div>
          <span class="publisher">{{ item.publisher }}</span>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'

const items = ref<GroupBuyItem[]>([])
const loading = ref(true)
const search = ref('')
const activeType = ref('全部')

const allTypes = computed(() => {
  const seen = new Set(items.value.map(i => i.type))
  return [{ key: '全部', label: '全部' }, ...Array.from(seen).map(t => ({ key: t, label: t }))]
})

const types = computed(() => [...new Set(items.value.map(i => i.type))])
const totalPeople = computed(() => items.value.reduce((s, i) => s + i.currentCount, 0))

const filtered = computed(() => {
  return items.value.filter(item => {
    const matchSearch = !search.value || item.title.includes(search.value) || item.description.includes(search.value)
    const matchType = activeType.value === '全部' || item.type === activeType.value
    return matchSearch && matchType
  })
})

const gradColors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
]

function tagColor(type: string) {
  if (['拼餐', '拼购'].includes(type)) return 'orange'
  if (type === '搭子') return 'purple'
  if (type.includes('学习') || type.includes('资料')) return 'blue'
  return 'green'
}

function timeDisplay(deadline: string) {
  return '截止: ' + deadline
}

function isNearDeadline(deadline: string) {
  const now = Date.now()
  const d = new Date(deadline.replace(/-/g, '/')).getTime()
  return d - now > 0 && d - now < 86400000
}

onMounted(async () => {
  try {
    const res = await getGroupBuys()
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
  background: linear-gradient(135deg, #fff, #f0f4ff);
  border: 1px solid #d8e0f0;
}
.header-content h1 { margin: 0 0 4px; font-size: 1.4em; color: #1a1a2e; }
.header-content p { margin: 0; color: #636e72; font-size: 0.88em; }
.header-stats { display: flex; gap: 20px; }
.stat-item { text-align: center; }
.stat-num { display: block; font-size: 1.4em; font-weight: 800; color: #667eea; }
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
.search-box:focus-within { border-color: #667eea; }
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
.filter-btn:hover { border-color: #667eea; color: #667eea; }
.filter-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border-color: transparent;
}

.loading-state { text-align: center; padding: 60px 0; color: #b2bec3; }
.loading-spinner {
  width: 36px; height: 36px;
  margin: 0 auto 12px;
  border: 3px solid #eef0f2;
  border-top-color: #667eea;
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
  align-items: center;
  justify-content: center;
}
.progress-ring { position: relative; width: 70px; height: 70px; }
.ring-svg { width: 100%; height: 100%; transform: rotate(0deg); }
.ring-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85em;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.15);
}

.progress-area { display: flex; align-items: center; gap: 10px; flex: 1; }
.progress-label { font-size: 0.85em; color: #636e72; white-space: nowrap; font-weight: 600; }
.progress-track {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #f0f0f0;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.5s ease;
}
.publisher { color: #b2bec3; font-size: 0.8em; }

@media (max-width: 640px) {
  .list { grid-template-columns: 1fr; }
  .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
}
</style>
