# 《关都文字对战》React版本开发文档

## 📋 为什么选择React？

### React的优势
- ✅ **组件化开发**：每个界面、每个按钮都是独立组件，易于维护
- ✅ **状态管理清晰**：用useState/useContext管理游戏状态，代码更清晰
- ✅ **生态丰富**：有大量现成的库和工具
- ✅ **Vercel部署简单**：一键部署，自动CI/CD
- ✅ **性能优化**：虚拟DOM自动优化渲染性能
- ✅ **开发体验好**：热重载、TypeScript支持、调试工具完善

### 技术栈

```
React + Vite + JavaScript
├── React 18         # 前端框架
├── Vite             # 构建工具（比Webpack快10倍）
├── React Hooks      # 状态管理（useState, useContext, useEffect）
└── CSS Modules      # 样式隔离
```

**为什么选Vite而不是Create React App？**
- 启动速度快（秒开）
- 热更新快
- 构建体积小
- Vercel原生支持

---

## 🏗️ 项目结构

```
pokemon-game/
├── public/                  # 静态资源
│   └── favicon.ico
│
├── src/
│   ├── components/          # React组件
│   │   ├── StarterSelection.jsx    # 初始选择界面
│   │   ├── MainScreen.jsx          # 主界面
│   │   ├── BattleScreen.jsx        # 战斗界面
│   │   ├── PlayerStatus.jsx        # 玩家状态卡片
│   │   ├── WildStatus.jsx          # 野生宝可梦状态
│   │   ├── BattleLog.jsx           # 战斗日志
│   │   ├── MoveButtons.jsx         # 技能按钮组
│   │   └── HPBar.jsx               # HP条组件
│   │
│   ├── data/                # 游戏数据
│   │   ├── pokemonData.js          # 宝可梦数据
│   │   ├── moveData.js             # 技能数据
│   │   ├── typeChart.js            # 属性克制表
│   │   └── expTable.js             # 经验值表
│   │
│   ├── classes/             # 游戏逻辑类
│   │   ├── Pokemon.js              # 宝可梦类
│   │   ├── Move.js                 # 技能类
│   │   └── Battle.js               # 战斗系统
│   │
│   ├── context/             # React Context（全局状态）
│   │   └── GameContext.jsx         # 游戏状态管理
│   │
│   ├── hooks/               # 自定义Hooks
│   │   ├── useLocalStorage.js      # 保存/读取存档
│   │   └── useBattle.js            # 战斗逻辑Hook
│   │
│   ├── styles/              # CSS样式
│   │   ├── global.css              # 全局样式
│   │   ├── StarterSelection.module.css
│   │   ├── MainScreen.module.css
│   │   └── BattleScreen.module.css
│   │
│   ├── utils/               # 工具函数
│   │   ├── generateWildPokemon.js  # 生成野生宝可梦
│   │   └── ai.js                   # AI系统
│   │
│   ├── App.jsx              # 根组件
│   ├── main.jsx             # 入口文件
│   └── index.css            # 基础样式
│
├── .gitignore
├── package.json             # 依赖配置
├── vite.config.js           # Vite配置
├── vercel.json              # Vercel部署配置（可选）
└── README.md
```

---

## 🎨 组件设计架构

### 组件树结构

```
App (游戏主容器)
├── GameContext.Provider (全局状态)
    │
    ├── StarterSelection (初始选择界面)
    │   └── StarterButton × 3
    │
    ├── MainScreen (主界面)
    │   ├── PlayerStatus (玩家状态)
    │   │   ├── HPBar
    │   │   └── ExpBar
    │   ├── MessageBox (消息显示)
    │   └── ActionButtons (功能按钮)
    │
    └── BattleScreen (战斗界面)
        ├── WildStatus (野生宝可梦状态)
        │   └── HPBar
        ├── BattleLog (战斗日志)
        ├── PlayerBattleStatus (玩家战斗状态)
        │   └── HPBar
        └── MoveButtons (技能按钮组)
            └── MoveButton × 4
```

---

## 🔄 状态管理设计

### 使用React Context管理全局状态

