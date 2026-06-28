<script setup lang="ts"></script>

<template>
  <div class="profile-page">
    <div class="profile-cover">
      <div class="cover-grad"></div>
      <div class="profile-info">
        <div class="profile-avatar">U</div>
        <div class="profile-text">
          <h2>校园用户</h2>
          <p class="profile-id">学号 2024110208</p>
          <div class="profile-badge">
            <span class="badge-item">✅ 实名认证</span>
            <span class="badge-item">📱 手机绑定</span>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-item"><span class="stat-num">12</span><span class="stat-label">发布</span></div>
      <div class="stat-item"><span class="stat-num">8</span><span class="stat-label">成交</span></div>
      <div class="stat-item"><span class="stat-num">6</span><span class="stat-label">收藏</span></div>
      <div class="stat-item"><span class="stat-num">23</span><span class="stat-label">关注</span></div>
    </div>

    <div class="menu-card">
      <div v-for="item in menuItems" :key="item.label" class="menu-item">
        <span class="menu-icon">{{ item.icon }}</span>
        <span class="menu-label">{{ item.label }}</span>
        <span class="menu-arrow">›</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      menuItems: [
        { icon: '📋', label: '我的发布' },
        { icon: '📦', label: '我的订单' },
        { icon: '❤️', label: '收藏夹' },
        { icon: '💬', label: '交易记录' },
        { icon: '⚙️', label: '账号设置' },
        { icon: '❓', label: '帮助中心' },
      ],
    }
  },
}
</script>

<style scoped>
.profile-cover {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
}
.cover-grad {
  height: 120px;
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
}
.profile-info {
  display: flex; gap: 20px; align-items: flex-end;
  padding: 0 24px 24px; margin-top: -40px;
}
.profile-avatar {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg,#2ecc71,#27ae60);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 1.6em; font-weight: bold;
  border: 4px solid #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.profile-text h2 { margin: 0; color: #2d3436; }
.profile-id { margin: 2px 0; color: #b2bec3; font-size: 0.85em; }
.profile-badge { display: flex; gap: 8px; margin-top: 6px; }
.badge-item {
  font-size: 0.75em; color: #2ecc71; background: #f0fdf4;
  padding: 2px 10px; border-radius: 20px;
}

.stats-row {
  display: flex; background: #fff; border-radius: 14px;
  padding: 20px; margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.stat-item {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
  border-right: 1px solid #f0f0f0;
}
.stat-item:last-child { border-right: none; }
.stat-num { font-size: 1.5em; font-weight: 700; color: #2d3436; }
.stat-label { font-size: 0.8em; color: #b2bec3; }

.menu-card {
  background: #fff; border-radius: 14px; overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.menu-item {
  display: flex; align-items: center; gap: 12px;
  padding: 16px 20px; border-bottom: 1px solid #f5f5f5;
  cursor: pointer; transition: all 0.2s;
}
.menu-item:last-child { border-bottom: none; }
.menu-item:hover { background: #f8f9fa; padding-left: 24px; }
.menu-icon { font-size: 1.2em; }
.menu-label { flex: 1; color: #2d3436; font-weight: 500; }
.menu-arrow { color: #ddd; font-size: 1.3em; }
</style>
