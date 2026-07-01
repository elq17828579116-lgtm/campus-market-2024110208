<script setup lang="ts">
import { useMessageStore } from '@/stores/message'

const msg = useMessageStore()
</script>

<template>
  <div class="msg-page">
    <div class="page-header">
      <h1>消息中心</h1>
      <span class="unread-badge">{{ msg.unreadCount }} 条未读</span>
      <button v-if="msg.unreadCount > 0" class="read-all-btn" @click="msg.markAllRead()">全部已读</button>
    </div>

    <div class="msg-list">
      <div v-for="(m, i) in msg.messages" :key="i" class="msg-card" :class="{ unread: m.unread }" @click="msg.markAsRead(i)">
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
.read-all-btn {
  background: none; border: 1px solid #2ecc71; color: #2ecc71;
  padding: 4px 14px; border-radius: 20px; font-size: 0.78em;
  cursor: pointer; transition: all 0.2s; margin-left: auto;
}
.read-all-btn:hover { background: #2ecc71; color: #fff; }

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