```javascript
// context/GameContext.jsx
const GameContext = createContext();

const initialState = {
  // 游戏阶段
  phase: 'start', // 'start' | 'main' | 'battle'

  // 玩家数据
  player: {
    pokemon: null,        // Pokemon实例
    battlesWon: 0,
    totalBattles: 0
  },

  // 战斗数据
  battle: {
    isActive: false,
    wildPokemon: null,
    turn: 0,
    logs: []
  }
};

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(initialState);

  // 选择初始宝可梦
  const selectStarter = (speciesId) => { /* ... */ };

  // 开始战斗
  const startBattle = () => { /* ... */ };

  // 执行回合
  const executeTurn = (playerMove) => { /* ... */ };

  // 保存游戏
  const saveGame = () => { /* ... */ };

  // 加载游戏
  const loadGame = () => { /* ... */ };

  const value = {
    gameState,
    selectStarter,
    startBattle,
    executeTurn,
    saveGame,
    loadGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
```

### 在组件中使用

```javascript
// components/MainScreen.jsx
import { useGame } from '../context/GameContext';

function MainScreen() {
  const { gameState, startBattle } = useGame();

  return (
    <div>
      <PlayerStatus pokemon={gameState.player.pokemon} />
      <button onClick={startBattle}>开始战斗</button>
    </div>
  );
}
```

---

## 🎯 核心Hooks设计

### 1. useLocalStorage（存档管理）

```javascript
// hooks/useLocalStorage.js
export function useLocalStorage(key, initialValue) {
  // 读取localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 保存到localStorage
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

### 2. useBattle（战斗逻辑）

```javascript
// hooks/useBattle.js
export function useBattle(playerPokemon, wildPokemon) {
  const [battle, setBattle] = useState(null);
  const [logs, setLogs] = useState([]);

  // 开始战斗
  const start = () => {
    const newBattle = new Battle(playerPokemon, wildPokemon);
    setBattle(newBattle);
    setLogs([`野生的 ${wildPokemon.name} 出现了！`]);
  };

  // 执行回合
  const executeTurn = (playerMove) => {
    const aiMove = SimpleAI.chooseMove(wildPokemon);
    battle.executeTurn(playerMove, aiMove);
    // 更新日志
    setLogs([...logs, ...battle.getLogs()]);
  };

  return { battle, logs, start, executeTurn };
}
```

---

## 📦 开发步骤（简化版）

### 阶段1：初始化项目（10分钟）

```bash
# 使用Vite创建React项目
npm create vite@latest pokemon-game -- --template react

# 进入项目目录
cd pokemon-game

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器打开 http://localhost:5173 即可看到项目！

---

### 阶段2：创建数据层（1天）
- 复制之前的数据文件（pokemonData.js、moveData.js等）
- 调整为ES6模块导出格式

---

### 阶段3：创建游戏类（1天）
- 创建Pokemon类
- 创建Move类
- 创建Battle类
- 与纯JS版本相同，只需改用ES6模块

---

### 阶段4：创建基础组件（2天）
- 创建布局组件（Header、Footer）
- 创建基础UI组件（Button、HPBar）
- 使用CSS Modules避免样式冲突

---

### 阶段5：创建功能组件（3天）
- StarterSelection组件（初始选择）
- MainScreen组件（主界面）
- BattleScreen组件（战斗界面）
- 各种子组件

---

### 阶段6：集成游戏逻辑（2天）
- 创建GameContext
- 连接组件和游戏逻辑
- 实现状态更新

---

### 阶段7：测试和优化（1天）
- 功能测试
- 响应式测试
- 性能优化

---

### 阶段8：部署到Vercel（5分钟）

```bash
# 构建项目
npm run build

# 如果还没安装Vercel CLI
npm i -g vercel

# 部署（第一次会要求登录）
vercel

# 或者通过GitHub自动部署：
# 1. 推送到GitHub
# 2. 在Vercel网站导入项目
# 3. 自动检测Vite配置并部署
```

---

## 🚀 Vercel部署优势

