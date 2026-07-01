<template>
  <section class="page">
    <div class="page-header">
      <div class="header-content">
        <h1>&#x1F50D; 失物招领</h1>
        <p>发布和查看校园内的遗失物品与招领信息，互帮互助暖校园</p>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-num">{{ items.length }}</span>
          <span class="stat-label">全部</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">{{ lostCount }}</span>
          <span class="stat-label">丢失</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">{{ foundCount }}</span>
          <span class="stat-label">拾到</span>
        </div>
      </div>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <span class="search-icon">&#x1F50D;</span>
        <input v-model="search" placeholder="搜索物品名称..." class="search-input" />
      </div>
      <div class="filter-group">
        <button
          v-for="t in typeFilters"
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
    <EmptyState v-else-if="filtered.length === 0" text="没有找到相关信息" />
    <div v-else class="list">
      <ItemCard
        v-for="item in filtered"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type === 'lost' ? '丢失' : '拾到'"
        :tag-type="item.type === 'lost' ? 'red' : 'blue'"
        :location="item.location"
        :time="item.eventTime"
        :badge="item.views > 200 ? '&#x1F514; 紧急' : item.views > 100 ? '&#x1F4E2; 扩散' : ''"
        :badge-type="item.views > 200 ? 'urgent' : 'hot'"
      >
        <template #image>
          <div class="item-img" :class="item.type">
            <span class="img-icon">{{ item.type === 'lost' ? '&#x1F622;' : '&#x1F60A;' }}</span>
            <span class="img-label">{{ item.type === 'lost' ? '寻物' : '招领' }}</span>
          </div>
        </template>
        <template #footer>
          <div class="contact-area">
            <span class="contact-icon">&#x1F4DE;</span>
            <span class="contact-text">{{ item.contact }}</span>
          </div>
          <div class="footer-right">
            <button
              class="fav-btn"
              :class="{ active: fav.isFavorited('lostFound', item.id) }"
              @click="fav.toggleFavorite({ type: 'lostFound', id: item.id, title: item.title, description: item.description, tag: item.itemName, addedAt: '' })"
            >{{ fav.isFavorited('lostFound', item.id) ? '&#x2764;&#xFE0F;' : '&#x1F90D;' }}</button>
            <span class="item-badge">{{ item.itemName }}</span>
            <span class="views">&#x1F441; {{ item.views }}</span>
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
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import { useFavoriteStore } from '@/stores/favorite'

const fav = useFavoriteStore()

const items = ref<LostFoundItem[]>([])
const loading = ref(true)
const search = ref('')
const activeType = ref('全部')

const typeFilters = [
  { key: '全部', label: '全部' },
  { key: 'lost', label: '丢失' },
  { key: 'found', label: '拾到' },
]

const lostCount = computed(() => items.value.filter(i => i.type === 'lost').length)
const foundCount = computed(() => items.value.filter(i => i.type === 'found').length)

const filtered = computed(() => {
  return items.value.filter(item => {
    const matchSearch = !search.value || item.title.includes(search.value) || item.itemName.includes(search.value) || item.description.includes(search.value)
    const matchType = activeType.value === '全部' || item.type === activeType.value
    return matchSearch && matchType
  })
})

onMounted(async () => {
  try {
    const res = await getLostFounds()
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
  background: linear-gradient(135deg, #fff, #fff8f0);
  border: 1px solid #f0e8d8;
}
.header-content h1 { margin: 0 0 4px; font-size: 1.4em; color: #1a1a2e; }
.header-content p { margin: 0; color: #636e72; font-size: 0.88em; }
.header-stats { display: flex; gap: 20px; }
.stat-item { text-align: center; }
.stat-num { display: block; font-size: 1.4em; font-weight: 800; color: #e17055; }
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
.search-box:focus-within { border-color: #e17055; }
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
.filter-btn:hover { border-color: #e17055; color: #e17055; }
.filter-btn.active {
  background: linear-gradient(135deg, #e17055, #d63031);
  color: #fff;
  border-color: transparent;
}

.loading-state { text-align: center; padding: 60px 0; color: #b2bec3; }
.loading-spinner {
  width: 36px; height: 36px;
  margin: 0 auto 12px;
  border: 3px solid #eef0f2;
  border-top-color: #e17055;
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
  gap: 4px;
}
.item-img.lost { background: linear-gradient(135deg, #fee2e2, #fecaca); }
.item-img.found { background: linear-gradient(135deg, #dbeafe, #bfdbfe); }
.img-icon { font-size: 2em; }
.img-label {
  font-size: 0.75em;
  font-weight: 700;
  padding: 2px 12px;
  border-radius: 10px;
  background: rgba(255,255,255,0.6);
}
.item-img.lost .img-label { color: #dc2626; }
.item-img.found .img-label { color: #2563eb; }

.contact-area { display: flex; align-items: center; gap: 6px; }
.contact-icon { font-size: 0.85em; }
.contact-text {
  font-size: 0.82em;
  color: #636e72;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.footer-right { display: flex; align-items: center; gap: 8px; }
.item-badge {
  padding: 3px 10px;
  border-radius: 12px;
  background: #fff3e0;
  color: #e17055;
  font-size: 0.72em;
  font-weight: 600;
}
.views { font-size: 0.8em; color: #b2bec3; }
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
