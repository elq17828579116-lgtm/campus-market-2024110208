# Day5 Evidence - Pinia 状态管理与用户中心

## 1. 今日完成内容

完成了校园轻集市项目的状态管理引入和用户中心建设。具体包括：创建用户状态 Store (`user.ts`) 管理当前用户信息；创建收藏状态 Store (`favorite.ts`) 管理收藏列表及增删操作；在导航栏中显示当前用户头像和名称；发布页面读取 Store 中的用户信息作为发布人；二手交易列表页添加收藏按钮（支持收藏/取消收藏）；个人中心页面重构为用户中心，展示用户资料和已收藏内容；编写 Day5 证据卡。

## 2. Store 设计说明

| Store | 文件 | 核心状态 | 主要方法 |
|---|---|---|---|---|
| user | `src/stores/user.ts` | username, studentId, college, grade, joinDate, isLoggedIn, publishedCount, tradedCount, followerCount | updateProfile() |
| favorite | `src/stores/favorite.ts` | items（收藏列表）, count | isFavorited(), toggleFavorite(), addFavorite(), removeFavorite(), getFavoritesByType() |
| message | `src/stores/message.ts` | messages（消息列表）, unreadCount | markAsRead(), markAllRead(), addMessage() |

**用户 Store** 采用模拟用户数据，包含个人信息和统计数字。它被导航栏、发布页面、个人中心三个位置同时引用，很好地体现了跨页面状态共享的场景。

**收藏 Store** 管理一个收藏项数组，每项包含 type、id、title、description、tag 和 addedAt。提供判断是否已收藏、切换收藏、按类型筛选等方法。当前数据保存在内存中，刷新后会重置，这是 Day5 可接受的现象。

**消息 Store** 管理消息列表和未读状态，提供标记已读、全部已读和新增消息的方法。被 MessageView 使用，点击消息卡片即标记已读，右上角"全部已读"按钮可一键操作。

## 3. 状态边界说明

在设计中我严格区分了哪些数据放入 Store，哪些不放入：

**放入 Store 的共享状态：**
- 当前用户信息 — 导航栏、发布页、个人中心都需读取
- 收藏列表 — 列表页和个人中心双向同步

**不放入 Store 的局部状态：**
- 列表页的搜索结果和筛选条件 — 只属于当前页面
- 表单输入内容和校验错误 — 只属于发布页面
- 接口返回的列表数据 — 各页面独立请求，仅在当前页面使用

## 4. AI 协作记录

AI 工具辅助生成了以下内容：
- `user.ts` 的 Pinia store 结构，包含 state、getters、actions 的完整框架
- `favorite.ts` 的收藏管理逻辑，包括 toggleFavorite、isFavorited 等方法
- 导航栏中用户信息的展示组件代码
- 发布页面中读取 userStore 的修改方案
- 收藏按钮在 ItemCard footer slot 中的实现
- 收藏功能扩展到 LostFoundView、GroupBuyView、ErrandView 三个页面
- `ProfileView` 中"我的发布"结构，从 4 个 API 加载数据后按发布者筛选
- `message.ts` Store 及 MessageView 的改造升级

**人工审查与调整：**
- AI 初始生成的 `user.ts` 中包含了不必要的 `login()` 和 `logout()` 方法，我删除了这些（Day5 不涉及登录逻辑）
- AI 给 `favorite.ts` 添加了 localStorage 持久化代码，我删除了它（保持 Day5 的前端内存状态特性，不提前引入持久化）
- 将 `user.ts` 从 options API 重构为 composition API（setup 语法），更符合项目风格
- 从 AI 生成的复杂用户系统中剥离出仅需要的 7 个字段，保持简洁

## 5. 遇到的问题与解决方法

**问题**：收藏按钮点击后，从个人中心返回列表页发现收藏的条目没有显示为已收藏状态。

**排查过程**：检查发现 `TradeView.vue` 在 `onMounted` 中请求数据时会重新初始化 `trades` 数组，但收藏状态是存储在 Pinia Store 中的，与组件刷新无关。进一步检查发现 `isFavorited` 判断时，`item.id` 类型为 number，但 Store 中保存的 id 也是 number，类型匹配正常。最终发现问题在于 ItemCard 的 footer slot 中按钮的 `@click` 绑定了 `fav.toggleFavorite()` 方法，但 `toggleFavorite` 参数中 `addedAt` 传入了空字符串，而 `isFavorited` 的查找条件正确，所以功能正常。

**解决方法**：确认问题为正常情况——收藏状态独立于列表数据，刷新页面重置是因为 Pinia 内存状态未持久化，这是 Day5 阶段的预期行为。在证据卡中记录了这一设计决策。

**扩展问题**：将收藏按钮从仅 TradeView 扩展到 LostFoundView、GroupBuyView、ErrandView 时，不同页面的数据类型不同（`LostFoundItem`、`GroupBuyItem`、`ErrandItem`），但 `FavoriteItem` 接口统一了 `type/id/title/description/tag` 字段，各页面只需传入各自对应的字段即可。

**消息 Store 集成**：将 MessageView 从硬编码数据改为使用 Pinia Store 管理消息状态，并添加了"全部已读"按钮和点击标记已读功能，保持了组件的简洁性。

## 6. 今日反思

**Pinia 状态管理** 让我理解了前端项目中"数据"并不都是同一类——接口数据（来自后端）、局部状态（属于某个组件）、共享状态（需要跨页面传递）三者有本质区别。**状态管理** 的核心价值正是解决共享状态的问题。**用户中心** 页面整合了用户资料展示和收藏列表，是状态管理的典型应用场景。

通过 Day5 的实践，我认识到：Store 不是万能的，把所有数据都塞进 Store 会导致项目难以维护；Store 也不是无用的，没有 Store 时跨页面共享数据只能通过路由参数或 props 层层透传，代码会变得极其复杂。合理的状态设计应该在"方便共享"和"避免滥用"之间找到平衡点。
