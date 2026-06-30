<script setup lang="ts">
defineProps<{
  label: string
  required?: boolean
  error?: string
}>()
</script>

<template>
  <div class="form-field" :class="{ 'has-error': error }">
    <label class="field-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <slot />
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>

<style scoped>
.form-field { margin-bottom: 18px; }
.field-label { display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.9em; color: #2d3436; }
.required { color: #e74c3c; margin-left: 2px; }
.field-error { margin: 4px 0 0; font-size: 0.8em; color: #e74c3c; }
.form-field.has-error :deep(.form-input) { border-color: #e74c3c; background: #fff5f5; }
</style>
