<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useFavoriteStore } from '@/stores/favorite'
import { getTrades, type TradeItem } from '@/api/trade'
import { getLostFounds, type LostFoundItem } from '@/api/lostFound'
import { getGroupBuys, type GroupBuyItem } from '@/api/groupBuy'
import { getErrands, type ErrandItem } from '@/api/errand'

const user = useUserStore()
const fav = useFavoriteStore()

const publishedTrades = ref<TradeItem[]>([])
const publishedLostFounds = ref<LostFoundItem[]>([])
const publishedGroupBuys = ref<GroupBuyItem[]>([])
const publishedErrands = ref<ErrandItem[]>([])
const loadingPublished = ref(true)

const allPublished = ref<{ type: string; id: number; title: string; tag: string; status: string }[]>([])

function typeLabel(type: string) {
  const map: Record<string, string> = {
    trade: '二手', lostFound: '失物', groupBuy: '拼单', errand: '跑腿',
  }
  return map[type] || type
}

onMounted(async () => {
  try {
    const [trades, lostFounds, groupBuys, errands] = await Promise.all([
      getTrades(),
      getLostFounds(),
      getGroupBuys(),
      getErrands(),
    ])
    const myName = user.username
    publishedTrades.value = trades.data.filter(t => t.publisher.includes(myName))
    publishedLostFounds.value = lostFounds.data.filter(l => l.contact.includes(myName))
    publishedGroupBuys.value = groupBuys.data.filter(g => g.publisher.includes(myName))
    publishedErrands.value = errands.data.filter(e => e.publisher.includes(myName))
    allPublished.value = [
      ...publishedTrades.value.map(t => ({ type: 'trade', id: t.id, title: t.title, tag: t.category, status: t.status })),
      ...publishedLostFounds.value.map(l => ({ type: 'lostFound', id: l.id, title: l.title, tag: l.itemName, status: l.status })),
      ...publishedGroupBuys.value.map(g => ({ type: 'groupBuy', id: g.id, title: g.title, tag: g.type, status: g.status })),
      ...publishedErrands.value.map(e => ({ type: 'errand', id: e.id, title: e.title, tag: e.taskType, status: e.status })),
    ]
  } catch {
    // handled
  } finally {
    loadingPublished.value = false
  }
})
</script>

<template>
  <div class="profile-page">
    <div v-if="!user.isLoggedIn" class="login-prompt">
      <div class="prompt-icon">&#x1F464;</div>
      <h2>请先登录</h2>
      <p>登录后查看个人资料和收藏内容</p>
      <RouterLink to="/login" class="prompt-btn">去登录</RouterLink>
    </div>
    <template v-else>
    <div class="profile-cover">
      <div class="cover-grad"></div>
      <div class="profile-info">
        <div class="profile-avatar">{{ user.initials }}</div>
        <div class="profile-text">
          <h2>{{ user.username }}</h2>
          <p class="profile-id">{{ user.college }} &middot; {{ user.grade }}</p>
          <p class="profile-id">学号 {{ user.studentId }} &middot; 加入于 {{ user.joinDate }}</p>
          <div class="profile-badge">
            <span class="badge-item">&#x2705; 实名认证</span>
            <span class="badge-item">&#x1F4F1; 手机绑定</span>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-item"><span class="stat-num">{{ user.publishedCount }}</span><span class="stat-label">发布</span></div>
      <div class="stat-item"><span class="stat-num">{{ user.tradedCount }}</span><span class="stat-label">成交</span></div>
      <div class="stat-item"><span class="stat-num">{{ fav.count }}</span><span class="stat-label">收藏</span></div>
      <div class="stat-item"><span class="stat-num">{{ user.followerCount }}</span><span class="stat-label">关注</span></div>
    </div>

    <div class="section-card">
      <div class="section-title">
        <span>&#x1F4CB; 我的发布</span>
        <span class="section-count">{{ user.publishedCount }} 件</span>
      </div>
      <div v-if="loadingPublished" class="empty-fav"><p>加载中...</p></div>
      <div v-else-if="allPublished.length === 0" class="empty-fav">
        <p>还没有发布过内容，去发布页试试吧</p>
      </div>
      <div v-else class="fav-list">
        <div v-for="item in allPublished" :key="item.type + '-' + item.id" class="fav-item">
          <div class="fav-info">
            <span class="fav-tag" :class="'tag-' + item.type">{{ typeLabel(item.type) }}</span>
            <span class="fav-title">{{ item.title }}</span>
          </div>
          <span class="pub-status" :class="item.status">{{ item.status === 'open' ? '在售' : '已下架' }}</span>
        </div>
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">
        <span>&#x2764;&#xFE0F; 我的收藏</span>
        <span class="section-count">{{ fav.count }} 件</span>
      </div>
      <div v-if="fav.items.length === 0" class="empty-fav">
        <p>还没有收藏任何内容，去列表页逛逛吧</p>
      </div>
      <div v-else class="fav-list">
        <div v-for="fi in fav.items" :key="fi.type + '-' + fi.id" class="fav-item">
          <div class="fav-info">
            <span class="fav-tag" :class="'tag-' + fi.type">{{ typeLabel(fi.type) }}</span>
            <span class="fav-title">{{ fi.title }}</span>
          </div>
          <button class="fav-remove" @click="fav.removeFavorite(fi.type, fi.id)">&#x2716;</button>
        </div>
      </div>
    </div>

    <div class="menu-card">
      <div v-for="item in menuItems" :key="item.label" class="menu-item">
        <span class="menu-icon">{{ item.icon }}</span>
        <span class="menu-label">{{ item.label }}</span>
        <span class="menu-arrow">&#x203A;</span>
      </div>
    </div>
  </template>
  </div>
