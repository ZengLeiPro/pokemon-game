# 开发指南

> 完整的宝可梦文字对战游戏开发文档

## 📚 目录

1. [快速上手](#快速上手)
2. [技术架构](#技术架构)
3. [数据结构设计](#数据结构设计)
4. [战斗系统](#战斗系统)
5. [前端开发](#前端开发)
6. [测试和调试](#测试和调试)
7. [部署指南](#部署指南)

---

## 快速上手

### 环境要求

- 现代浏览器（Chrome 90+, Firefox 88+, Safari 14+, Edge 90+）
- 代码编辑器（推荐 VS Code）
- 本地服务器（可选，用于开发调试）

### 本地运行

```bash
# 方法1：直接打开
双击 index.html 文件

# 方法2：使用 Python 本地服务器
python -m http.server 8000

# 方法3：使用 Node.js http-server
npx http-server

# 然后访问 http://localhost:8000
```

### 项目架构概览

```
核心流程:
选择初始宝可梦 → 野外战斗 → 获得经验 → 升级/进化 → 捕捉宝可梦 → 队伍管理
```

---

## 技术架构

### 技术栈选择

**前端：纯 HTML5 + CSS3 + JavaScript (ES6)**

为什么选择这个方案？
- ✅ 零配置，双击 HTML 即可运行
- ✅ 无需构建工具，无需依赖管理
- ✅ 跨端天然支持（手机/平板/电脑）
- ✅ 易于部署（静态网站托管）
- ✅ 适合文字游戏的轻量级需求

**存储：localStorage**
- 浏览器本地存储，无需服务器
- 简单易用，适合单机游戏
- 存档版本化，支持数据迁移

**样式：Tailwind CSS + 自定义 CSS**
- 快速原型开发
- 响应式设计
- 自定义游戏风格

### 文件结构详解

```
pokemon-game/
├── index.html              # 游戏主页面
│   ├── 游戏容器 (#game-container)
│   ├── 初始选择界面 (#starter-selection)
│   ├── 主界面 (#main-screen)
│   └── 战斗界面 (#battle-screen)
│
├── styles.css              # 样式文件
│   ├── 全局样式
│   ├── 组件样式
│   ├── 响应式设计 (@media queries)
│   └── 动画效果 (@keyframes)
│
├── scripts/
│   ├── data.js            # 游戏数据
│   │   ├── POKEMON_DATA - 151只宝可梦数据
│   │   ├── MOVE_DATA - 技能数据
│   │   ├── TYPE_CHART - 属性克制表
│   │   ├── EXP_TABLE - 经验值表
│   │   └── WILD_POKEMON_POOL - 野生宝可梦池
│   │
│   ├── move.js            # Move 类
│   │   └── 技能的属性和效果
│   │
│   ├── item.js            # Item 类和道具数据
│   │   ├── Item 类定义
│   │   └── ITEM_DATA - 8种道具
│   │
│   ├── pokemon.js         # Pokemon 类
│   │   ├── 属性计算
│   │   ├── gainExp() - 获得经验
│   │   ├── levelUp() - 升级
│   │   ├── evolve() - 进化
│   │   └── checkLearnMove() - 学习技能
│   │
│   ├── npc.js             # NPC 和训练家系统
│   │   ├── NPC 类
│   │   └── TRAINERS - 8位训练家
│   │
│   ├── battle.js          # Battle 类和 AI
│   │   ├── Battle 类 - 战斗流程控制
│   │   ├── SimpleAI - AI 决策
│   │   ├── generateWildPokemon() - 生成野生宝可梦
│   │   ├── calculateCatchRate() - 捕捉率计算
│   │   └── throwPokeball() - 投掷精灵球
│   │
│   ├── gameState.js       # 游戏状态管理
│   │   ├── player - 玩家数据
│   │   │   ├── pokemonTeam - 队伍（最多6只）
│   │   │   ├── activePokemonIndex - 出战索引
│   │   │   ├── bag - 背包
│   │   │   ├── pokemonBox - 盒子
│   │   │   └── money - 金币
│   │   ├── saveGame() - 保存游戏
│   │   └── loadGame() - 读取存档
│   │
│   ├── ui.js              # UI 控制模块
│   │   ├── showScreen() - 界面切换
│   │   ├── updatePlayerStatus() - 更新状态
│   │   ├── addBattleLog() - 添加日志
│   │   ├── renderBag() - 渲染背包
│   │   ├── renderPokemonBox() - 渲染盒子
│   │   └── createMoveButtons() - 创建技能按钮
│   │
│   ├── shop.js            # 商店系统
│   │   ├── renderShop() - 渲染商店
│   │   └── buyItem() - 购买道具
│   │
│   └── main.js            # 主程序入口
│       ├── 初始化游戏
│       ├── 事件绑定
│       └── 流程控制
│
├── pokemon_data_generated.json    # 151只宝可梦完整数据
├── pokemon_data_generated.js      # 同上（JS格式）
│
└── docs/                  # 文档文件夹
    └── archive/           # 归档的旧文档
```

### 核心模块职责

| 模块 | 职责 | 比喻 |
|-----|------|------|
| data.js | 存储所有静态数据 | 游戏的"数据库" |
| pokemon.js | 宝可梦的属性和行为 | "饼干模具" |
| move.js | 技能的属性和效果 | "技能卡" |
| battle.js | 战斗逻辑和裁判 | "裁判系统" |
| ui.js | 界面显示和交互 | "屏幕和手柄" |
| gameState.js | 游戏状态记录 | "存档系统" |
| main.js | 整体流程控制 | "游戏导演" |

---

## 数据结构设计

### 1. 宝可梦数据结构

#### 基础数据模板（data.js 中定义）

```javascript
const POKEMON_DATA = {
  "charmander": {
    "id": 4,                    // 全国图鉴编号
    "name": "小火龙",           // 中文名称
    "nameEn": "Charmander",     // 英文名称
    "type": ["火"],             // 属性（数组，支持双属性）
    "baseStats": {              // 基础属性（1级时）
      "hp": 39,
      "attack": 52,
      "defense": 43,
      "speed": 65
    },
    "statsGrowth": {            // 每升1级的成长值
      "hp": 8,
      "attack": 3,
      "defense": 2,
      "speed": 2
    },
    "evolutions": [             // 进化链
      {
        "level": 16,
        "evolveInto": "charmeleon"
      },
      {
        "level": 36,
        "evolveInto": "charizard"
      }
    ],
    "learnset": [               // 技能学习表
      { "level": 1, "move": "ember" },
      { "level": 1, "move": "tailWhip" },
      { "level": 10, "move": "dragonRage" },
      { "level": 16, "move": "scaryFace" }
    ]
  }
};
```

#### Pokemon 类实例（运行时对象）

```javascript
class Pokemon {
  constructor(speciesId, level) {
    const data = POKEMON_DATA[speciesId];

    // 基础信息
    this.speciesId = speciesId;
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;

    // 等级相关
    this.level = level;
    this.exp = 0;
    this.expToNext = this.calculateExpToNext();

    // 计算属性（基础值 + 成长值 × (等级-1)）
    this.maxHP = data.baseStats.hp + data.statsGrowth.hp * (level - 1);
    this.currentHP = this.maxHP;
    this.attack = data.baseStats.attack + data.statsGrowth.attack * (level - 1);
    this.defense = data.baseStats.defense + data.statsGrowth.defense * (level - 1);
    this.speed = data.baseStats.speed + data.statsGrowth.speed * (level - 1);

    // 技能列表
    this.moves = this.loadMoves(data.learnset, level);

    // 战斗状态
    this.statModifiers = {
      attack: 0,    // -6 到 +6
      defense: 0
    };
  }
}
```

### 2. 技能数据结构

#### 攻击技能示例

```javascript
const MOVE_DATA = {
  "ember": {
    "name": "火花",
    "nameEn": "Ember",
    "type": "火",
    "category": "attack",       // 技能类别：attack 或 support
    "power": 40,                // 威力
    "accuracy": 100,            // 命中率
    "pp": 25,
    "description": "发射小火苗攻击对手"
  }
};
```

#### 辅助技能示例

```javascript
{
  "tailWhip": {
    "name": "摇尾巴",
    "type": "普通",
    "category": "support",
    "power": 0,
    "accuracy": 100,
    "pp": 30,
    "effect": {
      "target": "opponent",     // opponent 或 self
      "stat": "defense",        // attack 或 defense
      "modifier": -1            // -6 到 +6
    },
    "description": "摇晃尾巴降低对方的防御"
  }
}
```

#### 伤害计算公式

```javascript
// 1. 基础伤害
let baseDamage = (attacker.attack * move.power) / defender.defense;

// 2. 属性克制倍数
let typeMultiplier = getTypeEffectiveness(move.type, defender.type);

// 3. 随机系数（0.85 - 1.0）
let randomFactor = 0.85 + Math.random() * 0.15;

// 4. 最终伤害
let finalDamage = Math.floor(baseDamage * typeMultiplier * randomFactor);
```

#### 辅助技能效果

```javascript
// 能力等级对应的倍率
const STAT_STAGE_MULTIPLIERS = {
  '-6': 0.25,  '-5': 0.28,  '-4': 0.33,  '-3': 0.4,
  '-2': 0.5,   '-1': 0.66,  '0': 1.0,
  '1': 1.5,    '2': 2.0,    '3': 2.5,    '4': 3.0,
  '5': 3.5,    '6': 4.0
};

// 例如：防御-1后，实际防御力 = 原防御 × 0.66
```

### 3. 属性克制表

```javascript
const TYPE_CHART = {
  "火": {
    "草": 2.0,     // 火克草
    "冰": 2.0,
    "虫": 2.0,
    "钢": 2.0,
    "火": 0.5,     // 火打火效果不好
    "水": 0.5,
    "岩石": 0.5,
    "龙": 0.5
  },
  "水": {
    "火": 2.0,
    "地面": 2.0,
    "岩石": 2.0,
    "水": 0.5,
    "草": 0.5,
    "龙": 0.5
  },
  "草": {
    "水": 2.0,
    "地面": 2.0,
    "岩石": 2.0,
    "火": 0.5,
    "草": 0.5,
    "毒": 0.5,
    "飞行": 0.5,
    "虫": 0.5,
    "龙": 0.5,
    "钢": 0.5
  },
  "电": {
    "水": 2.0,
    "飞行": 2.0,
    "电": 0.5,
    "草": 0.5,
    "龙": 0.5,
    "地面": 0.0    // 电打地面无效！
  }
  // ... 其他属性
};

// 查询克制倍数
function getTypeEffectiveness(attackType, defenderTypes) {
  let multiplier = 1.0;
  for (let defType of defenderTypes) {
    if (TYPE_CHART[attackType] && TYPE_CHART[attackType][defType]) {
      multiplier *= TYPE_CHART[attackType][defType];
    }
  }
  return multiplier;
}
```

### 4. 经验值等级表

```javascript
const EXP_TABLE = {
  1: 0,
  2: 8,
  3: 27,
  4: 64,
  5: 125,
  // ...
  16: 4096,    // 小火龙进化成火恐龙
  // ...
  36: 46656,   // 火恐龙进化成喷火龙
  // ...
  50: 125000   // 等级上限
};

// 计算升级所需经验
function getExpToNextLevel(currentLevel) {
  if (currentLevel >= 50) return 999999;
  return EXP_TABLE[currentLevel + 1] - EXP_TABLE[currentLevel];
}

// 野生宝可梦给予的经验值
function getExpReward(defeatedPokemonLevel) {
  return defeatedPokemonLevel * 5;
}
```

### 5. 游戏状态数据结构

```javascript
const gameState = {
  player: {
    pokemonTeam: [],           // 队伍（最多6只）
    activePokemonIndex: 0,     // 当前出战宝可梦索引
    bag: {},                   // 背包 {itemId: count}
    pokemonBox: [],            // 盒子（无限容量）
    money: 3000,               // 金币
    battlesWon: 0,             // 胜场数
    totalBattles: 0,           // 总场数
    capturedCount: 0           // 总捕获数
  },

  battle: {
    isActive: false,
    instance: null,            // Battle 实例
    wildPokemon: null,         // 野生宝可梦
    trainer: null              // 训练家（如果是训练家战斗）
  },

  phase: "start"  // "start" | "main" | "battle"
};
```

### 6. 道具数据结构

```javascript
const ITEM_DATA = {
  "potion": {
    "id": "potion",
    "name": "伤药",
    "type": "medicine",
    "effect": { "type": "heal", "value": 20 },
    "price": 300,
    "description": "恢复20点HP"
  },
  "pokeball": {
    "id": "pokeball",
    "name": "精灵球",
    "type": "pokeball",
    "effect": { "type": "catch", "rate": 1.0 },
    "price": 200,
    "description": "用于捕捉野生宝可梦"
  }
  // ... 其他道具
};
```

### 7. 存档数据结构

```javascript
const saveData = {
  version: "3.0",
  timestamp: Date.now(),

  player: {
    pokemonTeam: [
      {
        speciesId: "charmeleon",
        level: 18,
        exp: 5000,
        currentHP: 85,
        maxHP: 85,
        attack: 64,
        defense: 58,
        speed: 80,
        moves: ["ember", "tailWhip", "dragonRage", "scaryFace"]
      }
      // ... 其他宝可梦
    ],
    activePokemonIndex: 0,
    bag: {
      "potion": 5,
      "pokeball": 3
    },
    pokemonBox: [],
    money: 3000,
    battlesWon: 23,
    totalBattles: 30,
    capturedCount: 5
  }
};
```

---

## 战斗系统

### 战斗流程图

```
玩家点击"开始战斗"
    ↓
生成野生宝可梦（等级±2）
    ↓
显示"野生的XX出现了！"
    ↓
【回合开始】
    ↓
玩家选择行动（攻击/道具/逃跑）
    ↓
AI选择技能
    ↓
比较速度（谁快谁先攻击）
    ↓
先攻方执行技能
    ↓
后攻方执行技能（如果没倒下）
    ↓
检查胜负
    ↓
如果分出胜负 → 战斗结束 → 分发经验 → 返回主界面
如果未分出胜负 → 【回合开始】（循环）
```

### Battle 类核心代码

#### 构造函数和开始战斗

```javascript
class Battle {
  constructor(playerPokemon, wildPokemon, battleType = 'wild', trainer = null) {
    this.playerPokemon = playerPokemon;
    this.wildPokemon = wildPokemon;
    this.battleType = battleType;  // 'wild' 或 'trainer'
    this.trainer = trainer;
    this.turn = 0;
    this.isActive = true;
    this.winner = null;
  }

  start() {
    this.turn = 0;
    this.isActive = true;
    this.winner = null;

    // 重置能力等级变化
    this.playerPokemon.statModifiers = { attack: 0, defense: 0 };
    this.wildPokemon.statModifiers = { attack: 0, defense: 0 };

    // 显示遭遇文字
    UI.clearBattleLog();
    if (this.battleType === 'trainer') {
      UI.addBattleLog(`${this.trainer.name} 向你发起了挑战！`);
    }
    UI.addBattleLog(`野生的 ${this.wildPokemon.name} Lv.${this.wildPokemon.level} 出现了！`);
    UI.updateBattleStatus(this.playerPokemon, this.wildPokemon);
  }
}
```

#### 执行回合

```javascript
executeTurn(playerMove, aiMove) {
  this.turn++;
  UI.addBattleLog(`\n--- 第 ${this.turn} 回合 ---`);

  // 决定行动顺序（速度快的先攻击）
  const playerSpeed = this.playerPokemon.speed || 50;
  const wildSpeed = this.wildPokemon.speed || 50;

  let firstAttacker, firstMove, secondAttacker, secondMove;

  if (playerSpeed >= wildSpeed) {
    firstAttacker = this.playerPokemon;
    firstMove = playerMove;
    secondAttacker = this.wildPokemon;
    secondMove = aiMove;
  } else {
    firstAttacker = this.wildPokemon;
    firstMove = aiMove;
    secondAttacker = this.playerPokemon;
    secondMove = playerMove;
  }

  // 先攻方行动
  this.executeMove(firstAttacker, secondAttacker, firstMove);
  if (this.checkBattleEnd()) {
    return this.endBattle();
  }

  // 后攻方行动
  this.executeMove(secondAttacker, firstAttacker, secondMove);
  if (this.checkBattleEnd()) {
    return this.endBattle();
  }

  // 更新UI
  UI.updateBattleStatus(this.playerPokemon, this.wildPokemon);
}
```

#### 执行攻击技能

```javascript
executeAttackMove(attacker, defender, move) {
  // 1. 计算基础伤害
  const attackStat = this.getModifiedStat(attacker, 'attack');
  const defenseStat = this.getModifiedStat(defender, 'defense');
  let baseDamage = (attackStat * move.power) / defenseStat;

  // 2. 属性克制倍数
  const typeMultiplier = this.getTypeEffectiveness(move.type, defender.type);

  // 3. 随机系数（0.85 - 1.0）
  const randomFactor = 0.85 + Math.random() * 0.15;

  // 4. 最终伤害（向下取整，最少1点）
  let finalDamage = Math.floor(baseDamage * typeMultiplier * randomFactor);
  finalDamage = Math.max(1, finalDamage);

  // 5. 应用伤害
  defender.currentHP -= finalDamage;
  defender.currentHP = Math.max(0, defender.currentHP);

  // 6. 显示伤害信息
  if (typeMultiplier === 2.0) {
    UI.addBattleLog(`效果绝佳！造成 ${finalDamage} 点伤害！`, 'critical');
  } else if (typeMultiplier === 0.5) {
    UI.addBattleLog(`效果不好...造成 ${finalDamage} 点伤害`, '');
  } else if (typeMultiplier === 0.0) {
    UI.addBattleLog(`对 ${defender.name} 无效！`, '');
    return;
  } else {
    UI.addBattleLog(`造成 ${finalDamage} 点伤害！`);
  }

  const defenderName = defender === this.playerPokemon ?
    `你的 ${defender.name}` : `野生的 ${defender.name}`;
  UI.addBattleLog(`${defenderName} 剩余 HP: ${defender.currentHP}/${defender.maxHP}`);
}
```

#### 捕捉系统

```javascript
// 计算捕捉率
calculateCatchRate(pokemon, pokeballRate) {
  // HP因子：(maxHP × 3 - currentHP × 2) / (maxHP × 3)
  const hpFactor = (pokemon.maxHP * 3 - pokemon.currentHP * 2) / (pokemon.maxHP * 3);

  // 等级因子：(50 - level) / 50
  const levelFactor = (50 - pokemon.level) / 50;

  // 综合捕捉率
  let catchRate = (hpFactor * 0.6 + levelFactor * 0.4) * pokeballRate;

  // 限制在5%-95%之间（大师球除外）
  if (pokeballRate < 999) {
    catchRate = Math.max(0.05, Math.min(0.95, catchRate));
  } else {
    catchRate = 1.0;  // 大师球必定成功
  }

  return catchRate;
}

// 投掷精灵球
throwPokeball(pokeballId) {
  if (this.battleType !== 'wild') {
    UI.addBattleLog('不能捕捉训练家的宝可梦！');
    return false;
  }

  const item = getItemById(pokeballId);
  const catchRate = this.calculateCatchRate(this.wildPokemon, item.effect.rate);

  UI.addBattleLog(`使用了 ${item.name}！`);
  UI.addBattleLog('精灵球晃动了一下...');

  setTimeout(() => {
    if (Math.random() < catchRate) {
      // 捕捉成功
      UI.addBattleLog(`成功捕捉了 ${this.wildPokemon.name}！`, 'success');

      // 添加到队伍或盒子
      if (gameState.player.pokemonTeam.length < 6) {
        addPokemonToTeam(this.wildPokemon);
        UI.addBattleLog(`${this.wildPokemon.name} 加入了你的队伍！`);
      } else {
        addPokemonToBox(this.wildPokemon);
        UI.addBattleLog(`${this.wildPokemon.name} 已传送到盒子！`);
      }

      this.winner = 'player';
      this.endBattle();
    } else {
      // 捕捉失败
      UI.addBattleLog('哎呀！差一点就抓到了！');

      // 对手回合
      const aiMove = SimpleAI.chooseMove(this.wildPokemon, this.playerPokemon);
      this.executeMove(this.wildPokemon, this.playerPokemon, aiMove);

      if (this.checkBattleEnd()) {
        this.endBattle();
      } else {
        UI.setMoveButtonsEnabled(true);
      }
    }
  }, 1500);

  return true;
}
```

### AI 系统

#### 简单 AI

```javascript
class SimpleAI {
  static chooseMove(pokemon, opponent) {
    const moves = pokemon.moves;

    // 优先选择克制对手的攻击技能
    const effectiveMoves = moves.filter(move => {
      if (move.category !== 'attack') return false;
      const effectiveness = getTypeEffectiveness(move.type, opponent.type);
      return effectiveness > 1.0;
    });

    if (effectiveMoves.length > 0) {
      return effectiveMoves[Math.floor(Math.random() * effectiveMoves.length)];
    }

    // 否则随机选择攻击技能
    const attackMoves = moves.filter(m => m.category === 'attack');
    if (attackMoves.length > 0) {
      return attackMoves[Math.floor(Math.random() * attackMoves.length)];
    }

    // 实在没有就随机选
    return moves[Math.floor(Math.random() * moves.length)];
  }
}
```

### 野生宝可梦生成

```javascript
function generateWildPokemon(playerLevel) {
  // 1. 确定等级范围（玩家等级±2）
  const minLevel = Math.max(1, playerLevel - 2);
  const maxLevel = Math.min(50, playerLevel + 2);

  // 2. 筛选符合等级范围的宝可梦
  const availablePool = WILD_POKEMON_POOL.filter(entry => {
    return entry.maxLevel >= minLevel && entry.minLevel <= maxLevel;
  });

  if (availablePool.length === 0) {
    return new Pokemon('rattata', playerLevel);
  }

  // 3. 加权随机选择
  const totalWeight = availablePool.reduce((sum, entry) => sum + entry.weight, 0);
  let random = Math.random() * totalWeight;

  for (let entry of availablePool) {
    random -= entry.weight;
    if (random <= 0) {
      const wildLevel = minLevel + Math.floor(Math.random() * (maxLevel - minLevel + 1));
      return new Pokemon(entry.species, wildLevel);
    }
  }

  return new Pokemon('rattata', playerLevel);
}
```

---

## 前端开发

### HTML 结构

#### 主要界面容器

```html
<div id="game-container">
  <!-- 标题栏 -->
  <header id="game-header">
    <h1>关都文字对战：初始冒险</h1>
  </header>

  <main id="game-main">
    <!-- 初始选择界面 -->
    <div id="starter-selection" class="screen active">
      <!-- 御三家选择按钮 -->
    </div>

    <!-- 主界面 -->
    <div id="main-screen" class="screen">
      <div id="player-status"><!-- 玩家状态 --></div>
      <div id="message-box"><!-- 消息框 --></div>
      <div id="action-buttons"><!-- 功能按钮 --></div>
    </div>

    <!-- 战斗界面 -->
    <div id="battle-screen" class="screen">
      <div id="wild-status"><!-- 野生宝可梦状态 --></div>
      <div id="battle-log"><!-- 战斗日志 --></div>
      <div id="player-battle-status"><!-- 玩家宝可梦状态 --></div>
      <div id="move-buttons"><!-- 技能按钮 --></div>
    </div>
  </main>

  <footer id="game-footer">
    <p>战绩：<span id="wins">0</span>胜 <span id="total">0</span>战</p>
  </footer>
</div>
```

#### 界面切换逻辑

```javascript
// UI.js
const UI = {
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
  }
};

// 使用方式
UI.showScreen('battle-screen');  // 切换到战斗界面
```

### CSS 样式规范

#### 全局样式

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

#game-container {
  width: 100%;
  max-width: 600px;
  background: #f5f5dc;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
```

#### 界面切换动画

```css
.screen {
  display: none;
}

.screen.active {
  display: block;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### 响应式设计（手机适配）

```css
@media (max-width: 600px) {
  body {
    padding: 10px;
  }

  /* 确保按钮足够大（触摸友好） */
  .action-btn,
  .move-btn,
  .starter-btn {
    min-height: 65px;  /* 苹果推荐的最小触摸区域 */
    font-size: 18px;
  }

  /* 字体不能太小 */
  #message-box,
  #battle-log {
    font-size: 18px;
  }
}
```

#### 颜色方案

```css
:root {
  /* 背景色 */
  --bg-primary: #f5f5dc;
  --bg-secondary: #ffffff;

  /* 文字颜色 */
  --text-primary: #2c3e50;
  --text-secondary: #7f8c8d;

  /* 按钮颜色 */
  --btn-primary: #3498db;
  --btn-primary-hover: #2980b9;
  --btn-secondary: #95a5a6;

  /* 状态颜色 */
  --color-hp: #e74c3c;
  --color-exp: #f39c12;
  --color-success: #27ae60;
  --color-critical: #e74c3c;

  /* 属性颜色 */
  --type-fire: #f08030;
  --type-water: #6890f0;
  --type-grass: #78c850;
  --type-electric: #f8d030;
}
```

### UI 控制模块

#### 核心 UI 函数

```javascript
const UI = {
  // 更新玩家状态
  updatePlayerStatus(pokemon) {
    document.getElementById('player-pokemon-name').textContent = pokemon.name;
    document.getElementById('player-pokemon-level').textContent = `Lv.${pokemon.level}`;
    document.getElementById('player-current-hp').textContent = pokemon.currentHP;
    document.getElementById('player-max-hp').textContent = pokemon.maxHP;

    const hpPercent = (pokemon.currentHP / pokemon.maxHP) * 100;
    document.getElementById('player-hp-fill').style.width = `${hpPercent}%`;

    const expPercent = (pokemon.exp / pokemon.expToNext) * 100;
    document.getElementById('player-exp-fill').style.width = `${expPercent}%`;
  },

  // 显示消息
  showMessage(text) {
    document.getElementById('message-text').textContent = text;
  },

  // 添加战斗日志
  addBattleLog(text, cssClass = '') {
    const logDiv = document.getElementById('battle-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${cssClass}`;
    entry.textContent = text;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
  },

  // 清空战斗日志
  clearBattleLog() {
    document.getElementById('battle-log').innerHTML = '';
  },

  // 生成技能按钮
  createMoveButtons(moves, onMoveClick) {
    const container = document.getElementById('move-buttons');
    container.innerHTML = '';

    moves.forEach(move => {
      const btn = document.createElement('button');
      btn.className = 'move-btn';
      btn.onclick = () => onMoveClick(move);

      btn.innerHTML = `
        <div class="move-name">${move.name}</div>
        <div class="move-type type-${move.type.toLowerCase()}">${move.type}系</div>
        <div class="move-power">${move.category === 'attack' ? `威力 ${move.power}` : move.description}</div>
      `;

      container.appendChild(btn);
    });
  },

  // 禁用/启用技能按钮
  setMoveButtonsEnabled(enabled) {
    document.querySelectorAll('.move-btn').forEach(btn => {
      btn.disabled = !enabled;
    });
  }
};
```

#### 渲染背包

```javascript
renderBag() {
  const container = document.getElementById('bag-screen');

  // 渲染宝可梦队伍
  const teamHtml = gameState.player.pokemonTeam.map((pokemon, index) => {
    const isActive = index === gameState.player.activePokemonIndex;
    return `
      <div class="pokemon-card ${isActive ? 'active' : ''}">
        <div class="pokemon-icon">${getPokemonIcon(pokemon.speciesId)}</div>
        <div class="pokemon-info">
          <div class="pokemon-name">${pokemon.name} Lv.${pokemon.level}</div>
          <div class="hp-bar">
            <div class="hp-fill" style="width: ${(pokemon.currentHP/pokemon.maxHP)*100}%"></div>
          </div>
          <div class="hp-text">${pokemon.currentHP}/${pokemon.maxHP} HP</div>
        </div>
        ${!isActive ? `<button onclick="switchActivePokemon(${index})">切换出战</button>` : ''}
      </div>
    `;
  }).join('');

  // 渲染道具
  const itemsHtml = Object.keys(gameState.player.bag).map(itemId => {
    const count = gameState.player.bag[itemId];
    const item = getItemById(itemId);
    return `
      <div class="item-card">
        <div class="item-name">${item.name}</div>
        <div class="item-count">×${count}</div>
        <button onclick="useItemFromBag('${itemId}')">使用</button>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <h3>宝可梦队伍</h3>
    ${teamHtml}
    <h3>道具</h3>
    ${itemsHtml}
  `;
}
```

---

## 测试和调试

### 测试用例

#### 伤害计算测试

```javascript
function testDamageCalculation() {
  const attacker = new Pokemon('charmander', 10);
  const defender = new Pokemon('caterpie', 5);
  const move = new Move('ember');

  const battle = new Battle(attacker, defender);
  const initialHP = defender.currentHP;

  battle.executeAttackMove(attacker, defender, move);

  console.assert(defender.currentHP < initialHP, '伤害应该使HP降低');
  console.assert(defender.currentHP >= 0, 'HP不能低于0');
}
```

#### 属性克制测试

```javascript
function testTypeEffectiveness() {
  const battle = new Battle(null, null);

  const eff1 = battle.getTypeEffectiveness('火', ['草']);
  console.assert(eff1 === 2.0, '火克草应该是2倍');

  const eff2 = battle.getTypeEffectiveness('火', ['水']);
  console.assert(eff2 === 0.5, '火打水应该是0.5倍');

  const eff3 = battle.getTypeEffectiveness('电', ['地面']);
  console.assert(eff3 === 0.0, '电打地面应该无效');
}
```

#### 升级和进化测试

```javascript
function testLevelUpAndEvolution() {
  const pokemon = new Pokemon('charmander', 15);
  const initialLevel = pokemon.level;

  pokemon.gainExp(10000);  // 给足够的经验升到16级

  console.assert(pokemon.level >= 16, '应该升到16级');
  console.assert(pokemon.speciesId === 'charmeleon', '应该进化成火恐龙');
}
```

### 调试命令

在浏览器控制台（F12）可用的调试函数：

```javascript
// 查看游戏状态
gameState

// 查看当前宝可梦
getCurrentPokemon()

// 重置游戏
resetGame()

// 添加道具（测试用）
addItem('potion', 10)

// 添加金币（测试用）
addMoney(10000)

// 捕获特定宝可梦（测试用）
function catchPokemon(speciesId, level) {
  const pokemon = new Pokemon(speciesId, level);
  if (gameState.player.pokemonTeam.length < 6) {
    addPokemonToTeam(pokemon);
  } else {
    addPokemonToBox(pokemon);
  }
  saveGame();
}

// 使用示例
catchPokemon('pikachu', 10);
```

### 常见问题排查

| 问题 | 可能原因 | 解决方案 |
|-----|---------|---------|
| 页面打不开 | 文件路径错误 | 检查 script 标签的 src 路径 |
| JavaScript 不生效 | 加载顺序错误 | data.js 必须在最前面加载 |
| 样式不显示 | CSS 文件路径错误 | 检查 link 标签的 href |
| 战斗逻辑出错 | 变量值异常 | 使用 console.log() 逐步调试 |
| 数据不保存 | localStorage 被禁用 | 检查浏览器隐私设置 |

---

## 部署指南

### 本地测试

```bash
# 清空 localStorage，重新测试
localStorage.clear()

# 完整测试流程
1. 选择初始宝可梦
2. 进行野外战斗
3. 使用商店购买道具
4. 捕捉野生宝可梦
5. 刷新页面确认存档正常
```

### 部署到 GitHub Pages

```bash
# 1. 创建 GitHub 仓库
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/pokemon-game.git
git push -u origin main

# 2. 在 GitHub 仓库设置中启用 Pages
Settings → Pages → Source: main branch → Save

# 3. 访问
https://你的用户名.github.io/pokemon-game
```

### 部署到 Vercel

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 部署
vercel

# 3. 按照提示完成配置
```

### 部署到 Netlify

1. 登录 Netlify
2. 拖拽项目文件夹上传
3. 自动部署完成
4. 获得唯一链接

---

## 学习资源

### 必学知识

- **HTML 基础**：标签、结构、语义化
- **CSS 基础**：选择器、布局、响应式设计
- **JavaScript 基础**：变量、函数、类、事件
- **DOM 操作**：querySelector、addEventListener、元素操作

### 推荐资源

- [MDN Web 文档](https://developer.mozilla.org/zh-CN/) - 权威的 Web 技术文档
- [JavaScript.info](https://javascript.info/) - 现代 JavaScript 教程
- [宝可梦对战机制 Wiki](https://wiki.52poke.com/) - 了解游戏规则

---

## 附录

### 完整的 Pokemon 类代码

```javascript
class Pokemon {
  constructor(speciesId, level) {
    const data = POKEMON_DATA[speciesId];

    this.speciesId = speciesId;
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.level = level;
    this.exp = 0;
    this.expToNext = this.calculateExpToNext();

    this.maxHP = data.baseStats.hp + data.statsGrowth.hp * (level - 1);
    this.currentHP = this.maxHP;
    this.attack = data.baseStats.attack + data.statsGrowth.attack * (level - 1);
    this.defense = data.baseStats.defense + data.statsGrowth.defense * (level - 1);
    this.speed = data.baseStats.speed + data.statsGrowth.speed * (level - 1);

    this.moves = this.loadMoves(data.learnset, level);
    this.statModifiers = { attack: 0, defense: 0 };
  }

  gainExp(amount) {
    this.exp += amount;
    while (this.exp >= this.expToNext && this.level < 50) {
      this.levelUp();
      return true;
    }
    return false;
  }

  levelUp() {
    this.level++;
    const data = POKEMON_DATA[this.speciesId];
    const growth = data.statsGrowth;

    this.maxHP += growth.hp;
    this.attack += growth.attack;
    this.defense += growth.defense;
    this.speed += growth.speed;
    this.currentHP = this.maxHP;

    this.expToNext = this.calculateExpToNext();
    this.checkLearnMove();
    this.checkEvolution();
  }

  checkEvolution() {
    const data = POKEMON_DATA[this.speciesId];
    if (!data.evolutions) return false;

    for (let evo of data.evolutions) {
      if (this.level >= evo.level) {
        this.evolve(evo.evolveInto);
        return true;
      }
    }
    return false;
  }

  evolve(newSpeciesId) {
    const oldName = this.name;
    this.speciesId = newSpeciesId;
    const newData = POKEMON_DATA[newSpeciesId];

    this.name = newData.name;
    this.type = newData.type;

    this.maxHP = Math.floor(this.maxHP * 1.2);
    this.attack = Math.floor(this.attack * 1.2);
    this.defense = Math.floor(this.defense * 1.2);
    this.speed = Math.floor(this.speed * 1.2);
    this.currentHP = this.maxHP;

    UI.addBattleLog(`\n${oldName} 进化成了 ${this.name}！`, 'critical');
    this.checkLearnMove();
  }

  calculateExpToNext() {
    if (this.level >= 50) return 999999;
    return EXP_TABLE[this.level + 1] - EXP_TABLE[this.level];
  }

  fullHeal() {
    this.currentHP = this.maxHP;
  }

  loadMoves(learnset, level) {
    const availableMoves = learnset.filter(entry => entry.level <= level);
    const moveIds = availableMoves.slice(-4).map(entry => entry.move);
    return moveIds.map(id => new Move(id));
  }

  checkLearnMove() {
    const data = POKEMON_DATA[this.speciesId];
    const newMoves = data.learnset.filter(entry => entry.level === this.level);

    for (let entry of newMoves) {
      const move = new Move(entry.move);
      if (this.moves.some(m => m.id === move.id)) continue;

      if (this.moves.length < 4) {
        this.moves.push(move);
        UI.addBattleLog(`${this.name} 学会了 ${move.name}！`, 'success');
      } else {
        UI.addBattleLog(`${this.name} 想学习 ${move.name}，但技能槽已满！`);
      }
    }
  }
}
```

---

**本文档持续更新中...**

如有问题或建议，欢迎提交 Issue！
