<script setup lang="ts"></script>

<template>
  <div class="not-found">
    <div class="nf-scene">
      <div class="nf-circle"></div>
      <div class="nf-circle nf-small"></div>
      <div class="nf-circle nf-tiny"></div>
      <span class="nf-emoji">🔍</span>
    </div>
    <h1>404</h1>
    <p class="nf-text">咦？这个页面好像飘走了...</p>
    <RouterLink to="/home" class="nf-btn">← 回到首页</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center; padding: 80px 20px;
}
.nf-scene { position: relative; width: 120px; height: 120px; margin: 0 auto 32px; }
.nf-circle {
  position: absolute; width: 120px; height: 120px; border-radius: 50%;
  background: linear-gradient(135deg,#2ecc71,#27ae60); opacity: 0.08;
  animation: pulse 2s ease-in-out infinite;
}
.nf-small { width: 80px; height: 80px; left: 20px; top: 20px; animation-delay: 0.5s; }
.nf-tiny { width: 40px; height: 40px; left: 40px; top: 40px; animation-delay: 1s; }
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.08; }
  50% { transform: scale(1.1); opacity: 0.15; }
}
.nf-emoji { position: absolute; font-size: 2.5em; left: 50%; top: 50%; transform: translate(-50%,-50%); }
h1 { font-size: 5em; margin: 0; background: linear-gradient(135deg,#2ecc71,#27ae60); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.nf-text { color: #b2bec3; font-size: 1.1em; margin: 8px 0 28px; }
.nf-btn {
  display: inline-block; padding: 12px 32px; border-radius: 12px;
  background: linear-gradient(135deg,#2ecc71,#27ae60); color: #fff;
  text-decoration: none; font-weight: 600;
  box-shadow: 0 4px 16px rgba(46,204,113,0.35); transition: all 0.25s ease;
}
.nf-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(46,204,113,0.45); }
</style>
