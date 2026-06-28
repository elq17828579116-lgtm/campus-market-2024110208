# Day2 过程性证据

## 今日完成内容

- [x] 扩展 7 大页面骨架（Home、List、Detail、Publish、Message、Profile、Board）
- [x] 完善路由系统（7 条路由 + 根路径重定向）
- [x] 构建顶部导航栏（首页、列表、发布、消息、我的、看板）
- [x] 看板页统计信息
- [x] 列表页 → 详情页带参跳转（/detail/:id）
- [x] 填写 Day2 Evidence

## 页面清单

| 页面 | 路由 | 文件 |
|------|------|------|
| 首页 | /home | HomeView.vue |
| 商品列表 | /list | ListView.vue |
| 商品详情 | /detail/:id | DetailView.vue |
| 发布商品 | /publish | PublishView.vue |
| 消息中心 | /message | MessageView.vue |
| 个人中心 | /profile | ProfileView.vue |
| 数据看板 | /board | BoardView.vue |

## 路由设计

- 根路径 `/` 重定向到 `/home`
- 详情页使用动态路由参数 `:id`，从列表页携带 ID 跳转
- 除首页外均使用懒加载（`() => import(...)`）

## 遇到的问题

无

## AI 协作情况

使用 Opencode 完成页面骨架创建、路由配置和导航组件搭建。

## 后续计划

Day3 开始实现用户登录认证和 API 对接。
