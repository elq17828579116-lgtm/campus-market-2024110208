<script setup lang="ts">
const messages = [
  { from: '张三', content: '同学你好，这个商品还在吗？我想今天下午过来看看', time: '10:30', unread: true },
  { from: '李四', content: '价格还能再便宜一点吗？我诚心想要', time: '昨天', unread: true },
  { from: '系统通知', content: '你的商品「高等数学」已审核通过，现在可以公开浏览了', time: '昨天', unread: false },
  { from: '王五', content: '好的，那我们明天中午12点图书馆门口见', time: '3天前', unread: false },
  { from: '系统通知', content: '恭喜！你的商品「工学椅」已成功售出', time: '5天前', unread: false },
]
</script>

<template>
  <div class="msg-page">
    <div class="page-header">
      <h1>消息中心</h1>
      <span class="unread-badge">{{ messages.filter(m => m.unread).length }} 条未读</span>
    </div>

    <div class="msg-list">
      <div v-for="(m, i) in messages" :key="i" class="msg-card" :class="{ unread: m.unread }">
        <div class="msg-avatar" :style="{ background: m.unread ? 'linear-gradient(135deg,#2ecc71,#27ae60)' : '#e0e0e0' }">
          {{ m.from[0] }}
        </div>
        <div class="msg-body">
          <div class="msg-header">
            <span class="msg-from">{{ m.from }}</span>
            <span class="msg-time">{{ m.time }}</span>
          </div>
          <p class="msg-preview">{{ m.content }}</p>
        </div>
        <span v-if="m.unread" class="msg-dot"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.page-header h1 { margin: 0; font-size: 1.6em; color: #2d3436; }
.unread-badge {
  background: #f0fdf4; color: #2ecc71; padding: 4px 14px;
  border-radius: 20px; font-size: 0.8em; font-weight: 600;
}

.msg-list { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }

.msg-card {
  display: flex; gap: 14px; padding: 18px 20px;
  border-bottom: 1px solid #f5f5f5; align-items: flex-start;
  position: relative; cursor: pointer; transition: all 0.2s;
}
.msg-card:last-child { border-bottom: none; }
.msg-card:hover { background: #f8f9fa; }
.msg-card.unread { background: #f0fdf4; }
.msg-card.unread:hover { background: #e8f8ed; }

.msg-avatar {
  width: 44px; height: 44px; border-radius: 50%;
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-weight: bold; flex-shrink: 0;
}

.msg-body { flex: 1; min-width: 0; }
.msg-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
.msg-from { font-weight: 600; color: #2d3436; font-size: 0.9em; }
.msg-time { color: #b2bec3; font-size: 0.8em; }
.msg-preview {
  margin: 0; color: #636e72; font-size: 0.85em; line-height: 1.4;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.msg-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: #2ecc71; flex-shrink: 0; margin-top: 4px;
}
</style>
