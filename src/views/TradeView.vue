<template>
  <section class="page">
    <div class="page-header">
      <div class="header-content">
        <h1>二手交易</h1>
        <p>浏览同学发布的闲置物品，发现校园内的实用好物</p>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-num">{{ trades.length }}</span>
          <span class="stat-label">在售</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">{{ categories.length }}</span>
          <span class="stat-label">分类</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">{{ totalViews }}</span>
          <span class="stat-label">总浏览</span>
        </div>
      </div>
    </div>

    <div class="toolbar">
      <SearchBar v-model="search" placeholder="搜索商品名称..." />
      <div class="filter-group">
        <button
          v-for="cat in allCategories"
          :key="cat"
          class="filter-btn"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >{{ cat }}</button>
      </div>
    </div>

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" text="加载失败，请确认 Mock 服务已启动" @retry="fetchTrades" />
    <EmptyState v-else-if="filtered.length === 0" text="没有找到符合条件的商品" />
    <div v-else class="list">
      <ItemCard
        v-for="item in filtered"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.condition"
        :tag-type="tagType(item.condition)"
        :location="item.location"
        :time="item.publishTime"
        :badge="item.views > 100 ? '&#x1F525; 热' : ''"
        :badge-type="item.views > 150 ? 'hot' : ''"
        color-theme="trade"
      >
        <template #image>
          <div class="item-img" :style="{ background: gradColors[item.id % gradColors.length] }">
            <span class="img-emoji">{{ emojis[item.category] || '&#x1F4E6;' }}</span>
          </div>
        </template>
        <template #footer>
          <div class="price-area">
            <strong class="price">￥{{ item.price }}</strong>
            <span class="old-price" v-if="item.price > 50">￥{{ Math.round(item.price * 1.8) }}</span>
          </div>
          <div class="footer-right">
            <button
              class="fav-btn"
              :class="{ active: fav.isFavorited('trade', item.id) }"
              @click="fav.toggleFavorite({ type: 'trade', id: item.id, title: item.title, description: item.description, tag: item.category, addedAt: '' })"
            >{{ fav.isFavorited('trade', item.id) ? '❤️' : '🤍' }}</button>
            <span class="views">&#x1F441; {{ item.views }}</span>
            <span class="category-tag">{{ item.category }}</span>
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
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'
import SearchBar from '../components/SearchBar.vue'
import { getTrades, type TradeItem } from '../api/trade'
import { useFavoriteStore } from '@/stores/favorite'

const fav = useFavoriteStore()

const trades = ref<TradeItem[]>([])
const loading = ref(true)
const error = ref(false)
const search = ref('')
const activeCategory = ref('全部')

const allCategories = computed(() => {
  const cats = ['全部']
  const unique = [...new Set(trades.value.map(t => t.category))]
  return cats.concat(unique)
})

const categories = computed(() => [...new Set(trades.value.map(t => t.category))])

const filtered = computed(() => {
  return trades.value.filter(item => {
    const matchSearch = !search.value || item.title.includes(search.value) || item.description.includes(search.value)
    const matchCat = activeCategory.value === '全部' || item.category === activeCategory.value
    return matchSearch && matchCat
  })
})

const totalViews = computed(() => trades.value.reduce((s, t) => s + t.views, 0))

const gradColors = [
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
]

const emojis: Record<string, string> = {
  '数码配件': '&#x2328;&#xFE0F;',
  '教材资料': '&#x1F4DA;',
  '生活用品': '&#x1FAAA;',
  '体育用品': '&#x26BD;',
  '兴趣爱好': '&#x1F3B8;',
  '其他': '&#x1F4E6;',
}

function tagType(cond: string) {
  if (cond.includes('全新')) return 'blue'
  if (cond.includes('九成')) return 'green'
  if (cond.includes('八成')) return 'orange'
  return 'purple'
}

async function fetchTrades() {
  loading.value = true
  error.value = false
  try {
    const res = await getTrades()
    trades.value = res.data
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(fetchTrades)
</script>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; }

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-radius: 16px;
  background: linear-gradient(135deg, #fff, #f0fff4);
  border: 1px solid #d8f0e0;
}
.header-content h1 { margin: 0 0 4px; font-size: 1.4em; color: #1a1a2e; }
.header-content p { margin: 0; color: #636e72; font-size: 0.88em; }
.header-stats { display: flex; gap: 20px; }
.stat-item { text-align: center; }
.stat-num { display: block; font-size: 1.4em; font-weight: 800; color: #2ecc71; }
.stat-label { font-size: 0.75em; color: #b2bec3; }

.toolbar {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
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
.filter-btn:hover { border-color: #2ecc71; color: #2ecc71; }
.filter-btn.active {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: #fff;
  border-color: transparent;
}

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
.img-emoji { font-size: 2.8em; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }

.price-area { display: flex; align-items: baseline; gap: 8px; }
.price { font-size: 1.2em; font-weight: 800; color: #e17055; }
.old-price { font-size: 0.78em; color: #b2bec3; text-decoration: line-through; }
.footer-right { display: flex; align-items: center; gap: 8px; }
.views { font-size: 0.8em; color: #b2bec3; }
.fav-btn {
  background: none; border: none; cursor: pointer;
  font-size: 1.1em; padding: 2px; line-height: 1;
  transition: transform 0.2s;
}
.fav-btn:hover { transform: scale(1.2); }
.fav-btn.active { animation: heartBeat 0.3s ease; }
@keyframes heartBeat { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }
.category-tag {
  padding: 2px 10px;
  border-radius: 12px;
  background: #f0fff4;
  color: #27ae60;
  font-size: 0.72em;
  font-weight: 600;
}

@media (max-width: 640px) {
  .list { grid-template-columns: 1fr; }
  .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
}
</style>
