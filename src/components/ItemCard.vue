<template>
  <article class="item-card" :class="[colorTheme ? 'theme-' + colorTheme : '']">
    <div v-if="badge" class="card-badge" :class="badgeType">{{ badge }}</div>
    <div v-if="$slots.image" class="card-image">
      <slot name="image" />
    </div>
    <div class="card-body">
      <div class="card-header">
        <h3>{{ title }}</h3>
        <span v-if="tag" class="card-tag" :class="tagType ? 'tag-' + tagType : ''">{{ tag }}</span>
      </div>
      <p class="card-desc">{{ description }}</p>
      <div class="card-meta">
        <span v-if="location" class="meta-chip">📍 {{ location }}</span>
        <span v-if="time" class="meta-chip">🕐 {{ time }}</span>
      </div>
      <div v-if="$slots.footer" class="card-footer">
        <slot name="footer" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  tag?: string
  tagType?: string
  location?: string
  time?: string
  badge?: string
  badgeType?: string
  colorTheme?: string
}>()
</script>

<style scoped>
.item-card {
  border-radius: 16px;
  background: #fff;
  border: 1px solid #eef0f2;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}
.item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.08);
  border-color: #2ecc71;
}

.card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.72em;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.card-badge.urgent { background: #fee2e2; color: #dc2626; }
.card-badge.new { background: #dbeafe; color: #2563eb; }
.card-badge.hot { background: #fef3c7; color: #d97706; }

.card-image {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
}

.card-body { padding: 18px 20px 20px; }

.card-header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}
.card-header h3 {
  margin: 0;
  font-size: 1.05em;
  color: #1a1a2e;
  line-height: 1.4;
}

.card-tag {
  flex-shrink: 0;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.72em;
  font-weight: 600;
  background: linear-gradient(135deg, #e8f8f0, #d0f0e0);
  color: #27ae60;
}
.card-tag.tag-orange { background: #fef3c7; color: #d97706; }
.card-tag.tag-red { background: #fee2e2; color: #dc2626; }
.card-tag.tag-blue { background: #dbeafe; color: #2563eb; }
.card-tag.tag-purple { background: #ede9fe; color: #7c3aed; }

.card-desc {
  margin: 10px 0;
  color: #636e72;
  font-size: 0.88em;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.meta-chip {
  color: #b2bec3;
  font-size: 0.8em;
  background: #f8f9fa;
  padding: 2px 8px;
  border-radius: 6px;
}

.card-footer {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
