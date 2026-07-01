import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Message {
  from: string
  content: string
  time: string
  unread: boolean
  type?: 'chat' | 'system'
}

export const useMessageStore = defineStore('message', () => {
  const messages = ref<Message[]>([
    { from: '张三', content: '同学你好，这个商品还在吗？我想今天下午过来看看', time: '10:30', unread: true, type: 'chat' },
    { from: '李四', content: '价格还能再便宜一点吗？我诚心想要', time: '昨天', unread: true, type: 'chat' },
    { from: '系统通知', content: '你的商品「高等数学」已审核通过，现在可以公开浏览了', time: '昨天', unread: false, type: 'system' },
    { from: '王五', content: '好的，那我们明天中午12点图书馆门口见', time: '3天前', unread: false, type: 'chat' },
    { from: '系统通知', content: '恭喜！你的商品「工学椅」已成功售出', time: '5天前', unread: false, type: 'system' },
  ])

  const unreadCount = computed(() => messages.value.filter(m => m.unread).length)

  function markAsRead(index: number) {
    if (messages.value[index]) {
      messages.value[index].unread = false
    }
  }

  function markAllRead() {
    messages.value.forEach(m => { m.unread = false })
  }

  function addMessage(msg: Message) {
    messages.value.unshift(msg)
  }

  return {
    messages, unreadCount,
    markAsRead, markAllRead, addMessage,
  }
})
