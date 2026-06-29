# Day3 Evidence - Mock 数据建模与列表渲染

## 1. 今日完成内容

完成了校园轻集市项目从静态页面到数据驱动页面的关键转换。具体包括：安装 axios 和 json-server 依赖；设计四类核心业务的 Mock 数据结构并创建 `db.json`；配置 `npm run mock` 命令启动 JSON Server；封装 Axios 请求实例 `http.ts`；创建四个业务 API 模块（trade、lostFound、groupBuy、errand）；创建通用列表卡片组件 `ItemCard.vue` 和空状态组件 `EmptyState.vue`；在四个业务视图页面（TradeView、LostFoundView、GroupBuyView、ErrandView）中通过接口请求 Mock 数据并渲染列表；更新路由配置和导航栏以包含新的业务页面；更新首页布局使其引导用户进入四个业务板块。

## 2. Mock 数据结构说明

| 数据集合 | 对应业务 | 主要字段 | 页面用途 |
|---|---|---|---|
| trades | 二手交易 | title、price、category、condition、location、publisher、publishTime、status、description | 展示二手商品列表，含价格和成色信息 |
| lostFounds | 失物招领 | title、type（lost/found）、itemName、location、eventTime、contact、status、description | 展示失物和招领信息，区分丢失/拾到类型 |
| groupBuys | 拼单搭子 | title、type、targetCount、currentCount、deadline、location、publisher、status、description | 展示拼单活动，含进度条显示拼单人数 |
| errands | 跑腿委托 | title、taskType、reward、from、to、deadline、publisher、status、description | 展示跑腿任务，含报酬和起止地点 |

## 3. 我的设计

在设计数据字段时，我围绕"校园场景实用性"这一原则展开：

**二手交易**需要 price 用于展示价格、condition 用于描述成色，因为这是二手交易中最核心的两个决策因子——买家首先关心价格，其次关心物品新旧程度。location 字段方便校内面交，publisher 记录发布人信息，publishTime 展示时间线。

**失物招领**的 type 字段区分"丢失"和"拾到"两种状态，这是业务核心——用户需要快速筛选是丢了东西还是捡到了东西。itemName 明确物品名称，eventTime 记录丢失/拾到时间，contact 字段提供联系方式。

**拼单搭子**的 targetCount 和 currentCount 是核心——用户需要知道还差多少人才能成团。我在 frontend 页面中为此设计了进度条组件，直观展示拼单进度。deadline 字段标明报名截止时间。

**跑腿委托**的 from 和 to 明确起止地点，reward 标明报酬——这是跑腿任务的两个关键要素：顺不顺路和值不值得跑一趟。

我选择了 kebab-case 路径风格（/trade、/lost-found、/group-buy、/errand），保持了 URL 的可读性。每类数据准备了 6 条贴近校园生活的真实场景数据，从教材转让到图书馆占座搭子，确保数据内容学生一看就懂。

## 4. AI 设计

AI 工具（opencode assistant）辅助完成了以下内容：
- 生成了 `db.json` 的四类数据结构和 24 条 Mock 数据；
- 生成了 `http.ts` 的 Axios 基础封装；
- 生成了四个 API 模块的接口定义和请求函数；
- 生成了 `ItemCard.vue` 和 `EmptyState.vue` 组件；
- 生成了四个业务页面的列表渲染代码；
- 生成了路由配置和导航栏更新方案。

AI 生成的数据结构存在一些需要调整的地方：
- AI 初始生成的部分数据场景不够贴近校园生活（例如过于通用的商品描述），我将其改为具体的教材、键盘、充电宝等校园常见物品；
- AI 生成的数据描述偏简短，我补充了更详细的、有真实感的叙述（如"cherry 青轴机械键盘，使用半年，因更换静音键盘转让"）；
- AI 在 item-card 组件中最初未包含 slot 扩展点，我补充了 footer slot 以便各页面展示价格、联系方式等不同内容。

## 5. 最终调整

最终我做了以下几项调整：

1. **数据增强**：将每类数据从 5 条扩展到 6 条，覆盖更多校园场景（如拼接代取蛋糕、图书馆占座搭子等）；
2. **字段完善**：为 trades 增加了 publisher 和 publishTime 字段，为 lostFounds 增加了 contact 字段，保持四类数据字段风格一致；
3. **页面差异化**：虽然四个页面都使用 ItemCard 组件，但每个页面的 footer slot 展示不同内容——交易页面显示价格和分类，失物招领显示联系方式和物品名称，拼单搭子显示进度条，跑腿委托显示报酬；
4. **首页改造**：将原来的通用分类卡片替换为四个业务板块的导航入口，直接引导用户进入具体业务；
5. **路由整合**：保留原有的 /list 路由但重定向到 /trade，保证旧链接仍然可用；
6. **导航栏扩展**：从 6 项扩展到 8 项，将"商品"替换为"二手交易、失物招领、拼单搭子、跑腿委托"四个具体业务入口。

## 6. 遇到的问题与解决方法

**问题**：启动 JSON Server 后，在 Shell 中无法通过 `Invoke-RestMethod` 访问 Mock API，显示"无法连接到远程服务器"。

**排查过程**：检查发现 JSON Server 本身启动日志正常（显示加载了 db.json 并监听着 3001 端口），但在 Shell 工具中无法访问。排查发现是由于 Shell 工具的超时机制导致后台进程被终止——当 `npm run mock` 作为长时间运行的进程通过 `Start-Job` 启动时，Shell 工具的超时会将其连带终止。

**解决方法**：开启两个独立的终端窗口，一个运行 `npm run mock`（持续运行），另一个运行前端开发服务器。用户在实际开发时只需分别打开两个终端即可同时运行前端和 Mock 服务。这个问题的本质是开发环境需要两个并发服务协同工作。

## 7. 今日反思

从"静态页面骨架"到"数据驱动页面"的转换是前端开发中非常重要的一步。**Mock 数据**让前端可以在后端尚未就绪时独立开发；**JSON Server** 提供了零配置的 REST API 模拟能力，对教学实训来说非常友好；**列表渲染**则是数据驱动的最基础形态——通过 `onMounted` 发起请求、用响应式变量接收数据、在模板中 `v-for` 循环渲染。

完成 Day3 后，项目已经具备了基本的数据流：db.json（数据源）→ JSON Server（API 层）→ Axios（请求层）→ Vue 页面（渲染层）。这为 Day4 的发布表单（写数据）、Day5 的 Pinia 状态管理（共享数据）、Day6 的交互优化（动态更新数据）打下了清晰的基础。数据模型设计是否合理直接影响后续开发效率——如果 Day3 的数据字段混乱，后续的接口对接和页面开发都会频繁返工。因此今天在字段设计和数据准备上花时间做细致规划是非常值得的。
