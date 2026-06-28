<script setup lang="ts"></script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg">
        <div class="circle c1"></div>
        <div class="circle c2"></div>
        <div class="circle c3"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">校园轻集市</h1>
        <p class="hero-sub">二手流转 · 知识共享 · 绿色校园</p>
        <p class="hero-desc">在这里发布和发现校园里的闲置好物，让每件物品找到新主人</p>
        <div class="hero-actions">
          <RouterLink to="/list" class="btn primary">逛逛商品</RouterLink>
          <RouterLink to="/publish" class="btn ghost">发布闲置</RouterLink>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">全部分类</h2>
      <div class="category-grid">
        <div v-for="c in categories" :key="c.name" class="category-card">
          <span class="cat-icon">{{ c.icon }}</span>
          <span class="cat-name">{{ c.name }}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">今日推荐</h2>
      <div class="recommend-grid">
        <div v-for="i in 3" :key="i" class="recommend-card">
          <div class="rec-img" :style="{ background: colors[i-1] }">
            <span class="rec-tag">推荐</span>
          </div>
          <div class="rec-body">
            <h4>{{ ['微积分教材','工学椅','降噪耳机'][i-1] }}</h4>
            <p class="rec-price">{{ ['¥25','¥120','¥60'][i-1] }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      colors: ['linear-gradient(135deg,#667eea,#764ba2)','linear-gradient(135deg,#f093fb,#f5576c)','linear-gradient(135deg,#4facfe,#00f2fe)'],
      categories: [
        { name:'电子产品', icon:'📱' }, { name:'教材书籍', icon:'📚' },
        { name:'生活用品', icon:'🧴' }, { name:'运动器材', icon:'⚽' },
        { name:'衣物配饰', icon:'👕' }, { name:'其他', icon:'🎯' },
      ],
    }
  },
}
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 60px 48px;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #fff;
}
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
}
.c1 { width: 300px; height: 300px; background: #2ecc71; top: -80px; right: -60px; }
.c2 { width: 200px; height: 200px; background: #3498db; bottom: -40px; left: -40px; }
.c3 { width: 150px; height: 150px; background: #e74c3c; top: 40px; right: 200px; }

.hero-content { position: relative; z-index: 1; }
.hero-title { font-size: 2.8em; margin: 0; font-weight: 800; }
.hero-sub { font-size: 1.1em; color: rgba(255,255,255,0.7); margin: 8px 0 4px; }
.hero-desc { color: rgba(255,255,255,0.5); margin: 0 0 28px; }

.hero-actions { display: flex; gap: 12px; }
.btn {
  padding: 12px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95em;
  transition: all 0.25s ease;
}
.btn.primary {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: #fff;
  box-shadow: 0 4px 16px rgba(46,204,113,0.35);
}
.btn.primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(46,204,113,0.45); }
.btn.ghost {
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
}
.btn.ghost:hover { background: rgba(255,255,255,0.18); }

.section { margin-bottom: 40px; }
.section-title {
  font-size: 1.3em;
  font-weight: 700;
  color: #2d3436;
  margin: 0 0 16px;
  padding-left: 12px;
  border-left: 4px solid #2ecc71;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 12px;
  background: #fff;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
}
.cat-icon { font-size: 2em; }
.cat-name { font-weight: 600; color: #2d3436; font-size: 0.9em; }

.recommend-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.recommend-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.recommend-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.rec-img {
  height: 140px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 12px;
}
.rec-tag {
  background: rgba(255,255,255,0.9);
  color: #e74c3c;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.75em;
  font-weight: 600;
}
.rec-body { padding: 14px; }
.rec-body h4 { margin: 0 0 4px; color: #2d3436; }
.rec-price { color: #e74c3c; font-weight: 700; font-size: 1.1em; margin: 0; }
</style>
