import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface FavoriteItem {
  type: 'trade' | 'lostFound' | 'groupBuy' | 'errand'
  id: number
  title: string
  description: string
  tag: string
  addedAt: string
}

export const useFavoriteStore = defineStore('favorite', () => {
  const items = ref<FavoriteItem[]>([])

  const count = computed(() => items.value.length)

  function isFavorited(type: string, id: number): boolean {
    return items.value.some(f => f.type === type && f.id === id)
  }

  function toggleFavorite(item: FavoriteItem) {
    const idx = items.value.findIndex(f => f.type === item.type && f.id === item.id)
    if (idx >= 0) {
      items.value.splice(idx, 1)
    } else {
      items.value.unshift({ ...item, addedAt: new Date().toISOString() })
    }
  }

  function addFavorite(item: FavoriteItem) {
    if (!isFavorited(item.type, item.id)) {
      items.value.unshift({ ...item, addedAt: new Date().toISOString() })
    }
  }

  function removeFavorite(type: string, id: number) {
    const idx = items.value.findIndex(f => f.type === type && f.id === id)
    if (idx >= 0) {
      items.value.splice(idx, 1)
    }
  }

  function getFavoritesByType(type: string): FavoriteItem[] {
    return items.value.filter(f => f.type === type)
  }

  return {
    items, count,
    isFavorited, toggleFavorite, addFavorite, removeFavorite,
    getFavoritesByType,
  }
})
