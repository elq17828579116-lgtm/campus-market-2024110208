import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const username = ref('林同学')
  const studentId = ref('2024110208')
  const college = ref('计算机科学与技术学院')
  const grade = ref('2024级')
  const avatar = ref('')
  const isLoggedIn = ref(true)
  const joinDate = ref('2026-03')
  const publishedCount = ref(12)
  const tradedCount = ref(8)
  const followerCount = ref(23)

  const displayName = computed(() => username.value)

  const initials = computed(() => {
    const name = username.value
    return name ? name.charAt(0) : '?'
  })

  function updateProfile(info: Partial<{
    username: string
    college: string
    grade: string
  }>) {
    if (info.username) username.value = info.username
    if (info.college) college.value = info.college
    if (info.grade) grade.value = info.grade
  }

  return {
    username, studentId, college, grade, avatar,
    isLoggedIn, joinDate, publishedCount, tradedCount, followerCount,
    displayName, initials, updateProfile,
  }
})
