<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { addTrade } from '@/api/trade'
import { addLostFound } from '@/api/lostFound'
import { addGroupBuy } from '@/api/groupBuy'
import { addErrand } from '@/api/errand'
import FormField from '@/components/FormField.vue'

const router = useRouter()

const publishTypes = [
  { value: 'trade', label: '二手交易' },
  { value: 'lostFound', label: '失物招领' },
  { value: 'groupBuy', label: '拼单搭子' },
  { value: 'errand', label: '跑腿委托' },
] as const

type PublishType = (typeof publishTypes)[number]['value']

const type = ref<PublishType>('trade')

const form = ref({
  title: '',
  category: '',
  price: 0,
  condition: '',
  location: '',
  contact: '',
  description: '',
  itemName: '',
  eventTime: '',
  targetCount: 1,
  deadline: '',
  taskType: '',
  reward: 0,
  from: '',
  to: '',
  lostFoundType: 'lost' as 'lost' | 'found',
  urgent: false,
})

const errors = ref<Record<string, string>>({})

const submitting = ref(false)
const submitSuccess = ref(false)

function validate(): boolean {
  const e: Record<string, string> = {}

  if (!form.value.title.trim()) e.title = '请输入标题'

  if (type.value === 'trade') {
    if (!form.value.category) e.category = '请选择分类'
    if (form.value.price <= 0) e.price = '请输入有效价格'
    if (!form.value.condition) e.condition = '请选择成色'
  }

  if (type.value === 'lostFound') {
    if (!form.value.itemName.trim()) e.itemName = '请输入物品名称'
    if (!form.value.location.trim()) e.location = '请输入地点'
  }

  if (type.value === 'groupBuy') {
    if (form.value.targetCount < 2) e.targetCount = '目标人数至少为 2'
    if (!form.value.deadline) e.deadline = '请选择截止时间'
  }

  if (type.value === 'errand') {
    if (!form.value.taskType) e.taskType = '请选择任务类型'
    if (form.value.reward <= 0) e.reward = '请输入有效酬劳'
    if (!form.value.from.trim()) e.from = '请输入取件地点'
    if (!form.value.to.trim()) e.to = '请输入送达地点'
  }

  if (!form.value.contact.trim()) e.contact = '请输入联系方式'
  if (!form.value.description.trim()) e.description = '请输入描述'

  errors.value = e
  return Object.keys(e).length === 0
}

function resetForm() {
  form.value = {
    title: '', category: '', price: 0, condition: '',
    location: '', contact: '', description: '',
    itemName: '', eventTime: '', targetCount: 1, deadline: '',
    taskType: '', reward: 0, from: '', to: '',
    lostFoundType: 'lost', urgent: false,
  }
  errors.value = {}
  submitSuccess.value = false
}

watch(type, () => {
  errors.value = {}
  submitSuccess.value = false
})

