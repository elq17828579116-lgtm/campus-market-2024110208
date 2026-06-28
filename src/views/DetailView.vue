<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<template>
  <div class="detail">
    <RouterLink to="/list" class="back-link">← 返回列表</RouterLink>

    <div class="detail-card">
      <div class="detail-gallery">
        <div class="main-img" :style="{ background: ['linear-gradient(135deg,#667eea,#764ba2)','linear-gradient(135deg,#f093fb,#f5576c)','linear-gradient(135deg,#4facfe,#00f2fe)'][Number(id) % 3] }">
          <span class="big-icon">📦</span>
        </div>
        <div class="thumbnails">
          <div v-for="i in 4" :key="i" class="thumb" :class="{ active: i === 1 }"></div>
        </div>
      </div>

      <div class="detail-info">
        <div class="info-header">
          <h1>商品 {{ id }}</h1>
          <span class="badge">在售</span>
        </div>
        <p class="detail-price">¥{{ 20 + Number(id) * 10 }}</p>
        <p class="detail-desc">成色完好，使用不到半年，功能一切正常。支持校内当面交易，可小刀。有意者私信联系。</p>

        <div class="detail-meta">
          <div class="meta-row"><span class="meta-label">分类</span><span>电子产品</span></div>
          <div class="meta-row"><span class="meta-label">所在地</span><span>图书馆三楼</span></div>
          <div class="meta-row"><span class="meta-label">发布时间</span><span>2026-06-27</span></div>
          <div class="meta-row"><span class="meta-label">浏览次数</span><span>42</span></div>
        </div>

        <div class="seller-card">
          <div class="seller-avatar">U</div>
          <div class="seller-info">
            <p class="seller-name">用户昵称</p>
            <p class="seller-stat">已发布 12 件商品</p>
          </div>
        </div>

        <div class="detail-actions">
          <button class="action-btn primary">💬 联系卖家</button>
          <button class="action-btn outline">❤️ 收藏</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block; margin-bottom: 20px; color: #636e72;
  text-decoration: none; font-size: 0.9em; transition: color 0.2s;
}
.back-link:hover { color: #2ecc71; }

.detail-card {
  display: flex; gap: 32px; background: #fff; border-radius: 16px;
  padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.detail-gallery { flex: 1; }
.main-img {
  height: 280px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
}
.big-icon { font-size: 4em; }
.thumbnails { display: flex; gap: 8px; margin-top: 12px; }
.thumb {
  width: 60px; height: 50px; border-radius: 8px; background: #f0f0f0;
  cursor: pointer; transition: all 0.2s;
}
.thumb.active { border: 2px solid #2ecc71; }

.detail-info { flex: 1; }
.info-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.info-header h1 { margin: 0; font-size: 1.4em; color: #2d3436; }
.badge {
  background: #f0fdf4; color: #2ecc71; padding: 2px 12px;
  border-radius: 20px; font-size: 0.75em; font-weight: 600;
}
.detail-price { font-size: 1.8em; color: #e74c3c; font-weight: 700; margin: 8px 0; }
.detail-desc { color: #636e72; line-height: 1.6; margin: 12px 0 20px; }

.detail-meta { border-top: 1px solid #f0f0f0; padding-top: 16px; }
.meta-row { display: flex; gap: 40px; padding: 6px 0; color: #636e72; font-size: 0.9em; }
.meta-label { color: #b2bec3; width: 80px; }

.seller-card {
  display: flex; align-items: center; gap: 12px;
  padding: 14px; border-radius: 12px; background: #f8f9fa; margin: 16px 0;
}
.seller-avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg,#2ecc71,#27ae60);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-weight: bold;
}
.seller-name { margin: 0; font-weight: 600; color: #2d3436; }
.seller-stat { margin: 2px 0 0; font-size: 0.8em; color: #b2bec3; }

.detail-actions { display: flex; gap: 12px; }
.action-btn {
  flex: 1; padding: 12px; border-radius: 12px; border: none;
  cursor: pointer; font-size: 0.95em; font-weight: 600;
  transition: all 0.25s ease;
}
.action-btn.primary {
  background: linear-gradient(135deg,#2ecc71,#27ae60);
  color: #fff; box-shadow: 0 4px 12px rgba(46,204,113,0.3);
}
.action-btn.primary:hover { transform: translateY(-2px); }
.action-btn.outline {
  background: #fff; color: #636e72; border: 1px solid #e0e0e0;
}
.action-btn.outline:hover { border-color: #e74c3c; color: #e74c3c; }
</style>
