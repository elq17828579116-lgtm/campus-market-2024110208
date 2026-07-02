import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getUsers, createUser, type RegisterInput, type UserData } from '@/api/user'

const STORAGE_KEY = 'campus_market_user'

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const studentId = ref('')
  const college = ref('')
  const grade = ref('')
  const avatar = ref('')
  const isLoggedIn = ref(false)
  const joinDate = ref('')
  const publishedCount = ref(0)
  const tradedCount = ref(0)
  const followerCount = ref(0)

  const displayName = computed(() => username.value || '未登录')
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

  function setUserFromData(data: UserData) {
    username.value = data.name
    studentId.value = data.studentId
    college.value = data.college
    grade.value = data.grade
    joinDate.value = data.joinDate
    publishedCount.value = data.publishedCount
    tradedCount.value = data.tradedCount
    followerCount.value = data.followerCount
    isLoggedIn.value = true
  }

  async function login(loginUsername: string, password: string) {
    const res = await getUsers()
    const user = res.data.find(u => u.username === loginUsername && u.password === password)
    if (!user) throw new Error('用户名或密码错误')
    setUserFromData(user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
  }

  async function register(input: RegisterInput) {
    const user = await createUser(input)
    return user.data
  }

  function restoreLogin() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const data = JSON.parse(raw) as UserData
      setUserFromData(data)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  function logout() {
    username.value = ''
    studentId.value = ''
    college.value = ''
    grade.value = ''
    avatar.value = ''
    joinDate.value = ''
    publishedCount.value = 0
    tradedCount.value = 0
    followerCount.value = 0
    isLoggedIn.value = false
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    username, studentId, college, grade, avatar,
    isLoggedIn, joinDate, publishedCount, tradedCount, followerCount,
    displayName, initials, updateProfile,
    login, register, restoreLogin, logout,
  }
})
