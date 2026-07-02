# Day6 Evidence - 注册登录、交互优化与体验完善

## 1. 今日完成内容

实现了校园轻集市项目的 Mock 注册/登录功能、用户状态持久化、交互反馈完善和功能走查。具体包括：在 `db.json` 中增加 `users` 数据集合（student1/teacher1 两个预设账号）；创建 `src/api/user.ts` 封装查询和注册用户的 API；重构 `userStore` 使其支持登录、退出和状态恢复，并使用 `localStorage` 实现刷新后持久化；创建注册页面（`RegisterView.vue`）和登录页面（`LoginView.vue`），均通过 JSON Server 完成 Mock 校验；新增 `/login` 和 `/register` 路由；改造导航栏根据登录状态显示不同内容；在发布页面增加未登录拦截；在个人中心增加未登录提示；创建 `LoadingState`、`ErrorState`、`SearchBar` 三个可复用组件，并应用在二手交易页面；优化发布表单、收藏按钮等交互反馈。vue-tsc 类型检查通过。

## 2. 注册登录设计

**用户数据**：在 `db.json` 的 `users` 数组中定义用户，每个用户包含 `username`、`password`、`name`、`college`、`grade`、`studentId` 等字段。预设两个测试账号：`student1 / 123456` 和 `teacher1 / 123456`。

**注册流程**：用户在注册页面填写用户名、密码、姓名、学院、年级和学号。前端校验密码长度（至少 6 位）和两次密码一致性后，调用 `userStore.register()` 通过 `createUser()` 向 `POST /users` 发送请求，JSON Server 自动分配 `id` 并生成默认统计数据。注册成功后跳转到登录页，并显示"注册成功"提示。

**登录流程**：用户输入用户名和密码，调用 `userStore.login()` 通过 `getUsers()` 获取全部用户，在客户端（前端）校验用户名和密码是否匹配。若匹配则调用 `setUserFromData()` 将用户信息写入 Pinia，同时保存一份到 `localStorage`；若匹配失败则抛出"用户名或密码错误"。

**退出流程**：用户点击退出按钮，调用 `userStore.logout()` 清空 Pinia 中的所有用户字段，并删除 `localStorage` 中的用户数据，导航栏自动恢复为未登录状态。

## 3. 状态持久化设计

使用 `localStorage` 进行登录状态持久化。登录成功后，将完整用户对象（`UserData`）通过 `JSON.stringify` 存入 `localStorage` 的 `campus_market_user` 键下。在 `App.vue` 的 `onMounted` 中调用 `userStore.restoreLogin()`，该方法尝试从 `localStorage` 读取并解析用户数据，如果存在则通过 `setUserFromData` 恢复 Pinia 状态。这样即使刷新页面或重新打开浏览器，登录状态仍然保持。

选择 `localStorage` 而非 `sessionStorage` 的原因是：`localStorage` 在关闭标签页/浏览器后仍然保留数据，更接近真实应用中"记住登录"的用户体验预期。Day6 阶段不需要考虑 Token 过期、多端互踢等生产级安全需求，因此 `localStorage` 是最简单且有效的持久化方案。

## 4. 功能边界说明

本项目实现的注册/登录是**教学场景下的 Mock 实现**，不是生产环境安全认证系统。具体差异包括：

- **不实现密码加密**：密码以明文存储在 `db.json` 中
- **不实现 JWT Token**：登录成功后仅保存用户对象到 Pinia 和 localStorage
- **不实现后端 Session**：无服务端登录态维护
- **不实现权限路由**：所有页面均可访问，仅对发布等操作做登录拦截
- **不实现找回密码**、短信验证码、第三方登录等功能
- **不实现头像真实上传**：头像以文字首字母显示

这样设计的原因是本次实训聚焦前端业务流程模拟，让学生理解"登录状态如何影响其他页面"，而不是搭建真实认证系统。

## 5. 交互优化说明

新增三个可复用组件：
- **LoadingState**：请求数据时显示旋转动画和提示文字
- **ErrorState**：请求失败时显示错误信息和"重新加载"按钮，通过 `@retry` 事件触发重新请求
- **SearchBar**：使用 `v-model` 双向绑定的搜索输入框

TradeView 使用这三个组件替换了原有的内联实现，数据加载流程优化为 `fetchTrades()` 函数管理 `loading`/`error` 状态，`onMounted` 时调用。

发布表单优化：未登录时提交会弹出提示并跳转到登录页；提交失败的错误提示更加具体；提交中按钮禁用并显示"发布中..."。

## 6. 页面联动记录

- **导航栏**：未登录显示"登录 / 注册"链接；登录后显示用户首字母头像、用户名和"退出"按钮
- **发布页**：未登录时提交发布弹出提示"请先登录后再发布"并跳转到登录页
- **个人中心**：未登录时显示"请先登录"提示页，包含登录入口按钮
- **二手交易页**：集成 LoadingState、ErrorState 和 SearchBar，搜索、分类筛选、加载状态和错误重试功能完整可用

## 7. AI 协作记录

AI 工具辅助生成了以下内容：
- `src/api/user.ts` 的 API 模块结构，包含 `getUsers()`、`createUser()` 和接口类型定义
- `userStore` 的登录、退出、恢复登录方法框架
- `RegisterView.vue` 和 `LoginView.vue` 的完整页面代码，包含表单校验、错误提示和测试账号展示
- `LoadingState.vue`、`ErrorState.vue`、`SearchBar.vue` 三个可复用组件
- `Day6_Evidence.md` 证据卡初稿

**人工审查与调整**：
- AI 初始生成的 `userStore.login()` 中包含了 JWT 相关的 Token 存储逻辑，我删除了这些超出 Day6 范围的代码
- AI 在 `userStore` 中添加了 `refresh_token` 和 `token_expires_at` 字段，我删除了它们
- AI 在 `App.vue` 中使用了 `onBeforeMount`，我调整为 `onMounted` 以符合 Vue 3 生命周期规范
- 将 `RegisterView.vue` 的学院/年级/学号改为可选字段（仅用户名、密码、姓名为必填），降低注册门槛
- 在 `LoginView.vue` 中补充了"注册成功"提示逻辑（通过路由 query 参数传递）

## 8. 完整功能走查记录

1. 启动 JSON Server（`npm run mock`），确认 `http://localhost:3001/users` 返回用户数据（2 个预设用户）
2. 启动前端项目（`pnpm dev`）
3. 打开首页 `http://localhost:5173`，导航栏显示"登录 / 注册"
4. 点击"注册"，填写新用户信息（用户名 testuser，密码 123456，姓名 测试同学），提交成功
5. 检查 `http://localhost:3001/users` 确认新增用户存在
6. 跳转到登录页，显示"注册成功"提示，使用新用户登录成功
7. 刷新页面，登录状态保持（导航栏仍显示用户名和退出按钮）
8. 进入发布页，发布一条二手交易信息，确认发布人显示为"测试同学"
9. 进入二手交易页，搜索关键词"键盘"，筛选结果正确
10. 收藏一条商品，收藏按钮切换为红色实心状态
11. 进入个人中心，查看收藏列表和已发布内容
12. 点击退出，导航栏恢复为"登录 / 注册"
13. 进入个人中心，显示"请先登录"提示
14. 停止 JSON Server，刷新二手交易页，观察 ErrorState 错误提示；重启 Mock 服务后点击"重新加载"，页面恢复
15. `vue-tsc --noEmit` 类型检查通过

所有走查项目均通过。
