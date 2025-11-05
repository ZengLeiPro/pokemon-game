# 《关都文字对战》React版本开发步骤清单

## 📋 使用说明

这是React版本的开发清单，比纯HTML/JS版本更简单高效！

**预计完成时间**：8-10天（如果有React基础，5-7天）

---

## 阶段0：环境准备（30分钟）

### 0.1 安装Node.js
- [ ] 访问 https://nodejs.org
- [ ] 下载并安装LTS版本（推荐18.x或20.x）
- [ ] 验证安装：在命令行输入
  ```bash
  node -v    # 应该显示v18.x.x或v20.x.x
  npm -v     # 应该显示9.x.x或10.x.x
  ```

### 0.2 安装代码编辑器
- [ ] 推荐安装VS Code（https://code.visualstudio.com）
- [ ] 安装以下VS Code插件（可选但推荐）：
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint

### 0.3 学习React基础（如果不熟悉）
- [ ] 阅读React官方教程（https://react.dev/learn）
- [ ] 至少完成"井字棋"教程（2小时）
- [ ] 理解概念：组件、Props、State、Hooks

---

## 阶段1：初始化项目（10分钟）

### 1.1 创建Vite+React项目

```bash
# 进入你想放项目的目录
cd ~/Desktop  # 或其他目录

# 使用Vite创建React项目
npm create vite@latest pokemon-game -- --template react

# 进入项目目录
cd pokemon-game

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

- [ ] 执行以上命令
- [ ] 浏览器打开 http://localhost:5173
- [ ] 能看到Vite+React的欢迎页面

### 1.2 清理初始文件

```bash
# 删除不需要的示例文件
rm src/App.css
rm src/index.css
rm public/vite.svg
rm src/assets/react.svg
```

- [ ] 删除示例文件
- [ ] 清空src/App.jsx的内容（稍后重写）

---

## 阶段2：创建项目结构（15分钟）

### 2.1 创建目录结构

```bash
cd src

# 创建所有必要的目录
mkdir components
mkdir data
mkdir classes
mkdir context
mkdir hooks
mkdir styles
mkdir utils
```

- [ ] 创建所有目录
- [ ] 确认src/下有7个子目录

### 2.2 创建空文件占位

```bash
# 组件文件
touch components/StarterSelection.jsx
touch components/MainScreen.jsx
touch components/BattleScreen.jsx
touch components/PlayerStatus.jsx
touch components/WildStatus.jsx
touch components/BattleLog.jsx
touch components/MoveButtons.jsx
touch components/HPBar.jsx
touch components/ExpBar.jsx

# 样式文件
touch styles/StarterSelection.module.css
touch styles/MainScreen.module.css
touch styles/BattleScreen.module.css
touch styles/PlayerStatus.module.css
touch styles/BattleLog.module.css
touch styles/MoveButtons.module.css
touch styles/HPBar.module.css
touch styles/ExpBar.module.css
touch styles/global.css

# 数据文件
touch data/pokemonData.js
touch data/moveData.js
touch data/typeChart.js
touch data/expTable.js

# 类文件
touch classes/Pokemon.js
touch classes/Move.js
touch classes/Battle.js

# Context和Hooks
touch context/GameContext.jsx
touch hooks/useLocalStorage.js
touch hooks/useBattle.js

