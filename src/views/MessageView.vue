<script setup lang="ts">
const messages = [
  { from: '张三', content: '这个商品还在吗？', time: '10:30' },
  { from: '李四', content: '可以便宜点吗？', time: '昨天' },
  { from: '王五', content: '什么时候方便交易？', time: '昨天' },
  { from: '系统通知', content: '你的商品已审核通过', time: '3天前' },
]
</script>

<template>
  <div class="messages">
    <h1>消息中心</h1>
    <div class="list">
      <div v-for="(m, i) in messages" :key="i" class="msg-card">
        <div class="avatar">{{ m.from[0] }}</div>
        <div class="body">
          <p class="from">{{ m.from }} <span class="time">{{ m.time }}</span></p>
          <p class="preview">{{ m.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list { max-width: 500px; }
.msg-card {
  display: flex; gap: 12px; padding: 16px; border-bottom: 1px solid #eee;
  align-items: flex-start; cursor: pointer;
}
.msg-card:hover { background: #f9f9f9; }
.avatar {
  width: 40px; height: 40px; border-radius: 50%; background: #42b883; color: #fff;
  display: flex; align-items: center; justify-content: center; font-weight: bold;
}
.body { flex: 1; }
.from { margin: 0; font-weight: 500; }
.time { float: right; color: #999; font-size: 0.8em; font-weight: normal; }
.preview { margin: 4px 0 0; color: #888; font-size: 0.9em; }
</style>
