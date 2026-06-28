<script setup lang="ts"></script>

<template>
  <div>
    <h1>数据看板</h1>
    <div class="stats">
      <div class="stat-card">
        <h3>商品总数</h3>
        <p class="num">128</p>
      </div>
      <div class="stat-card">
        <h3>今日发布</h3>
        <p class="num">15</p>
      </div>
      <div class="stat-card">
        <h3>成交订单</h3>
        <p class="num">42</p>
      </div>
      <div class="stat-card">
        <h3>注册用户</h3>
        <p class="num">356</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 16px;
}
.stat-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
}
.num {
  font-size: 2em;
  font-weight: bold;
  color: #42b883;
}
</style>
