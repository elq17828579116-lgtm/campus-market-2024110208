# AI Collaboration Card

## 基本信息
- **日期**: 2026-06-27
- **AI 工具**: Opencode (big-pickle)
- **使用场景**: Day1 实验 - 项目理解与目录分析

---

## Prompt 1: 分析项目目录结构

**Prompt**: 分析 campus-market-seed 项目的目录结构，说明每个目录的用途。

**AI 输出**:
```
campus-market-seed/
├── src/               # 源代码目录
│   ├── api/           # API 接口层，存放后端 API 调用
│   ├── components/    # 公共组件库，存放可复用 Vue 组件
│   ├── router/        # 路由配置，定义页面导航规则
│   ├── stores/        # Pinia 状态管理，存放全局状态
│   ├── views/         # 页面视图组件
│   ├── App.vue        # 根组件，应用入口组件
│   └── main.ts        # 应用入口文件，创建 Vue 实例
├── docs/              # 文档目录
│   ├── ai/            # AI 协作记录
│   ├── evidence/      # 过程性证据
│   └── guide/         # 开发指南
├── scripts/           # 辅助脚本
├── public/            # 静态资源
├── package.json       # 项目配置与依赖
└── vite.config.ts     # Vite 构建配置
```

**自己修改**: 无，直接采用。

**最终验证**: 与项目实际目录一致，分析正确。

---

## Prompt 2: 解释 main.ts

**Prompt**: 解释 src/main.ts 中每行代码的作用。

**AI 输出**:
```typescript
import { createApp } from 'vue'        // 从 Vue 导入创建应用的函数
import { createPinia } from 'pinia'    // 从 Pinia 导入创建状态管理的函数

import App from './App.vue'            // 导入根组件
import router from './router'          // 导入路由配置

const app = createApp(App)             // 创建 Vue 应用实例

app.use(createPinia())                 // 注册 Pinia 状态管理插件
app.use(router)                        // 注册路由插件

app.mount('#app')                      // 将应用挂载到 index.html 的 #app 元素上
```

**自己修改**: 无，直接采用。

**最终验证**: 代码逐行对应，解释准确。

---

## Prompt 3: 解释 router 的作用

**Prompt**: 解释 vue-router 在项目中的作用。

**AI 输出**:
Router（路由）是 Vue 单页应用（SPA）的核心机制，负责：
1. **URL 映射** - 将浏览器地址映射到对应的页面组件
2. **页面导航** - 用户点击链接时切换页面，无需刷新
3. **懒加载** - 可以按需加载页面组件，优化性能
4. **导航守卫** - 在页面跳转前后执行逻辑（如登录验证）

在 src/router/index.ts 中，定义了 `/` 路径映射到 HomeView 组件。

**自己修改**: 无，直接采用。

**最终验证**: 路由配置中确实定义了 `/` -> HomeView 的映射。

---

## Prompt 4: 分析项目技术栈

**Prompt**: 分析 campus-market-seed 项目的技术栈。

**AI 输出**:
| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | ^3.5.38 | 前端 UI 框架 |
| Vue Router | ^5.1.0 | 前端路由 |
| Pinia | ^3.0.4 | 状态管理 |
| TypeScript | ~6.0.0 | 类型安全 |
| Vite | ^8.x | 构建工具 |
| ESLint | ^10.x | 代码检查 |
| Oxlint | ~1.69.0 | 性能代码检查 |
| pnpm | 11.9.0 | 包管理器 |
| Node.js | 24.12.0 | 运行环境 |

**自己修改**: 补充了 pnpm 和 Node.js 版本信息。

**最终验证**: 与 package.json 和 .nvmrc 一致。

---

## 总结

通过本次 AI 协作，快速理解了项目整体架构和核心技术栈，为后续开发奠定了基础。AI 在项目初期的"理解项目"阶段能够有效提高效率。