# 工具函数
touch utils/generateWildPokemon.js
touch utils/ai.js
```

- [ ] 创建所有文件
- [ ] 确认文件结构完整

---

## 阶段3：复制数据文件（1小时）

### 3.1 复制宝可梦数据
参考：《开发文档-数据结构设计.md》

打开 `src/data/pokemonData.js`，复制以下内容：

```javascript
// src/data/pokemonData.js
export const POKEMON_DATA = {
  "charmander": {
    "id": 4,
    "name": "小火龙",
    "nameEn": "Charmander",
    "type": ["火"],
    "baseStats": { "hp": 39, "attack": 52, "defense": 43 },
    "statsGrowth": { "hp": 8, "attack": 3, "defense": 2 },
    "evolutions": [
      { "level": 16, "evolveInto": "charmeleon" },
      { "level": 36, "evolveInto": "charizard" }
    ],
    "learnset": [
      { "level": 1, "move": "ember" },
      { "level": 1, "move": "tailWhip" },
      { "level": 10, "move": "dragonRage" },
      { "level": 16, "move": "scaryFace" }
    ]
  },
  // ... 复制其他宝可梦数据（御三家+进化+5-10只野生）
};
```

- [ ] 复制小火龙完整数据
- [ ] 复制杰尼龟完整数据
- [ ] 复制妙蛙种子完整数据
- [ ] 复制火恐龙、喷火龙等进化形态
- [ ] 复制5-10只野生宝可梦（绿毛虫、小拉达等）

### 3.2 复制技能数据
打开 `src/data/moveData.js`：

```javascript
export const MOVE_DATA = {
  "ember": {
    "name": "火花",
    "nameEn": "Ember",
    "type": "火",
    "category": "attack",
    "power": 40,
    "accuracy": 100,
    "pp": 25,
    "description": "发射小火苗攻击对手"
  },
  // ... 复制其他技能
};
```

- [ ] 复制至少10-15个技能数据
- [ ] 确保每个宝可梦的技能都有对应数据

### 3.3 复制属性克制表
打开 `src/data/typeChart.js`：

```javascript
export const TYPE_CHART = {
  "火": {
    "草": 2.0,
    "冰": 2.0,
    "虫": 2.0,
    "钢": 2.0,
    "火": 0.5,
    "水": 0.5,
    "岩石": 0.5,
    "龙": 0.5
  },
  // ... 复制其他属性
};
```

- [ ] 复制完整的属性克制表

### 3.4 复制经验值表
打开 `src/data/expTable.js`：

```javascript
export const EXP_TABLE = {
  1: 0,
  2: 8,
  3: 27,
  // ... 复制1-50级的经验值
  50: 125000
};
```

- [ ] 复制1-50级经验值表

---

## 阶段4：创建游戏类（2-3小时）

### 4.1 创建Move类
参考：《开发文档-战斗系统.md》

打开 `src/classes/Move.js`，复制完整的Move类代码。

- [ ] 复制Move类
- [ ] 测试：在console创建一个技能实例

### 4.2 创建Pokemon类
打开 `src/classes/Pokemon.js`，复制完整的Pokemon类代码。

- [ ] 复制Pokemon类
- [ ] 包含所有方法：gainExp、levelUp、evolve等
- [ ] 测试：创建一只小火龙并让它升级

### 4.3 创建Battle类
打开 `src/classes/Battle.js`，复制完整的Battle类代码。

- [ ] 复制Battle类
- [ ] 包含所有战斗逻辑
- [ ] 测试：模拟一场战斗

### 4.4 创建工具函数
打开 `src/utils/generateWildPokemon.js`：

```javascript
import Pokemon from '../classes/Pokemon';
import { POKEMON_DATA } from '../data/pokemonData';

const WILD_POKEMON_POOL = [
  { species: "caterpie", minLevel: 2, maxLevel: 7, weight: 30 },
  { species: "weedle", minLevel: 2, maxLevel: 7, weight: 30 },
  { species: "rattata", minLevel: 2, maxLevel: 10, weight: 25 },
  // ... 更多
];

