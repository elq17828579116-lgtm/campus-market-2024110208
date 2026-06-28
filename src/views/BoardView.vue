<script setup lang="ts"></script>

<template>
  <div class="board">
    <h1>数据看板</h1>
    <div class="stats">
      <div class="stat-card"><h3>商品总数</h3><p class="num">128</p></div>
      <div class="stat-card"><h3>今日发布</h3><p class="num">15</p></div>
      <div class="stat-card"><h3>成交订单</h3><p class="num">42</p></div>
      <div class="stat-card"><h3>注册用户</h3><p class="num">356</p></div>
    </div>
    <div class="section">
      <h3>热门分类</h3>
      <div class="bar-chart">
        <div class="bar" v-for="c in [{n:'电子产品',p:80},{n:'教材书籍',p:60},{n:'生活用品',p:45},{n:'运动器材',p:30}]" :key="c.n">
          <span>{{ c.n }}</span>
          <div class="bar-fill" :style="{width: c.p + '%'}"></div>
        </div>
      </div>
    </div>
    <div class="section">
      <h3>最近交易</h3>
      <table>
        <tr><th>商品</th><th>金额</th><th>时间</th></tr>
        <tr><td>微积分教材</td><td>¥25</td><td>今天 10:00</td></tr>
        <tr><td>工学椅</td><td>¥120</td><td>昨天 15:30</td></tr>
        <tr><td>台灯</td><td>¥20</td><td>前天 20:00</td></tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 16px 0;
}
.stat-card {
  border: 1px solid #eee; border-radius: 8px; padding: 24px; text-align: center;
}
.num { font-size: 2em; font-weight: bold; color: #42b883; margin: 8px 0 0; }
.section { margin-top: 32px; }
.bar-chart { max-width: 400px; }
.bar { display: flex; align-items: center; gap: 12px; margin: 8px 0; }
.bar span { width: 80px; color: #555; }
.bar-fill { height: 20px; background: #42b883; border-radius: 4px; }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 10px; border-bottom: 1px solid #eee; }
th { color: #888; font-weight: 500; }
</style>
