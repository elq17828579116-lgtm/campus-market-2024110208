<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  name: '',
  college: '',
  grade: '',
  studentId: '',
})

const error = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''

  if (!form.value.username.trim() || !form.value.password || !form.value.name.trim()) {
    error.value = '请填写必填字段'
    return
  }
  if (form.value.password.length < 6) {
    error.value = '密码至少 6 位'
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    error.value = '两次密码输入不一致'
    return
  }

  loading.value = true
  try {
    await userStore.register({
      username: form.value.username,
      password: form.value.password,
      name: form.value.name,
      college: form.value.college || '未填写',
      grade: form.value.grade || '未填写',
      studentId: form.value.studentId || '未填写',
    })
    router.push('/login?registered=1')
  } catch {
    error.value = '注册失败，请确认 Mock 服务已启动'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>创建账号</h1>
      <p class="auth-subtitle">加入校园轻集市，开始校园交易之旅</p>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>用户名 *</label>
          <input v-model="form.username" class="form-input" placeholder="用于登录的用户名" />
        </div>
        <div class="form-group">
          <label>密码 *</label>
          <input v-model="form.password" type="password" class="form-input" placeholder="至少 6 位" />
        </div>
        <div class="form-group">
          <label>确认密码 *</label>
          <input v-model="form.confirmPassword" type="password" class="form-input" placeholder="再次输入密码" />
        </div>
        <div class="form-group">
          <label>姓名 *</label>
          <input v-model="form.name" class="form-input" placeholder="你的真实姓名" />
        </div>
        <div class="form-group">
          <label>学院</label>
          <input v-model="form.college" class="form-input" placeholder="例如：计算机科学与技术学院" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>年级</label>
            <input v-model="form.grade" class="form-input" placeholder="例如：2024级" />
          </div>
          <div class="form-group">
            <label>学号</label>
            <input v-model="form.studentId" class="form-input" placeholder="学号" />
          </div>
        </div>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? '注册中...' : '注册' }}
        </button>
      </form>

      <p class="auth-link">
        已有账号？<RouterLink to="/login">去登录</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
.auth-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 16px;
  padding: 36px 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}
.auth-card h1 {
  margin: 0;
  font-size: 1.5em;
  color: #2d3436;
  text-align: center;
}
.auth-subtitle {
  text-align: center;
  color: #b2bec3;
  font-size: 0.88em;
  margin: 6px 0 24px;
}
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  font-size: 0.85em;
  font-weight: 600;
  color: #2d3436;
  margin-bottom: 4px;
}
.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e8ecf1;
  border-radius: 10px;
  font-size: 0.95em;
  color: #2d3436;
  transition: border-color 0.2s;
  box-sizing: border-box;
  background: #fafbfc;
}
.form-input:focus {
  outline: none;
  border-color: #2ecc71;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(46,204,113,0.1);
}
.form-row {
  display: flex;
  gap: 12px;
}
.form-row .form-group {
  flex: 1;
}
.error-msg {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 10px;
  padding: 10px 14px;
  color: #c53030;
  font-size: 0.85em;
  margin-bottom: 16px;
  text-align: center;
}
.submit-btn {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: #fff;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(46,204,113,0.35);
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(46,204,113,0.45);
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.auth-link {
  text-align: center;
  margin-top: 20px;
  font-size: 0.85em;
  color: #b2bec3;
}
.auth-link a {
  color: #2ecc71;
  text-decoration: none;
  font-weight: 600;
}
</style>
