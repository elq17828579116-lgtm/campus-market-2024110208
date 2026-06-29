<template>
  <div class="empty-state">
    <span class="empty-icon">📭</span>
    <p class="empty-text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<style scoped>
.empty-state {
  padding: 48px 32px;
  text-align: center;
  color: #b2bec3;
  background: #fff;
  border-radius: 14px;
  border: 1px dashed #d1d5db;
}
.empty-icon {
  font-size: 2.5em;
  display: block;
  margin-bottom: 12px;
}
.empty-text {
  margin: 0;
  font-size: 0.95em;
}
</style>
