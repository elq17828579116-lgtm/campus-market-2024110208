<script setup lang="ts">
const modules = [
  { path: '/trade', name: '二手交易', desc: '买闲置省更多', style: 'background:linear-gradient(135deg,#fff,#f0fff4);border-color:#d8f0e0', emoji: '\u{1F6D2}' },
  { path: '/lost-found', name: '失物招领', desc: '互帮互助暖校园', style: 'background:linear-gradient(135deg,#fff,#fff8f0);border-color:#f0e8d8', emoji: '\u{1F50D}' },
  { path: '/group-buy', name: '拼单搭子', desc: '一起省钱又快乐', style: 'background:linear-gradient(135deg,#fff,#f0f4ff);border-color:#d8e0f0', emoji: '\u{1F91D}' },
  { path: '/errand', name: '跑腿委托', desc: '轻松赚取小报酬', style: 'background:linear-gradient(135deg,#fff,#fff0f8);border-color:#f0d8e8', emoji: '\u{1F3C3}' },
]

const recs = [
  { title: '微积分教材仅 ¥25', price: '&yen;25', color: 'linear-gradient(135deg,#2ecc71,#27ae60)', tag: '限时优惠' },
  { title: '工学椅毕业清仓', price: '&yen;120', color: 'linear-gradient(135deg,#667eea,#764ba2)', tag: '人气爆款' },
  { title: '降噪耳机半价出', price: '&yen;60', color: 'linear-gradient(135deg,#f093fb,#f5576c)', tag: '超值推荐' },
]

const stats = [
  { num: '4', label: '业务板块' },
  { num: '40+', label: '在售物品' },
  { num: '1000+', label: '累计浏览' },
  { num: '100%', label: '校园认证' },
]
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg">
        <div class="circle c1"></div>
        <div class="circle c2"></div>
        <div class="circle c3"></div>
        <div class="circle c4"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">&#x1F33F; 校园专属交易平台</div>
        <h1 class="hero-title">校园轻集市</h1>
        <p class="hero-sub">二手流转 &middot; 失物招领 &middot; 拼单搭子 &middot; 跑腿委托</p>
        <p class="hero-desc">在这里发布和发现校园里的闲置好物，让每件物品找到新主人</p>
        <div class="hero-actions">
          <RouterLink to="/trade" class="btn primary">&#x1F6D2; 逛逛交易</RouterLink>
          <RouterLink to="/publish" class="btn ghost">&#x2728; 发布信息</RouterLink>
        </div>
      </div>
    </section>

    <section class="stats-bar">
      <div v-for="s in stats" :key="s.label" class="stat-block">
        <span class="stat-num">{{ s.num }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">业务板块</h2>
      <div class="module-grid">
        <RouterLink
          v-for="m in modules"
          :key="m.path"
          :to="m.path"
          class="module-card"
          :style="m.style"
        >
          <span class="module-icon">{{ m.emoji }}</span>
          <span class="module-name">{{ m.name }}</span>
          <span class="module-desc">{{ m.desc }}</span>
        </RouterLink>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">&#x1F525; 今日推荐</h2>
      <div class="recommend-grid">
        <div v-for="(r, i) in recs" :key="i" class="recommend-card">
          <div class="rec-img" :style="{ background: r.color }">
            <span class="rec-tag">{{ r.tag }}</span>
          </div>
          <div class="rec-body">
            <h4>{{ r.title }}</h4>
            <p class="rec-price" v-html="r.price"></p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <h2>&#x1F4AC; 加入校园轻集市</h2>
      <p>与全校同学一起绿色交易，共建快乐校园</p>
      <div class="cta-actions">
        <RouterLink to="/publish" class="btn primary">&#x2728; 发布闲置</RouterLink>
        <RouterLink to="/board" class="btn ghost-dark">&#x1F4CA; 查看看板</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 56px 48px 48px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #fff;
}
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}
.c1 { width: 320px; height: 320px; background: #2ecc71; top: -100px; right: -80px; }
.c2 { width: 200px; height: 200px; background: #3498db; bottom: -60px; left: -40px; }
.c3 { width: 120px; height: 120px; background: #e74c3c; top: 40px; right: 240px; }
.c4 { width: 80px; height: 80px; background: #f39c12; bottom: 40px; right: 80px; }
.hero-content { position: relative; z-index: 1; }
.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  background: rgba(46,204,113,0.2);
  border: 1px solid rgba(46,204,113,0.3);
  font-size: 0.78em;
  margin-bottom: 14px;
}
.hero-title { font-size: 2.8em; margin: 0; font-weight: 800; line-height: 1.2; }
.hero-sub { font-size: 1.05em; color: rgba(255,255,255,0.7); margin: 10px 0 4px; }
.hero-desc { color: rgba(255,255,255,0.45); margin: 0 0 28px; }
.hero-actions { display: flex; gap: 12px; }
.btn {
  padding: 12px 28px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.92em;
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
.btn.ghost-dark {
  background: rgba(0,0,0,0.06);
  color: #636e72;
  border: 1px solid #eef0f2;
}
.btn.ghost-dark:hover { background: rgba(0,0,0,0.1); }

.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 32px;
}
.stat-block {
  padding: 20px 12px;
  background: #fff;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  border: 1px solid #eef0f2;
}
.stat-num {
  display: block;
  font-size: 1.6em;
  font-weight: 800;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stat-label { font-size: 0.78em; color: #b2bec3; margin-top: 4px; display: block; }

.section { margin-bottom: 36px; }
.section-title {
  font-size: 1.3em;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 16px;
  padding-left: 12px;
  border-left: 4px solid #2ecc71;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.module-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 28px 16px;
  background: #fff;
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  border: 1px solid #eef0f2;
}
.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}
.module-icon { font-size: 2.4em; }
.module-name { font-weight: 700; color: #1a1a2e; font-size: 1em; }
.module-desc { color: #636e72; font-size: 0.82em; }

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
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
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
  background: rgba(255,255,255,0.92);
  color: #e74c3c;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 0.75em;
  font-weight: 700;
}
.rec-body { padding: 16px; }
.rec-body h4 { margin: 0 0 4px; color: #1a1a2e; font-size: 0.95em; }
.rec-price { color: #e74c3c; font-weight: 800; font-size: 1.15em; margin: 0; }

.cta-section {
  text-align: center;
  padding: 44px 32px;
  border-radius: 18px;
  background: linear-gradient(135deg, #fff, #f0fff4);
  border: 1px solid #d8f0e0;
  margin-bottom: 24px;
}
.cta-section h2 { margin: 0 0 6px; color: #1a1a2e; font-size: 1.3em; }
.cta-section p { margin: 0 0 20px; color: #636e72; }
.cta-actions { display: flex; gap: 12px; justify-content: center; }

@media (max-width: 768px) {
  .module-grid { grid-template-columns: repeat(2, 1fr); }
  .recommend-grid { grid-template-columns: 1fr; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); }
  .hero { padding: 40px 24px; }
  .hero-title { font-size: 2em; }
}
</style>
