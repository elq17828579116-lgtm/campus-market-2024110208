<script setup lang="ts"></script>

<template>
  <div class="profile">
    <div class="card">
      <div class="avatar">U</div>
      <div class="user-info">
        <h2>用户昵称</h2>
        <p>学号: 2024110208</p>
        <p>已认证 ✓</p>
      </div>
    </div>
    <div class="menu">
      <div class="item">我的发布</div>
      <div class="item">我的订单</div>
      <div class="item">收藏夹</div>
      <div class="item">账号设置</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex; gap: 20px; align-items: center; padding: 24px;
  border: 1px solid #eee; border-radius: 8px; margin-bottom: 16px;
}
.avatar {
  width: 64px; height: 64px; border-radius: 50%; background: #42b883; color: #fff;
  display: flex; align-items: center; justify-content: center; font-size: 1.5em; font-weight: bold;
}
.user-info h2 { margin: 0 0 4px; }
.user-info p { margin: 2px 0; color: #888; }
.menu { border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
.item { padding: 14px 20px; border-bottom: 1px solid #eee; cursor: pointer; }
.item:last-child { border-bottom: none; }
.item:hover { background: #f9f9f9; color: #42b883; }
</style>
