<script setup lang="ts"></script>

<template>
  <div class="publish-page">
    <div class="page-header">
      <h1>发布商品</h1>
      <p>填写信息，让校园里的同学看到你的闲置好物</p>
    </div>

    <form class="publish-form" @submit.prevent>
      <div class="form-section">
        <h3 class="form-section-title">基本信息</h3>

        <div class="form-group">
          <label>商品名称 <span class="required">*</span></label>
          <input placeholder="例如：高等数学第七版" class="form-input" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>分类 <span class="required">*</span></label>
            <select class="form-input">
              <option>电子产品</option><option>教材书籍</option>
              <option>生活用品</option><option>运动器材</option>
              <option>衣物配饰</option><option>其他</option>
            </select>
          </div>
          <div class="form-group">
            <label>价格 <span class="required">*</span></label>
            <input type="number" placeholder="¥" class="form-input" />
          </div>
        </div>

        <div class="form-group">
          <label>商品描述</label>
          <textarea rows="4" placeholder="描述商品成色、使用时长、购买渠道等信息，越详细越容易成交" class="form-input"></textarea>
        </div>
      </div>

      <div class="form-section">
        <h3 class="form-section-title">交易信息</h3>

        <div class="form-group">
          <label>交易地点</label>
          <input placeholder="例如：图书馆、食堂、宿舍区" class="form-input" />
        </div>

        <div class="form-group">
          <label>联系方式</label>
          <input placeholder="微信 / QQ / 手机号" class="form-input" />
        </div>
      </div>

      <div class="form-section">
        <h3 class="form-section-title">上传图片</h3>
        <div class="upload-area">
          <span class="upload-icon">📸</span>
          <p>点击上传商品图片</p>
          <p class="upload-hint">支持 JPG / PNG，最多 6 张</p>
        </div>
      </div>

      <button type="submit" class="submit-btn">✨ 发布商品</button>
    </form>
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 28px; }
.page-header h1 { margin: 0; font-size: 1.6em; color: #2d3436; }
.page-header p { margin: 4px 0 0; color: #b2bec3; font-size: 0.9em; }

.publish-form { max-width: 600px; }

.form-section {
  background: #fff; border-radius: 14px; padding: 24px;
  margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.form-section-title {
  margin: 0 0 16px; font-size: 1em; color: #2d3436;
  padding-left: 12px; border-left: 3px solid #2ecc71;
}

.form-group { margin-bottom: 16px; }
.form-group:last-child { margin-bottom: 0; }
.form-row { display: flex; gap: 16px; }
.form-row .form-group { flex: 1; }

label { display: block; margin-bottom: 6px; color: #636e72; font-weight: 500; font-size: 0.9em; }
.required { color: #e74c3c; }

.form-input {
  width: 100%; padding: 10px 14px; border: 1px solid #e8ecf1;
  border-radius: 10px; font-size: 0.95em; color: #2d3436;
  transition: border-color 0.2s; box-sizing: border-box;
  background: #fafbfc;
}
.form-input:focus { outline: none; border-color: #2ecc71; background: #fff; box-shadow: 0 0 0 3px rgba(46,204,113,0.1); }
textarea.form-input { resize: vertical; }

.upload-area {
  border: 2px dashed #e0e0e0; border-radius: 12px; padding: 40px;
  text-align: center; cursor: pointer; transition: all 0.2s;
}
.upload-area:hover { border-color: #2ecc71; background: #f0fdf4; }
.upload-icon { font-size: 2.5em; display: block; margin-bottom: 8px; }
.upload-area p { margin: 4px 0; color: #636e72; }
.upload-hint { font-size: 0.8em; color: #b2bec3; }

.submit-btn {
  width: 100%; padding: 14px; border-radius: 12px; border: none;
  background: linear-gradient(135deg,#2ecc71,#27ae60);
  color: #fff; font-size: 1em; font-weight: 600; cursor: pointer;
  transition: all 0.25s ease; box-shadow: 0 4px 16px rgba(46,204,113,0.35);
}
.submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(46,204,113,0.45); }
</style>
