<script setup lang="ts">
const products = [
  { id: 1, title: '高等数学第七版', price: '¥25', location: '图书馆', time: '2小时前', tag: '教材', color: 'linear-gradient(135deg,#667eea,#764ba2)' },
  { id: 2, title: '人体工学椅', price: '¥120', location: '东区宿舍', time: '昨天', tag: '家具', color: 'linear-gradient(135deg,#f093fb,#f5576c)' },
  { id: 3, title: '卡西欧计算器', price: '¥45', location: '教学楼A', time: '3天前', tag: '电子', color: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { id: 4, title: '斯伯丁篮球', price: '¥30', location: '体育馆', time: '5天前', tag: '运动', color: 'linear-gradient(135deg,#fa709a,#fee140)' },
  { id: 5, title: 'LED护眼台灯', price: '¥20', location: '西区宿舍', time: '1周前', tag: '生活', color: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
  { id: 6, title: '索尼降噪耳机', price: '¥60', location: '图书馆', time: '2天前', tag: '电子', color: 'linear-gradient(135deg,#5ee7df,#b490ca)' },
]
</script>

<template>
  <div class="list-page">
    <div class="page-header">
      <h1>商品列表</h1>
      <p class="count">共 {{ products.length }} 件商品</p>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input placeholder="搜索商品名称..." class="search-input" />
      </div>
      <div class="filter-group">
        <button v-for="f in ['全部','教材','电子','生活','运动']" :key="f"
          class="filter-btn" :class="{ active: f === '全部' }">{{ f }}</button>
      </div>
    </div>

    <div class="product-grid">
      <div v-for="p in products" :key="p.id" class="product-card">
        <RouterLink :to="`/detail/${p.id}`" class="product-link">
          <div class="card-img" :style="{ background: p.color }">
            <span class="card-tag">{{ p.tag }}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ p.title }}</h3>
            <p class="card-price">{{ p.price }}</p>
            <p class="card-meta">
              <span>📍 {{ p.location }}</span>
              <span>🕐 {{ p.time }}</span>
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px; }
.page-header h1 { margin: 0; font-size: 1.6em; color: #2d3436; }
.count { color: #b2bec3; font-size: 0.9em; }

.toolbar { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }

.search-box {
  flex: 1; display: flex; align-items: center; gap: 10px;
  background: #fff; padding: 0 16px; border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  min-width: 200px;
}
.search-icon { font-size: 1.1em; }
.search-input {
  flex: 1; border: none; padding: 12px 0; outline: none;
  font-size: 0.95em; background: transparent;
}

.filter-group { display: flex; gap: 8px; }
.filter-btn {
  padding: 8px 18px; border-radius: 10px; border: 1px solid #e8ecf1;
  background: #fff; cursor: pointer; font-size: 0.85em; color: #636e72;
  transition: all 0.2s;
}
.filter-btn:hover { border-color: #2ecc71; color: #2ecc71; }
.filter-btn.active {
  background: #2ecc71; color: #fff; border-color: #2ecc71;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.product-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.product-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }

.product-link { text-decoration: none; color: inherit; display: block; }

.card-img {
  height: 130px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 12px;
}
.card-tag {
  background: rgba(255,255,255,0.9);
  padding: 2px 12px;
  border-radius: 20px;
  font-size: 0.75em;
  font-weight: 600;
  color: #2d3436;
}

.card-body { padding: 14px; }
.card-title { margin: 0 0 4px; font-size: 1em; color: #2d3436; }
.card-price { color: #e74c3c; font-weight: 700; font-size: 1.1em; margin: 4px 0; }
.card-meta {
  display: flex; justify-content: space-between; margin: 8px 0 0;
  color: #b2bec3; font-size: 0.8em;
}
</style>