export function generateWildPokemon(playerLevel) {
  // ... 实现逻辑
}
```

- [ ] 实现野生宝可梦生成函数

打开 `src/utils/ai.js`：

```javascript
export class SimpleAI {
  static chooseMove(pokemon) {
    const moves = pokemon.moves;
    return moves[Math.floor(Math.random() * moves.length)];
  }
}
```

- [ ] 实现简单AI

---

## 阶段5：创建React组件（3-4天）

### 5.1 创建基础UI组件

#### HPBar组件
参考：《开发文档-React组件设计.md》

- [ ] 复制HPBar.jsx完整代码
- [ ] 复制HPBar.module.css样式
- [ ] 测试：在App.jsx中引入并显示

#### ExpBar组件
- [ ] 复制ExpBar.jsx完整代码
- [ ] 复制ExpBar.module.css样式

### 5.2 创建功能组件

#### StarterSelection组件（初始选择）
- [ ] 复制StarterSelection.jsx完整代码
- [ ] 复制StarterSelection.module.css样式
- [ ] 测试：能显示3个初始宝可梦按钮

#### PlayerStatus组件（玩家状态卡片）
- [ ] 复制PlayerStatus.jsx完整代码
- [ ] 复制PlayerStatus.module.css样式

#### MainScreen组件（主界面）
- [ ] 复制MainScreen.jsx完整代码
- [ ] 复制MainScreen.module.css样式

#### BattleLog组件（战斗日志）
- [ ] 复制BattleLog.jsx完整代码
- [ ] 复制BattleLog.module.css样式
- [ ] 测试：能自动滚动到最新日志

#### MoveButtons组件（技能按钮）
- [ ] 复制MoveButtons.jsx完整代码
- [ ] 复制MoveButtons.module.css样式

#### BattleScreen组件（战斗界面）
- [ ] 复制BattleScreen.jsx完整代码
- [ ] 复制BattleScreen.module.css样式

### 5.3 样式测试
- [ ] 所有组件在浏览器中显示正常
- [ ] 按钮有hover效果
- [ ] HP条动画流畅
- [ ] 手机端适配正常（打开Chrome的设备模拟器测试）

---

## 阶段6：创建GameContext（1-2天）

### 6.1 实现GameContext
参考：《开发文档-React组件设计.md》的GameContext部分

打开 `src/context/GameContext.jsx`：

- [ ] 复制GameContext完整代码
- [ ] 实现所有方法：
  - [ ] selectStarter
  - [ ] startBattle
  - [ ] executeTurn
  - [ ] endBattle
  - [ ] saveGame
  - [ ] loadGame

### 6.2 连接App组件
打开 `src/App.jsx`：

- [ ] 复制App.jsx完整代码
- [ ] 用GameProvider包裹所有组件
- [ ] 根据phase显示不同界面

### 6.3 测试完整流程
- [ ] 启动开发服务器：`npm run dev`
- [ ] 能看到初始选择界面
- [ ] 点击小火龙，进入主界面
- [ ] 能看到玩家状态（HP、EXP）
- [ ] 点击"开始战斗"，进入战斗界面
- [ ] 能看到野生宝可梦
- [ ] 点击技能按钮，能进行战斗
- [ ] 战斗结束后自动回到主界面
- [ ] HP已回满

---

## 阶段7：实现Hooks（可选，1天）

### 7.1 useLocalStorage Hook
打开 `src/hooks/useLocalStorage.js`：

```javascript
import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

- [ ] 实现useLocalStorage Hook
- [ ] 在GameContext中使用

### 7.2 useBattle Hook（可选）
如果想进一步优化，可以把战斗逻辑抽取到独立Hook。

- [ ] 创建useBattle Hook
- [ ] 在BattleScreen中使用

---

## 阶段8：优化和测试（1-2天）

### 8.1 功能测试清单
- [ ] 选择御三家功能正常
- [ ] 战斗系统运行正常
- [ ] 伤害计算正确
- [ ] 属性克制生效
- [ ] 辅助技能正常（降防御/升防御）
- [ ] 战后自动回血
- [ ] 经验值分发正确
- [ ] 升级功能正常
- [ ] 进化功能正常（16级、36级）
- [ ] 学习新技能功能正常
- [ ] LocalStorage保存/读取正常
- [ ] 刷新页面后进度还在

### 8.2 响应式测试
- [ ] 电脑端显示正常（Chrome、Firefox、Safari）
- [ ] 手机端显示正常（打开Chrome DevTools的设备模拟器）
- [ ] 平板端显示正常
- [ ] 按钮在触摸屏上够大（≥65px）
- [ ] 文字在小屏幕上够大（≥16px）

### 8.3 性能优化
- [ ] 移除所有console.log
- [ ] 检查是否有内存泄漏
- [ ] 确保战斗日志不会无限增长
- [ ] 优化组件渲染（如需要可用React.memo）

### 8.4 代码清理
- [ ] 删除未使用的导入
- [ ] 添加必要的注释
- [ ] 统一代码风格
- [ ] 运行 `npm run build` 确保能成功构建

---

## 阶段9：部署到Vercel（15分钟）

### 9.1 准备部署

```bash
# 测试生产构建
npm run build

# 预览生产版本
npm run preview
```

- [ ] 运行构建命令，确保成功
- [ ] 打开预览，确保功能正常

### 9.2 推送到GitHub

```bash
# 初始化git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Pokemon text battle game"

# 在GitHub创建仓库，然后关联
git remote add origin https://github.com/你的用户名/pokemon-game.git

# 推送
git push -u origin main
```

