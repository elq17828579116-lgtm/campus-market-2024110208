<script setup lang="ts"></script>

<template>
  <div class="publish">
    <h1>发布商品</h1>
    <form class="form">
      <div class="field">
        <label>商品名称</label>
        <input placeholder="输入商品名称" />
      </div>
      <div class="field">
        <label>分类</label>
        <select><option>电子产品</option><option>教材书籍</option><option>生活用品</option></select>
      </div>
      <div class="field">
        <label>价格</label>
        <input type="number" placeholder="¥" />
      </div>
      <div class="field">
        <label>描述</label>
        <textarea rows="4" placeholder="描述商品成色、使用情况等"></textarea>
      </div>
      <button type="button" class="btn">发布</button>
    </form>
  </div>
</template>

<style scoped>
.publish { max-width: 500px; }
.form .field { margin-bottom: 16px; }
.form label { display: block; margin-bottom: 4px; color: #555; font-weight: 500; }
.form input, .form select, .form textarea {
  width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px;
  box-sizing: border-box;
}
.btn {
  padding: 10px 32px; border-radius: 6px; border: none; cursor: pointer;
  background: #42b883; color: #fff; font-size: 1em;
}
</style>
