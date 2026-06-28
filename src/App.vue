<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/home', label: '首页', icon: '🏠' },
  { path: '/list', label: '商品', icon: '📦' },
  { path: '/publish', label: '发布', icon: '✨' },
  { path: '/message', label: '消息', icon: '💬' },
  { path: '/profile', label: '我的', icon: '👤' },
  { path: '/board', label: '看板', icon: '📊' },
]
</script>

<template>
  <div class="app">
    <header class="top-bar">
      <RouterLink to="/home" class="brand">
        <span class="brand-icon">🌿</span>
        <span class="brand-text">校园轻集市</span>
      </RouterLink>
      <nav class="nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: route.path === item.path }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </RouterLink>
      </nav>
    </header>
    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="footer">
      <p>🌿 校园轻集市 · 绿色交易，快乐校园</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.brand-icon { font-size: 1.6em; }
.brand-text {
  font-size: 1.2em;
  font-weight: 700;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav { display: flex; gap: 4px; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 10px;
  text-decoration: none;
  color: #636e72;
  font-size: 0.9em;
  transition: all 0.25s ease;
}
.nav-item:hover {
  background: rgba(46,204,113,0.08);
  color: #2ecc71;
}
.nav-item.active {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: #fff;
  box-shadow: 0 4px 12px rgba(46,204,113,0.3);
}
.nav-icon { font-size: 1.1em; }

.main {
  flex: 1;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 28px 24px;
}

.footer {
  text-align: center;
  padding: 24px;
  color: #b2bec3;
  font-size: 0.85em;
  border-top: 1px solid rgba(0,0,0,0.04);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
