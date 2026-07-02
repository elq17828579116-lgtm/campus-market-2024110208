<script setup lang="ts">
const model = defineModel<string>({ required: true })

defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <div class="search-bar">
    <span class="search-icon">&#x1F50D;</span>
    <input
      v-model="model"
      class="search-input"
      :placeholder="placeholder || '搜索...'"
    />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eef0f2;
  transition: border-color 0.2s;
}
.search-bar:focus-within {
  border-color: #2ecc71;
}
.search-icon {
  font-size: 1em;
}
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.9em;
  background: transparent;
}
</style>