</template>



<style scoped>
.profile-cover {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
}
.cover-grad {
  height: 120px;
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
}
.profile-info {
  display: flex; gap: 20px; align-items: flex-end;
  padding: 0 24px 24px; margin-top: -40px;
}
.profile-avatar {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg,#2ecc71,#27ae60);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 1.6em; font-weight: bold;
  border: 4px solid #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.profile-text h2 { margin: 0; color: #2d3436; }
.profile-id { margin: 2px 0; color: #b2bec3; font-size: 0.82em; }
.profile-badge { display: flex; gap: 8px; margin-top: 6px; }
.badge-item {
  font-size: 0.72em; color: #2ecc71; background: #f0fdf4;
  padding: 2px 10px; border-radius: 20px;
}

.stats-row {
  display: flex; background: #fff; border-radius: 14px;
  padding: 20px; margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.stat-item {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
  border-right: 1px solid #f0f0f0;
}
.stat-item:last-child { border-right: none; }
.stat-num { font-size: 1.5em; font-weight: 700; color: #2d3436; }
.stat-label { font-size: 0.8em; color: #b2bec3; }

.section-card {
  background: #fff; border-radius: 14px; padding: 20px;
  margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.section-title {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 14px; font-weight: 700; color: #2d3436;
}
.section-count { font-size: 0.8em; color: #b2bec3; font-weight: 400; }

.empty-fav { text-align: center; padding: 20px; color: #b2bec3; font-size: 0.88em; }

.fav-list { display: flex; flex-direction: column; gap: 8px; }
.fav-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 12px; border-radius: 10px;
  background: #f8f9fa; transition: background 0.2s;
}
.fav-item:hover { background: #f0fff4; }
.fav-info { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
.fav-tag {
  flex-shrink: 0; font-size: 0.68em; font-weight: 600;
  padding: 2px 8px; border-radius: 10px;
}
.fav-tag.tag-trade { background: #e8f8f0; color: #27ae60; }
.fav-tag.tag-lostFound { background: #fff3e0; color: #e17055; }
.fav-tag.tag-groupBuy { background: #ede9fe; color: #7c3aed; }
.fav-tag.tag-errand { background: #fce4ec; color: #d63031; }
.fav-title { font-size: 0.85em; color: #2d3436; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pub-status {
  font-size: 0.72em; font-weight: 600; padding: 2px 10px; border-radius: 10px;
}
.pub-status.open { background: #f0fdf4; color: #27ae60; }
.pub-status.closed { background: #f5f5f5; color: #b2bec3; }
.fav-remove {
  background: none; border: none; color: #ddd; cursor: pointer;
  font-size: 0.9em; padding: 4px; transition: color 0.2s;
}
.fav-remove:hover { color: #d63031; }

.menu-card {
  background: #fff; border-radius: 14px; overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.menu-item {
  display: flex; align-items: center; gap: 12px;
  padding: 16px 20px; border-bottom: 1px solid #f5f5f5;
  cursor: pointer; transition: all 0.2s;
}
.menu-item:last-child { border-bottom: none; }
.menu-item:hover { background: #f8f9fa; padding-left: 24px; }
.menu-icon { font-size: 1.2em; }
.menu-label { flex: 1; color: #2d3436; font-weight: 500; }
.menu-arrow { color: #ddd; font-size: 1.3em; }

.login-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.prompt-icon {
  font-size: 3em;
  margin-bottom: 12px;
}
.login-prompt h2 {
  margin: 0;
  color: #2d3436;
}
.login-prompt p {
  color: #b2bec3;
  font-size: 0.88em;
  margin: 6px 0 24px;
}
.prompt-btn {
  display: inline-block;
  padding: 12px 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: #fff;
  font-size: 1em;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(46,204,113,0.35);
}
.prompt-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(46,204,113,0.45);
}
</style>