async function handleSubmit() {
  if (!validate()) return
  submitting.value = true

  try {
    const now = new Date().toISOString()
    const base = {
      title: form.value.title,
      description: form.value.description,
      publisher: '当前用户',
      status: 'active',
      views: 0,
    }

    if (type.value === 'trade') {
      await addTrade({
        ...base,
        category: form.value.category,
        price: form.value.price,
        condition: form.value.condition,
        location: form.value.location,
        image: '',
        images: [],
        contact: form.value.contact,
        publishTime: now,
      })
    } else if (type.value === 'lostFound') {
      await addLostFound({
        ...base,
        type: form.value.lostFoundType,
        itemName: form.value.itemName,
        location: form.value.location,
        eventTime: form.value.eventTime || now,
        contact: form.value.contact,
      })
    } else if (type.value === 'groupBuy') {
      await addGroupBuy({
        ...base,
        type: form.value.category || '其他',
        targetCount: form.value.targetCount,
        currentCount: 1,
        deadline: form.value.deadline,
        location: form.value.location,
      })
    } else if (type.value === 'errand') {
      await addErrand({
        ...base,
        taskType: form.value.taskType,
        reward: form.value.reward,
        from: form.value.from,
        to: form.value.to,
        deadline: form.value.deadline,
        urgent: form.value.urgent,
      })
    }

    submitSuccess.value = true
    resetForm()

    const pathMap: Record<PublishType, string> = {
      trade: '/trade',
      lostFound: '/lost-found',
      groupBuy: '/group-buy',
      errand: '/errand',
    }
    setTimeout(() => router.push(pathMap[type.value]), 1200)
  } catch {
    alert('发布失败，请确认 Mock 服务已启动')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="publish-page">
    <div class="page-header">
      <h1>发布信息</h1>
      <p>选择发布类型，填写信息，分享到校园</p>
    </div>

    <form class="publish-form" @submit.prevent="handleSubmit">
      <div class="form-section">
        <h3 class="form-section-title">发布类型</h3>
        <div class="type-tabs">
          <button
            v-for="t in publishTypes"
            :key="t.value"
            type="button"
            class="type-tab"
            :class="{ active: type === t.value }"
            @click="type = t.value"
          >{{ t.label }}</button>
        </div>
      </div>

      <div class="form-section">
        <h3 class="form-section-title">基本信息</h3>

        <FormField label="标题" required :error="errors.title">
          <input v-model="form.title" class="form-input" placeholder="输入标题" maxlength="50" />
        </FormField>

        <FormField v-if="type === 'trade'" label="分类" required :error="errors.category">
          <select v-model="form.category" class="form-input">
            <option value="">请选择</option>
            <option>电子产品</option><option>教材书籍</option>
            <option>生活用品</option><option>运动器材</option>
            <option>衣物配饰</option><option>其他</option>
          </select>
        </FormField>

        <FormField v-if="type === 'trade'" label="价格（元）" required :error="errors.price">
          <input v-model.number="form.price" type="number" min="0" step="0.01" class="form-input" placeholder="0.00" />
        </FormField>

        <FormField v-if="type === 'trade'" label="成色" required :error="errors.condition">
          <select v-model="form.condition" class="form-input">
            <option value="">请选择</option>
            <option>全新</option><option>几乎全新</option>
            <option>轻微使用痕迹</option><option>明显使用痕迹</option>
          </select>
        </FormField>

        <FormField v-if="type === 'lostFound'" label="类型" required>
          <div class="radio-group">
            <label class="radio"><input v-model="form.lostFoundType" type="radio" value="lost" /> 丢失</label>
            <label class="radio"><input v-model="form.lostFoundType" type="radio" value="found" /> 拾到</label>
          </div>
        </FormField>

        <FormField v-if="type === 'lostFound'" label="物品名称" required :error="errors.itemName">
          <input v-model="form.itemName" class="form-input" placeholder="例如：蓝色校园卡" />
        </FormField>

        <FormField v-if="type === 'groupBuy'" label="目标人数" required :error="errors.targetCount">
          <input v-model.number="form.targetCount" type="number" min="2" class="form-input" />
        </FormField>

        <FormField v-if="type === 'groupBuy' || type === 'errand'" label="截止时间" required :error="errors.deadline">
          <input v-model="form.deadline" type="datetime-local" class="form-input" />
        </FormField>

        <FormField v-if="type === 'errand'" label="任务类型" required :error="errors.taskType">
          <select v-model="form.taskType" class="form-input">
            <option value="">请选择</option>
            <option>取快递</option><option>带餐</option>
            <option>代买</option><option>其他</option>
          </select>
        </FormField>

        <FormField v-if="type === 'errand'" label="酬劳（元）" required :error="errors.reward">
          <input v-model.number="form.reward" type="number" min="0" step="0.5" class="form-input" placeholder="0.00" />
        </FormField>
      </div>

      <div class="form-section">
        <h3 class="form-section-title">详细信息</h3>

        <FormField v-if="type === 'trade' || type === 'lostFound' || type === 'groupBuy'" label="地点" :error="errors.location">
          <input v-model="form.location" class="form-input" placeholder="例如：图书馆、食堂" />
        </FormField>

        <FormField v-if="type === 'errand'" label="取件地点" required :error="errors.from">
          <input v-model="form.from" class="form-input" placeholder="例如：菜鸟驿站" />
        </FormField>

        <FormField v-if="type === 'errand'" label="送达地点" required :error="errors.to">
          <input v-model="form.to" class="form-input" placeholder="例如：西区宿舍" />
        </FormField>

        <FormField v-if="type === 'lostFound'" label="发生时间">
          <input v-model="form.eventTime" type="datetime-local" class="form-input" />
        </FormField>

        <FormField v-if="type === 'errand'" label="加急">
          <label class="checkbox"><input v-model="form.urgent" type="checkbox" /> 标记为加急任务</label>
        </FormField>

        <FormField label="联系方式" required :error="errors.contact">
          <input v-model="form.contact" class="form-input" placeholder="微信 / QQ / 手机号" />
        </FormField>

        <FormField label="描述" required :error="errors.description">
          <textarea v-model="form.description" class="form-input" rows="4" maxlength="500"
            placeholder="详细描述你的信息，越详细越容易吸引同学"></textarea>
        </FormField>
      </div>

      <div v-if="submitSuccess" class="success-banner">✅ 发布成功！即将跳转……</div>

      <button type="submit" class="submit-btn" :disabled="submitting">
        {{ submitting ? '发布中……' : '✨ 立即发布' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 28px; }
.page-header h1 { margin: 0; font-size: 1.6em; color: #2d3436; }
.page-header p { margin: 4px 0 0; color: #b2bec3; font-size: 0.9em; }

.publish-form { max-width: 620px; }

.form-section {
  background: #fff; border-radius: 14px; padding: 24px;
  margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.form-section-title {
  margin: 0 0 16px; font-size: 1em; color: #2d3436;
  padding-left: 12px; border-left: 3px solid #2ecc71;
}

.type-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
.type-tab {
  padding: 8px 20px; border-radius: 20px; border: 1.5px solid #e8ecf1;
  background: #fafbfc; cursor: pointer; font-size: 0.9em; color: #636e72;
  transition: all 0.2s;
}
.type-tab:hover { border-color: #b2bec3; }
.type-tab.active {
  border-color: #2ecc71; background: #f0fdf4; color: #27ae60; font-weight: 600;
}

.form-input {
  width: 100%; padding: 10px 14px; border: 1px solid #e8ecf1;
  border-radius: 10px; font-size: 0.95em; color: #2d3436;
  transition: border-color 0.2s; box-sizing: border-box; background: #fafbfc;
}
.form-input:focus { outline: none; border-color: #2ecc71; background: #fff; box-shadow: 0 0 0 3px rgba(46,204,113,0.1); }
textarea.form-input { resize: vertical; }

.radio-group { display: flex; gap: 20px; }
.radio { display: flex; align-items: center; gap: 6px; font-size: 0.9em; color: #636e72; cursor: pointer; }
.checkbox { display: flex; align-items: center; gap: 6px; font-size: 0.9em; color: #636e72; cursor: pointer; }

.success-banner {
  background: #f0fdf4; border: 1px solid #a7f3d0; border-radius: 10px;
  padding: 12px 16px; margin-bottom: 16px; color: #065f46; font-weight: 500;
  text-align: center;
}

.submit-btn {
  width: 100%; padding: 14px; border-radius: 12px; border: none;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: #fff; font-size: 1em; font-weight: 600; cursor: pointer;
  transition: all 0.25s ease; box-shadow: 0 4px 16px rgba(46,204,113,0.35);
}
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(46,204,113,0.45); }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
