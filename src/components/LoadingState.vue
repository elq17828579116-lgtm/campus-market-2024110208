<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="loading-state">
    <div class="loading-spinner"></div>
    <p>{{ text || '加载中...' }}</p>
  </div>
</template>

<style scoped>
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  color: #b2bec3;
}
.loading-spinner {
  width: 36px;
  height: 36px;
  margin-bottom: 12px;
  border: 3px solid #eef0f2;
  border-top-color: #2ecc71;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
