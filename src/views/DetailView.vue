<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<template>
  <div class="detail">
    <RouterLink to="/list" class="back">← 返回列表</RouterLink>
    <div class="content">
      <div class="image">商品 {{ id }} 图片</div>
      <div class="info">
        <h1>商品 {{ id }}</h1>
        <p class="price">¥{{ 20 + Number(id) * 10 }}</p>
        <p class="desc">这是商品 {{ id }} 的详细描述信息。包括商品成色、购买时间、使用情况等。</p>
        <div class="meta">
          <p><strong>分类：</strong>电子产品</p>
          <p><strong>所在地：</strong>图书馆</p>
          <p><strong>发布时间：</strong>2026-06-27</p>
        </div>
        <button class="btn">联系卖家</button>
        <button class="btn outline">加入收藏</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back { display: inline-block; margin-bottom: 16px; color: #42b883; text-decoration: none; }
.content { display: flex; gap: 32px; }
.image {
  flex: 1; height: 300px; display: flex; align-items: center; justify-content: center;
  background: #f5f5f5; border-radius: 8px; color: #bbb; font-size: 1.2em;
}
.info { flex: 1; }
.price { font-size: 1.5em; color: #f56c6c; font-weight: bold; }
.meta { color: #666; line-height: 1.8; margin: 16px 0; }
.btn {
  padding: 10px 24px; border-radius: 6px; border: none; cursor: pointer;
  background: #42b883; color: #fff; font-size: 1em; margin-right: 12px;
}
.btn.outline { background: transparent; border: 2px solid #42b883; color: #42b883; }
</style>