### 为什么选择Vercel？
1. **零配置**：自动识别Vite项目，无需配置
2. **超快速度**：全球CDN加速
3. **自动CI/CD**：推送到GitHub自动部署
4. **免费额度充足**：个人项目完全够用
5. **HTTPS免费**：自动SSL证书
6. **预览环境**：每个PR都有独立预览链接

### 部署流程

#### 方式1：通过Vercel CLI
```bash
# 1. 安装Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 4. 生产环境部署
vercel --prod
```

#### 方式2：通过Vercel网站（推荐）
1. 访问 https://vercel.com
2. 使用GitHub账号登录
3. 点击"New Project"
4. 选择你的GitHub仓库
5. Vercel自动检测Vite配置
6. 点击"Deploy"
7. 等待30秒，完成！

#### 方式3：通过GitHub自动部署（最推荐）
1. 将代码推送到GitHub
2. 在Vercel导入项目
3. 以后每次push到main分支，自动部署
4. 每个PR都会生成预览链接

### Vercel配置文件（可选）

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

通常不需要这个文件，Vercel会自动识别！

---

## 💡 React开发的优势

### 相比纯HTML/CSS/JS的优势

| 功能 | 纯HTML/JS | React |
|------|-----------|-------|
| **组件复用** | 手动复制HTML | 直接复用组件 |
| **状态管理** | 手动操作DOM | 自动更新UI |
| **代码组织** | 一个大文件 | 分模块清晰 |
| **开发效率** | 手动调试 | 热重载、React DevTools |
| **性能优化** | 手动优化 | 虚拟DOM自动优化 |
| **部署** | 需要服务器 | Vercel一键部署 |
| **维护性** | 代码耦合 | 高内聚低耦合 |

### React代码示例对比

#### 纯JS方式（复杂）
```javascript
// 更新HP条
function updateHP(pokemon) {
  const hpBar = document.getElementById('hp-fill');
  const hpText = document.getElementById('hp-text');
  const percent = (pokemon.currentHP / pokemon.maxHP) * 100;
  hpBar.style.width = percent + '%';
  hpText.textContent = `${pokemon.currentHP}/${pokemon.maxHP}`;
}
```

#### React方式（简洁）
```javascript
// HPBar组件
function HPBar({ current, max }) {
  const percent = (current / max) * 100;
  return (
    <div className="hp-bar">
      <div className="hp-fill" style={{ width: `${percent}%` }} />
      <span>{current}/{max}</span>
    </div>
  );
}

// 使用
<HPBar current={pokemon.currentHP} max={pokemon.maxHP} />
```

---

## 🎓 学习路径

### 如果你不熟悉React

**必学知识**（2-3天）：
1. JSX语法（就是在JS里写HTML）
2. 组件（函数式组件）
3. Props（组件传参）
4. useState（状态管理）
5. useEffect（副作用）

**推荐教程**：
- React官方文档：https://react.dev/learn
- Vite官方文档：https://vitejs.dev/guide/

**快速上手路径**：
1. 跟着官方教程做一遍井字棋（2小时）
2. 理解组件、Props、State概念
3. 直接开始做宝可梦游戏（边做边学）

---

## 📁 下一步行动

我接下来会为你：

1. ✅ **创建React组件设计文档**
   - 每个组件的详细代码
   - Props定义
   - 样式设计

2. ✅ **创建React开发步骤清单**
   - 从`npm create vite`到部署的完整步骤
   - 每一步的代码示例

3. ✅ **初始化项目并创建基础代码**
   - 运行Vite命令创建项目
   - 创建所有目录结构
   - 创建数据文件

4. ✅ **提交到Git并准备部署**
   - 推送到GitHub
   - 提供Vercel部署指南

---

## 🎯 预期效果

完成后你会得到：
- ✅ 一个完整可运行的React项目
- ✅ 在本地可以 `npm run dev` 开发
- ✅ 可以 `npm run build` 构建
- ✅ 可以一键部署到Vercel
- ✅ 拥有独立的线上链接（如：pokemon-game.vercel.app）

**准备好开始了吗？我现在开始创建React组件设计文档！** 🚀
