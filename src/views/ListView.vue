<script setup lang="ts">
const products = [
  { id: 1, title: '微积分教材', price: '¥25', location: '图书馆', time: '2小时前' },
  { id: 2, title: '工学椅', price: '¥120', location: '宿舍区', time: '昨天' },
  { id: 3, title: '计算器', price: '¥45', location: '教学楼', time: '3天前' },
  { id: 4, title: '篮球', price: '¥30', location: '操场', time: '5天前' },
  { id: 5, title: '台灯', price: '¥20', location: '宿舍区', time: '1周前' },
  { id: 6, title: '耳机', price: '¥60', location: '图书馆', time: '2天前' },
]
</script>

<template>
  <div class="list-page">
    <h1>商品列表</h1>
    <div class="filters">
      <input placeholder="搜索商品..." class="search" />
      <select class="select"><option>全部分类</option></select>
    </div>
    <div class="product-grid">
      <div v-for="p in products" :key="p.id" class="product-card">
        <RouterLink :to="`/detail/${p.id}`" class="product-link">
          <div class="img-placeholder">{{ p.title[0] }}</div>
          <div class="info">
            <h3>{{ p.title }}</h3>
            <p class="price">{{ p.price }}</p>
            <p class="meta">{{ p.location }} · {{ p.time }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-page { max-width: 100%; }
.filters { display: flex; gap: 12px; margin: 16px 0; }
.search { flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; }
.select { padding: 8px; border: 1px solid #ddd; border-radius: 6px; }
.product-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
}
.product-card {
  border: 1px solid #eee; border-radius: 8px; overflow: hidden;
  transition: box-shadow 0.2s;
}
.product-card:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
.product-link { text-decoration: none; color: inherit; }
.img-placeholder {
  height: 120px; display: flex; align-items: center; justify-content: center;
  background: #f5f5f5; font-size: 2em; color: #bbb;
}
.info { padding: 12px; }
.info h3 { margin: 0 0 4px; font-size: 1em; }
.price { color: #f56c6c; font-weight: bold; margin: 4px 0; }
.meta { color: #999; font-size: 0.8em; margin: 0; }
</style>
