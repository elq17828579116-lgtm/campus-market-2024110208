<script setup lang="ts"></script>

<template>
  <div>
    <h1>商品列表</h1>
    <p>浏览校园二手商品</p>
    <div class="product-list">
      <div v-for="i in 6" :key="i" class="product-card">
        <h3><RouterLink :to="`/detail/${i}`">商品 {{ i }}</RouterLink></h3>
        <p>商品描述信息</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
}
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}
</style>