- [ ] 代码推送到GitHub成功

### 9.3 部署到Vercel

**方式1：通过Vercel网站（推荐）**

1. 访问 https://vercel.com
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择你的 `pokemon-game` 仓库
5. Vercel自动检测Vite配置
6. 点击 "Deploy"
7. 等待30秒...
8. 完成！获得链接（如：pokemon-game-xxx.vercel.app）

- [ ] 在Vercel创建项目
- [ ] 部署成功
- [ ] 获得线上链接
- [ ] 访问链接，确保游戏正常运行

**方式2：通过Vercel CLI**

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

- [ ] 使用CLI部署成功

### 9.4 配置自动部署（推荐）
- [ ] 在Vercel项目设置中，确保启用了GitHub集成
- [ ] 以后每次push到main分支，自动部署
- [ ] 测试：修改一个文件，push，等待自动部署

---

## 阶段10：分享和迭代（持续）

### 10.1 分享游戏
- [ ] 复制Vercel链接
- [ ] 分享给朋友测试
- [ ] 收集反馈

### 10.2 文档完善
- [ ] 更新README.md，添加：
  - 游戏介绍
  - 在线链接
  - 本地运行方法
  - 技术栈
  - 截图

示例README：

```markdown
# 关都文字对战：初始冒险

一个基于React的宝可梦文字对战游戏。

## 🎮 在线试玩
https://pokemon-game-xxx.vercel.app

## 🚀 技术栈
- React 18
- Vite
- CSS Modules
- LocalStorage

## 💻 本地运行
\`\`\`bash
npm install
npm run dev
\`\`\`

## 📸 截图
（添加游戏截图）

## ✨ 功能
- 选择御三家
- 1V1回合制对战
- 属性克制系统
- 升级和进化
- 战后自动回血
- 进度保存

## 📝 License
MIT
```

- [ ] 更新README.md

---

## 🎯 完成标志

当你完成以下所有项，游戏就完成了！

- ✅ 能在本地运行（npm run dev）
- ✅ 能成功构建（npm run build）
- ✅ 已部署到Vercel
- ✅ 线上版本正常运行
- ✅ 所有核心功能正常
- ✅ 手机和电脑都能玩
- ✅ 进度能保存

---

## 🚀 后续扩展

完成MVP后，你可以继续添加：

### 功能扩展
- [ ] 添加更多宝可梦（目标：50只）
- [ ] 添加更多技能
- [ ] 添加道馆挑战模式
- [ ] 添加成就系统
- [ ] 添加背景音乐和音效
- [ ] 添加宝可梦动画（CSS动画或Lottie）

### 技术优化
- [ ] 添加TypeScript支持
- [ ] 使用Zustand或Redux优化状态管理
- [ ] 添加单元测试（Vitest）
- [ ] 添加E2E测试（Playwright）
- [ ] 使用TailwindCSS简化样式
- [ ] 添加PWA支持（离线可玩）

### UI优化
- [ ] 添加深色模式
- [ ] 添加主题切换
- [ ] 优化动画效果
- [ ] 添加加载动画
- [ ] 添加战斗特效

---

## 🆘 常见问题

### 问题1：npm create vite 失败
**解决**：
```bash
# 清除npm缓存
npm cache clean --force

# 使用npx
npx create-vite pokemon-game --template react
```

### 问题2：模块找不到
**解决**：确保所有import路径正确，React组件用`.jsx`后缀。

### 问题3：样式不生效
**解决**：检查CSS Module的导入方式：
```javascript
import styles from './xxx.module.css';
// 使用：className={styles.container}
```

### 问题4：Vercel部署失败
**解决**：
1. 检查package.json的build命令是否为 `"build": "vite build"`
2. 确保没有TypeScript错误（如果不用TS，删除tsconfig.json）
3. 查看Vercel的构建日志找错误

### 问题5：页面刷新后404
**解决**：在项目根目录创建 `vercel.json`：
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 📚 学习资源

- **React官方文档**：https://react.dev
- **Vite官方文档**：https://vitejs.dev
- **Vercel文档**：https://vercel.com/docs
- **CSS Modules**：https://github.com/css-modules/css-modules

---

**祝你开发顺利！用React做会非常快！** 🎉🚀
