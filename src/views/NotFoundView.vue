<script setup lang="ts"></script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>
    <RouterLink to="/home">← 返回首页</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 0;
}
h1 {
  font-size: 4em;
  color: #ddd;
  margin: 0;
}
</style>
