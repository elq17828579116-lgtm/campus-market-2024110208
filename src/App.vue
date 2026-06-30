<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/home', label: '首页', icon: '\u{1F3E0}' },
  { path: '/trade', label: '二手交易', icon: '\u{1F6D2}' },
  { path: '/lost-found', label: '失物招领', icon: '\u{1F50D}' },
  { path: '/group-buy', label: '拼单搭子', icon: '\u{1F91D}' },
  { path: '/errand', label: '跑腿委托', icon: '\u{1F3C3}' },
  { path: '/publish', label: '发布', icon: '\u2728' },
  { path: '/message', label: '消息', icon: '\u{1F4AC}' },
  { path: '/profile', label: '我的', icon: '\u{1F464}' },
]
</script>

<template>
  <div class="app">
    <header class="top-bar">
      <RouterLink to="/home" class="brand">
        <span class="brand-icon">&#x1F33F;</span>
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
      <p>&#x1F33F; 校园轻集市 &middot; 绿色交易，快乐校园 &middot; Day4 发布表单 + 数据提交</p>
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
  padding: 0 20px;
  height: 60px;
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
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
  font-size: 1.15em;
  font-weight: 700;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav { display: flex; gap: 2px; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 6px 9px;
  border-radius: 8px;
  text-decoration: none;
  color: #636e72;
  font-size: 0.8em;
  transition: all 0.2s ease;
  white-space: nowrap;
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
.nav-icon { font-size: 1em; }

.main {
  flex: 1;
  max-width: 1040px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 20px;
}

.footer {
  text-align: center;
  padding: 20px;
  color: #b2bec3;
  font-size: 0.82em;
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
