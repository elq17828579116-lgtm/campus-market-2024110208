<script setup lang="ts"></script>

<template>
  <div class="board-page">
    <div class="page-header">
      <h1>数据看板</h1>
      <p class="header-sub">校园轻集市运营概览</p>
    </div>

    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card" :style="{ background: s.bg }">
        <span class="stat-icon">{{ s.icon }}</span>
        <p class="stat-value">{{ s.value }}</p>
        <p class="stat-label">{{ s.label }}</p>
        <span class="stat-trend" :style="{ color: s.up ? '#2ecc71' : '#e74c3c' }">
          {{ s.up ? '↑' : '↓' }} {{ s.trend }}
        </span>
      </div>
    </div>

    <div class="board-grid">
      <div class="board-card">
        <h3 class="card-title">📊 热门分类</h3>
        <div class="bar-list">
          <div v-for="c in categories" :key="c.name" class="bar-item">
            <div class="bar-header">
              <span>{{ c.name }}</span>
              <span class="bar-num">{{ c.count }} 件</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: c.pct + '%', background: c.color }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="board-card">
        <h3 class="card-title">🕐 最近交易</h3>
        <div class="trade-list">
          <div v-for="t in trades" :key="t.item" class="trade-item">
            <div class="trade-dot" :style="{ background: t.color }"></div>
            <div class="trade-body">
              <span class="trade-name">{{ t.item }}</span>
              <span class="trade-meta">{{ t.price }} · {{ t.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      stats: [
        { icon: '📦', value: '128', label: '商品总数', bg: 'linear-gradient(135deg,#667eea,#764ba2)', trend: '12%', up: true },
        { icon: '✨', value: '15', label: '今日发布', bg: 'linear-gradient(135deg,#4facfe,#00f2fe)', trend: '8%', up: true },
        { icon: '✅', value: '42', label: '成交订单', bg: 'linear-gradient(135deg,#2ecc71,#27ae60)', trend: '5%', up: true },
        { icon: '👥', value: '356', label: '注册用户', bg: 'linear-gradient(135deg,#fa709a,#fee140)', trend: '3%', up: true },
      ],
      categories: [
        { name: '电子产品', count: 38, pct: 100, color: '#667eea' },
        { name: '教材书籍', count: 29, pct: 76, color: '#4facfe' },
        { name: '生活用品', count: 22, pct: 58, color: '#2ecc71' },
        { name: '运动器材', count: 18, pct: 47, color: '#fa709a' },
        { name: '衣物配饰', count: 12, pct: 32, color: '#a18cd1' },
        { name: '其他', count: 9, pct: 24, color: '#f093fb' },
      ],
      trades: [
        { item: '高等数学教材', price: '¥25', time: '今天 10:00', color: '#2ecc71' },
        { item: '工学椅', price: '¥120', time: '昨天 15:30', color: '#4facfe' },
        { item: 'LED台灯', price: '¥20', time: '前天 20:00', color: '#667eea' },
        { item: '篮球', price: '¥30', time: '3天前', color: '#fa709a' },
      ],
    }
  },
}
</script>

<style scoped>
.page-header { margin-bottom: 24px; }
.page-header h1 { margin: 0; font-size: 1.6em; color: #2d3436; }
.header-sub { margin: 4px 0 0; color: #b2bec3; font-size: 0.9em; }

.stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px;
}
.stat-card {
  border-radius: 14px; padding: 20px; color: #fff; position: relative; overflow: hidden;
}
.stat-icon { font-size: 2em; opacity: 0.3; position: absolute; right: 16px; top: 12px; }
.stat-value { font-size: 2em; font-weight: 700; margin: 0; }
.stat-label { margin: 2px 0; opacity: 0.8; font-size: 0.85em; }
.stat-trend { font-size: 0.8em; font-weight: 600; }

.board-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.board-card {
  background: #fff; border-radius: 14px; padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.card-title { margin: 0 0 16px; font-size: 1em; color: #2d3436; }

.bar-item { margin-bottom: 14px; }
.bar-header { display: flex; justify-content: space-between; font-size: 0.85em; margin-bottom: 4px; color: #636e72; }
.bar-num { color: #b2bec3; }
.bar-track { height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }

.trade-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f5f5f5; }
.trade-item:last-child { border-bottom: none; }
.trade-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.trade-body { display: flex; justify-content: space-between; flex: 1; }
.trade-name { color: #2d3436; font-weight: 500; font-size: 0.9em; }
.trade-meta { color: #b2bec3; font-size: 0.8em; }
</style>
