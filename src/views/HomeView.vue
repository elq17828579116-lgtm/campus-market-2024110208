<script setup lang="ts"></script>

<template>
  <section class="home">
    <div class="hero">
      <h2>欢迎来到校园轻集市</h2>
      <p>校园二手交易平台 — 买卖闲置，绿色校园</p>
      <RouterLink to="/list" class="btn">逛逛商品</RouterLink>
      <RouterLink to="/publish" class="btn outline">发布闲置</RouterLink>
    </div>
    <div class="categories">
      <div class="cat" v-for="c in ['电子产品','教材书籍','生活用品','运动器材','衣物配饰','其他']" :key="c">
        <h4>{{ c }}</h4>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home { text-align: center; }
.hero { padding: 60px 0; }
.hero h2 { font-size: 2em; margin-bottom: 8px; color: #333; }
.hero p { color: #777; margin-bottom: 24px; }
.btn {
  display: inline-block; padding: 10px 24px; border-radius: 6px;
  text-decoration: none; margin: 0 8px; font-weight: 500;
  background: #42b883; color: #fff;
}
.btn.outline { background: transparent; border: 2px solid #42b883; color: #42b883; }
.categories {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 32px;
}
.cat {
  border: 1px solid #eee; border-radius: 8px; padding: 24px;
  cursor: pointer; transition: all 0.2s;
}
.cat:hover { border-color: #42b883; color: #42b883; }
</style>
