# 关都文字对战：初始冒险（React 版）

本项目是一个以初代宝可梦为主题的浏览器文字冒险。经过重构后，应用采用 **React + Vite** 构建，并保留了经典的御三家选择与回合制对战体验。

## ✨ 主要特色

- **御三家选择**：从妙蛙种子、小火龙、杰尼龟中挑选你的初始伙伴。
- **回合制战斗**：与野生宝可梦或随机训练家进行 1v1 对战。
- **属性克制**：完整继承火、水、草等属性相克关系。
- **成长系统**：战斗胜利可获得经验、升级并触发进化事件。
- **队伍管理**：查看队伍状态、切换出战宝可梦、在宝可梦中心一键恢复体力。
- **动态消息**：关键事件（升级、学习新招式、进化等）会自动整理进消息面板。

> 💡 旧版的捕捉、商店、存档等功能暂未迁移到 React 版本，后续可在此基础上持续扩展。

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建产物
npm run preview
```

Vite 默认会在 `http://localhost:5173/` 启动开发服务器，浏览器访问即可开始冒险。

## 🌐 纯静态部署

本项目的所有数据与战斗逻辑都打包在前端，无需任何后端服务即可运行。执行构建命令后会生成 `dist/` 目录，直接上传即可发布到任意静态托管平台（GitHub Pages、Vercel、Netlify、OSS 等）。

若需要部署到非根路径（例如 `https://<username>.github.io/<repo>/`），可以使用提供的静态构建脚本，将资源路径改为相对地址：

```bash
npm run build:static
```

完成构建后，可继续使用 `npm run preview` 或 `npx serve dist` 等方式在本地验证静态产物。

### 自动发布到 GitHub Pages

仓库已经配置 GitHub Actions，在主分支收到推送时会自动：

1. 安装依赖并执行 `npm run build:static` 生成相对路径的静态文件；
2. 将 `dist/` 目录上传为构建产物；
3. 将最新构建部署到 GitHub Pages，对外提供可访问的网站。

如需手动触发部署，可在 GitHub 仓库页面的 **Actions** 标签页中选择 “Deploy static site” 工作流并执行 `Run workflow`。

## 🧱 项目结构

```
pokemon-game/
├── index.html              # Vite 入口文件
├── package.json            # 项目依赖与脚本
├── vite.config.js          # Vite 配置
├── src/
│   ├── App.jsx             # 应用入口组件
│   ├── main.jsx            # React 入口
│   ├── styles.css          # 全局样式（沿用旧版视觉）
│   ├── components/         # UI 组件
│   │   ├── BattleScreen.jsx
│   │   ├── MainScreen.jsx
│   │   └── StarterSelection.jsx
│   └── game/               # 核心游戏逻辑与数据
│       ├── battleEngine.js
│       ├── data.js
│       ├── opponents.js
│       ├── pokemon.js
│       └── move.js
├── pokemon_data_generated.js  # 原始宝可梦数据（保留归档）
└── scripts/                  # 旧版脚本（保留参考）
```

## 🧩 技术说明

- **框架**：React 18 + Vite 5
- **样式**：Tailwind CSS CDN + 旧版自定义样式
- **数据来源**：`pokemon_data_generated.js` 中包含的第一世代宝可梦与技能资料
- **战斗引擎**：`src/game/battleEngine.js` 实现了属性克制、命中判定、辅助技能等核心逻辑

## 🛠️ 后续拓展建议

- 迁移商店、背包使用、捕捉系统等旧版功能
- 引入全局状态管理（Redux、Zustand 或 React Context）以支持更复杂的游戏流程
- 增加本地存档、自动保存与载入能力
- 为 UI 引入更丰富的动效与音效

---

欢迎在此 React 版本的基础上继续扩展，打造属于你的关都冒险！
