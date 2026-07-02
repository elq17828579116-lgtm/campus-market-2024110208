<script setup lang="ts">
defineProps<{
  text?: string
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="error-state">
    <span class="error-icon">&#x26A0;&#xFE0F;</span>
    <p>{{ text || '加载失败，请检查网络或 Mock 服务' }}</p>
    <button class="retry-btn" @click="emit('retry')">重新加载</button>
  </div>
</template>

<style scoped>
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  color: #b2bec3;
}
.error-icon {
  font-size: 2.5em;
  margin-bottom: 8px;
}
.error-state p {
  margin: 0 0 16px;
  font-size: 0.9em;
}
.retry-btn {
  padding: 8px 24px;
  border-radius: 10px;
  border: 1px solid #e8ecf1;
  background: #fff;
  color: #636e72;
  font-size: 0.85em;
  cursor: pointer;
  transition: all 0.2s;
}
.retry-btn:hover {
  border-color: #2ecc71;
  color: #2ecc71;
}
</style>
