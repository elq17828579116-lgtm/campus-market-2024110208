<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const form = ref({
  username: '',
  password: '',
})

const error = ref('')
const loading = ref(false)
const registered = ref(false)

onMounted(() => {
  if (route.query.registered === '1') {
    registered.value = true
  }
})

async function handleLogin() {
  error.value = ''
  if (!form.value.username.trim() || !form.value.password) {
    error.value = '请输入用户名和密码'
    return
  }

  loading.value = true
  try {
    await userStore.login(form.value.username, form.value.password)
    router.push('/home')
  } catch (e) {
    error.value = e instanceof Error ? e.message : '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>登录</h1>
      <p class="auth-subtitle">欢迎回到校园轻集市</p>

      <div v-if="registered" class="success-banner">注册成功！请使用你的账号登录</div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>用户名</label>
          <input v-model="form.username" class="form-input" placeholder="输入用户名" />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input v-model="form.password" type="password" class="form-input" placeholder="输入密码" />
        </div>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <div class="demo-accounts">
        <p class="demo-title">测试账号</p>
        <span class="demo-item">student1 / 123456</span>
        <span class="demo-item">teacher1 / 123456</span>
      </div>

      <p class="auth-link">
        没有账号？<RouterLink to="/register">去注册</RouterLink>
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
  max-width: 400px;
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
.success-banner {
  background: #f0fdf4;
  border: 1px solid #a7f3d0;
  border-radius: 10px;
  padding: 10px 14px;
  color: #065f46;
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
.demo-accounts {
  margin-top: 20px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 10px;
  text-align: center;
}
.demo-title {
  font-size: 0.78em;
  color: #b2bec3;
  margin: 0 0 6px;
}
.demo-item {
  display: inline-block;
  font-size: 0.82em;
  color: #636e72;
  background: #eef0f2;
  padding: 2px 10px;
  border-radius: 6px;
  margin: 2px 4px;
  font-family: monospace;
}
</style>
