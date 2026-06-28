<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<template>
  <div>
    <h1>商品详情</h1>
    <p>商品 ID: {{ id }}</p>
    <RouterLink to="/list">← 返回列表</RouterLink>
  </div>
</template>

<style scoped></style>
