<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="app">
    <header>
      <RouterLink to="/home" class="logo">校园轻集市</RouterLink>
      <nav>
        <RouterLink to="/home" :class="{ active: route.path === '/home' }">首页</RouterLink>
        <RouterLink to="/list" :class="{ active: route.path === '/list' }">商品</RouterLink>
        <RouterLink to="/publish" :class="{ active: route.path === '/publish' }">发布</RouterLink>
        <RouterLink to="/message" :class="{ active: route.path === '/message' }">消息</RouterLink>
        <RouterLink to="/profile" :class="{ active: route.path === '/profile' }">我的</RouterLink>
        <RouterLink to="/board" :class="{ active: route.path === '/board' }">看板</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #42b883;
  padding: 16px 0;
  margin-bottom: 24px;
}
.logo {
  font-size: 1.3em;
  font-weight: bold;
  color: #42b883;
  text-decoration: none;
}
nav {
  display: flex;
  gap: 8px;
}
nav a {
  text-decoration: none;
  color: #555;
  padding: 6px 14px;
  border-radius: 6px;
  transition: all 0.2s;
}
nav a:hover {
  color: #42b883;
  background: #f0fdf4;
}
nav a.active {
  color: #fff;
  background: #42b883;
}
main {
  min-height: 60vh;
}
</style>
