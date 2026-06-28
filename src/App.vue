<script setup lang="ts"></script>

<template>
  <div class="app">
    <header>
      <h1>校园轻集市</h1>
      <nav>
        <RouterLink to="/home">首页</RouterLink>
        <RouterLink to="/list">列表</RouterLink>
        <RouterLink to="/publish">发布</RouterLink>
        <RouterLink to="/message">消息</RouterLink>
        <RouterLink to="/profile">我的</RouterLink>
        <RouterLink to="/board">看板</RouterLink>
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
  border-bottom: 1px solid #eee;
  padding: 16px 0;
  margin-bottom: 24px;
}
nav {
  display: flex;
  gap: 16px;
}
nav a {
  text-decoration: none;
  color: #333;
  padding: 4px 8px;
}
nav a:hover {
  color: #42b883;
}
</style>
