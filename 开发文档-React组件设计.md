# 《关都文字对战》React组件详细设计

## 📋 文档说明

这份文档包含所有React组件的完整代码，可以直接复制使用！

**组件设计原则**：
- 单一职责：每个组件只做一件事
- Props明确：清楚地定义组件接收什么参数
- 样式隔离：使用CSS Modules避免冲突
- 可复用：尽可能设计为通用组件

---

## 🎨 基础UI组件

### 1. HPBar组件（HP条）

```javascript
// src/components/HPBar.jsx
import styles from '../styles/HPBar.module.css';

export default function HPBar({ current, max, showText = true }) {
  const percent = Math.max(0, Math.min(100, (current / max) * 100));

  // 根据HP百分比改变颜色
  const getColor = () => {
    if (percent > 50) return '#e74c3c'; // 红色
    if (percent > 20) return '#f39c12'; // 橙色
    return '#e74c3c'; // 深红色（危险）
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{
            width: `${percent}%`,
            background: getColor()
          }}
        />
      </div>
      {showText && (
        <div className={styles.text}>
          {current}/{max} HP
        </div>
      )}
    </div>
  );
}
```

```css
/* src/styles/HPBar.module.css */
.container {
  width: 100%;
}

.bar {
  width: 100%;
  height: 20px;
  background: #ecf0f1;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 5px;
}

.fill {
  height: 100%;
  transition: width 0.5s ease, background 0.3s ease;
}

.text {
  font-size: 14px;
  color: #7f8c8d;
  text-align: right;
}
```

---

### 2. ExpBar组件（经验条）

```javascript
// src/components/ExpBar.jsx
import styles from '../styles/ExpBar.module.css';

export default function ExpBar({ current, max }) {
  const percent = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className={styles.text}>
        {current}/{max} EXP
      </div>
    </div>
  );
}
```

```css
/* src/styles/ExpBar.module.css */
.container {
  width: 100%;
  margin-top: 10px;
}

.bar {
  width: 100%;
  height: 12px;
  background: #ecf0f1;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 5px;
}

.fill {
  height: 100%;
  background: linear-gradient(90deg, #f39c12 0%, #f1c40f 100%);
  transition: width 0.5s ease;
}

.text {
  font-size: 12px;
  color: #7f8c8d;
  text-align: right;
}
```

---

## 🎮 功能组件

### 3. StarterSelection组件（初始选择界面）

```javascript
// src/components/StarterSelection.jsx
import { useGame } from '../context/GameContext';
import styles from '../styles/StarterSelection.module.css';

export default function StarterSelection() {
  const { selectStarter } = useGame();

  const starters = [
    {
      id: 'bulbasaur',
      name: '妙蛙种子',
      types: ['草', '毒'],
      moves: ['藤鞭（攻击）', '瞪眼（降防御）']
    },
    {
      id: 'charmander',
      name: '小火龙',
      types: ['火'],
      moves: ['火花（攻击）', '摇尾巴（降防御）']
    },
    {
      id: 'squirtle',
      name: '杰尼龟',
      types: ['水'],
      moves: ['水枪（攻击）', '缩入壳中（升防御）']
    }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>选择你的初始宝可梦</h2>

      <div className={styles.grid}>
        {starters.map((starter) => (
          <button
            key={starter.id}
            className={styles.starterBtn}
            onClick={() => selectStarter(starter.id)}
          >
            <div className={styles.name}>{starter.name}</div>
            <div className={styles.types}>
              {starter.types.join('/')}
            </div>
            <div className={styles.moves}>
              {starter.moves.map((move, index) => (
                <span key={index} className={styles.move}>
                  {move}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

```css
/* src/styles/StarterSelection.module.css */
.container {
  padding: 20px;
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 24px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.starterBtn {
  background: white;
  border: 3px solid #3498db;
  border-radius: 15px;
  padding: 25px;
  cursor: pointer;
  transition: all 0.3s;
}

.starterBtn:hover {
  background: #ecf0f1;
  border-color: #2980b9;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.name {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 8px;
}

.types {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 12px;
}

.moves {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.move {
  font-size: 12px;
  color: #34495e;
  background: #ecf0f1;
  padding: 6px 12px;
  border-radius: 6px;
  display: block;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 900px;
  }
}
```

---

### 4. PlayerStatus组件（玩家状态卡片）

```javascript
// src/components/PlayerStatus.jsx
import HPBar from './HPBar';
import ExpBar from './ExpBar';
import styles from '../styles/PlayerStatus.module.css';

export default function PlayerStatus({ pokemon }) {
  if (!pokemon) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.name}>{pokemon.name}</span>
        <span className={styles.level}>Lv.{pokemon.level}</span>
      </div>

      <HPBar
        current={pokemon.currentHP}
        max={pokemon.maxHP}
      />

      <ExpBar
        current={pokemon.exp}
        max={pokemon.expToNext}
      />
    </div>
  );
}
```

```css
/* src/styles/PlayerStatus.module.css */
.container {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.name {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
}

.level {
  font-size: 18px;
  font-weight: bold;
  color: #3498db;
}
```

---

### 5. MainScreen组件（主界面）

```javascript
// src/components/MainScreen.jsx
import { useGame } from '../context/GameContext';
import PlayerStatus from './PlayerStatus';
import styles from '../styles/MainScreen.module.css';

export default function MainScreen() {
  const { gameState, startBattle } = useGame();
  const { player } = gameState;

  return (
    <div className={styles.container}>
      <PlayerStatus pokemon={player.pokemon} />

      <div className={styles.messageBox}>
        <p>准备开始新的冒险！</p>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${styles.primary}`}
          onClick={startBattle}
        >
          开始战斗
        </button>
        <button
          className={`${styles.btn} ${styles.secondary}`}
          onClick={() => alert('宝可梦中心功能开发中...')}
        >
          宝可梦中心
        </button>
      </div>

      <div className={styles.stats}>
        战绩：{player.battlesWon} 胜 {player.totalBattles} 战
      </div>
    </div>
  );
}
```

```css
/* src/styles/MainScreen.module.css */
.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.messageBox {
  background: white;
  border: 3px solid #34495e;
  border-radius: 10px;
  padding: 20px;
  min-height: 100px;
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 1.6;
  color: #2c3e50;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.btn {
  padding: 18px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.primary {
  background: #3498db;
  color: white;
}

.primary:hover {
  background: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(52, 152, 219, 0.3);
}

.secondary {
  background: #95a5a6;
  color: white;
}

.secondary:hover {
  background: #7f8c8d;
  transform: translateY(-3px);
}

.stats {
  text-align: center;
  color: #7f8c8d;
  font-size: 16px;
}

@media (max-width: 600px) {
  .messageBox {
    font-size: 16px;
  }

  .btn {
    padding: 20px;
    font-size: 16px;
  }
}
```

---

### 6. BattleLog组件（战斗日志）

```javascript
// src/components/BattleLog.jsx
import { useEffect, useRef } from 'react';
import styles from '../styles/BattleLog.module.css';

export default function BattleLog({ logs }) {
  const logRef = useRef(null);

  // 自动滚动到最新日志
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className={styles.container} ref={logRef}>
      {logs.map((log, index) => (
        <div
          key={index}
          className={`${styles.entry} ${log.type ? styles[log.type] : ''}`}
        >
          {log.message}
        </div>
      ))}
    </div>
  );
}
```

```css
/* src/styles/BattleLog.module.css */
.container {
  background: white;
  border: 3px solid #34495e;
  border-radius: 10px;
  padding: 15px;
  min-height: 180px;
  max-height: 220px;
  overflow-y: auto;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.8;
  color: #2c3e50;
}

.entry {
  margin-bottom: 10px;
  animation: slideIn 0.3s ease;
}

.entry.critical {
  color: #e74c3c;
  font-weight: bold;
}

.entry.success {
  color: #27ae60;
  font-weight: bold;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 600px) {
  .container {
    font-size: 15px;
  }
}
```

---

### 7. MoveButtons组件（技能按钮组）

```javascript
// src/components/MoveButtons.jsx
import styles from '../styles/MoveButtons.module.css';

export default function MoveButtons({ moves, onMoveSelect, disabled }) {
  const getTypeClass = (type) => {
    return `type${type}`;
  };

  return (
    <div className={styles.container}>
      {moves.map((move, index) => (
        <button
          key={index}
          className={styles.moveBtn}
          onClick={() => onMoveSelect(move)}
          disabled={disabled}
        >
          <div className={styles.moveName}>{move.name}</div>
          <div className={`${styles.moveType} ${styles[getTypeClass(move.type)]}`}>
            {move.type}系
          </div>
          <div className={styles.movePower}>
            {move.category === 'attack'
              ? `威力 ${move.power}`
              : move.description}
          </div>
        </button>
      ))}
    </div>
  );
}
```

```css
/* src/styles/MoveButtons.module.css */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.moveBtn {
  padding: 15px;
  border: 2px solid #34495e;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.moveBtn:hover:not(:disabled) {
  background: #ecf0f1;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.moveBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.moveName {
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 6px;
}

.moveType {
  font-size: 12px;
  color: white;
  display: inline-block;
  padding: 4px 10px;
  border-radius: 5px;
  margin-bottom: 6px;
}

.type火 { background: #f08030; }
.type水 { background: #6890f0; }
.type草 { background: #78c850; }
.type电 { background: #f8d030; color: #2c3e50; }
.type普通 { background: #a8a878; }
.type毒 { background: #a040a0; }

.movePower {
  font-size: 12px;
  color: #7f8c8d;
}

@media (max-width: 600px) {
  .moveBtn {
    padding: 18px;
  }
}
```

---

### 8. BattleScreen组件（战斗界面）

```javascript
// src/components/BattleScreen.jsx
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import HPBar from './HPBar';
import BattleLog from './BattleLog';
import MoveButtons from './MoveButtons';
import styles from '../styles/BattleScreen.module.css';

export default function BattleScreen() {
  const { gameState, executeTurn } = useGame();
  const { player, battle } = gameState;
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const handleMoveSelect = async (move) => {
    setButtonsDisabled(true);
    await executeTurn(move);
    // 如果战斗还在继续，重新启用按钮
    setTimeout(() => {
      if (gameState.battle.isActive) {
        setButtonsDisabled(false);
      }
    }, 1000);
  };

  if (!battle.wildPokemon) return null;

  return (
    <div className={styles.container}>
      {/* 野生宝可梦状态 */}
      <div className={styles.statusBox}>
        <div className={styles.label}>野生的</div>
        <div className={styles.pokemonInfo}>
          <span className={styles.name}>{battle.wildPokemon.name}</span>
          <span className={styles.level}>Lv.{battle.wildPokemon.level}</span>
        </div>
        <HPBar
          current={battle.wildPokemon.currentHP}
          max={battle.wildPokemon.maxHP}
        />
      </div>

      {/* 战斗日志 */}
      <BattleLog logs={battle.logs} />

      {/* 玩家宝可梦状态 */}
      <div className={styles.statusBox}>
        <div className={styles.label}>你的</div>
        <div className={styles.pokemonInfo}>
          <span className={styles.name}>{player.pokemon.name}</span>
          <span className={styles.level}>Lv.{player.pokemon.level}</span>
        </div>
        <HPBar
          current={player.pokemon.currentHP}
          max={player.pokemon.maxHP}
        />
      </div>

      {/* 技能按钮 */}
      {battle.isActive && (
        <MoveButtons
          moves={player.pokemon.moves}
          onMoveSelect={handleMoveSelect}
          disabled={buttonsDisabled}
        />
      )}
    </div>
  );
}
```

```css
/* src/styles/BattleScreen.module.css */
.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.statusBox {
  background: white;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.label {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.pokemonInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.name {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

.level {
  font-size: 16px;
  font-weight: bold;
  color: #3498db;
}
```

---

## 🔄 GameContext（全局状态管理）

```javascript
// src/context/GameContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import Pokemon from '../classes/Pokemon';
import Battle from '../classes/Battle';
import { generateWildPokemon } from '../utils/generateWildPokemon';
import { SimpleAI } from '../utils/ai';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState({
    phase: 'start', // 'start' | 'main' | 'battle'
    player: {
      pokemon: null,
      battlesWon: 0,
      totalBattles: 0
    },
    battle: {
      isActive: false,
      wildPokemon: null,
      turn: 0,
      logs: []
    }
  });

  // 从localStorage加载游戏
  useEffect(() => {
    loadGame();
  }, []);

  // 选择初始宝可梦
  const selectStarter = (speciesId) => {
    const pokemon = new Pokemon(speciesId, 5); // 5级起步

    setGameState(prev => ({
      ...prev,
      phase: 'main',
      player: {
        ...prev.player,
        pokemon
      }
    }));

    saveGame();
  };

  // 开始战斗
  const startBattle = () => {
    const wildPokemon = generateWildPokemon(gameState.player.pokemon.level);

    setGameState(prev => ({
      ...prev,
      phase: 'battle',
      battle: {
        isActive: true,
        wildPokemon,
        turn: 0,
        logs: [
          { message: `野生的 ${wildPokemon.name} Lv.${wildPokemon.level} 出现了！` },
          { message: `你的 ${prev.player.pokemon.name} Lv.${prev.player.pokemon.level} 准备战斗！` }
        ]
      }
    }));
  };

  // 执行回合
  const executeTurn = (playerMove) => {
    const { player, battle } = gameState;
    const aiMove = SimpleAI.chooseMove(battle.wildPokemon);

    // 创建战斗实例（如果还没有）
    const battleInstance = new Battle(player.pokemon, battle.wildPokemon);

    // 执行回合
    const newLogs = battleInstance.executeTurn(playerMove, aiMove);

    // 更新状态
    setGameState(prev => ({
      ...prev,
      battle: {
        ...prev.battle,
        turn: prev.battle.turn + 1,
        logs: [...prev.battle.logs, ...newLogs]
      }
    }));

    // 检查战斗是否结束
    if (battleInstance.checkBattleEnd()) {
      endBattle(battleInstance);
    }

    saveGame();
  };

  // 结束战斗
  const endBattle = (battleInstance) => {
    const winner = battleInstance.getWinner();
    const { player } = gameState;

    let updatedPlayer = { ...player };

    if (winner === 'player') {
      // 胜利：加经验
      const expGained = battleInstance.wildPokemon.level * 5;
      player.pokemon.gainExp(expGained);
      updatedPlayer.battlesWon += 1;
      updatedPlayer.totalBattles += 1;
    } else {
      // 失败：只计入总战斗数
      updatedPlayer.totalBattles += 1;
    }

    // 战后回血
    player.pokemon.fullHeal();

    // 3秒后返回主界面
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        phase: 'main',
        player: updatedPlayer,
        battle: {
          isActive: false,
          wildPokemon: null,
          turn: 0,
          logs: []
        }
      }));

      saveGame();
    }, 3000);
  };

  // 保存游戏
  const saveGame = () => {
    const saveData = {
      player: {
        pokemon: gameState.player.pokemon
          ? {
              speciesId: gameState.player.pokemon.speciesId,
              level: gameState.player.pokemon.level,
              exp: gameState.player.pokemon.exp,
              currentHP: gameState.player.pokemon.currentHP,
              maxHP: gameState.player.pokemon.maxHP
            }
          : null,
        battlesWon: gameState.player.battlesWon,
        totalBattles: gameState.player.totalBattles
      }
    };

    localStorage.setItem('pokemonSave', JSON.stringify(saveData));
  };

  // 加载游戏
  const loadGame = () => {
    const saved = localStorage.getItem('pokemonSave');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      if (data.player.pokemon) {
        const pokemon = new Pokemon(
          data.player.pokemon.speciesId,
          data.player.pokemon.level
        );
        pokemon.exp = data.player.pokemon.exp;
        pokemon.currentHP = data.player.pokemon.currentHP;

        setGameState(prev => ({
          ...prev,
          phase: 'main',
          player: {
            pokemon,
            battlesWon: data.player.battlesWon,
            totalBattles: data.player.totalBattles
          }
        }));
      }
    } catch (error) {
      console.error('加载存档失败:', error);
    }
  };

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

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
```

---

## 📱 App组件（根组件）

```javascript
// src/App.jsx
import { GameProvider, useGame } from './context/GameContext';
import StarterSelection from './components/StarterSelection';
import MainScreen from './components/MainScreen';
import BattleScreen from './components/BattleScreen';
import './App.css';

function GameContent() {
  const { gameState } = useGame();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>关都文字对战：初始冒险</h1>
      </header>

      <main className="app-main">
        {gameState.phase === 'start' && <StarterSelection />}
        {gameState.phase === 'main' && <MainScreen />}
        {gameState.phase === 'battle' && <BattleScreen />}
      </main>

      <footer className="app-footer">
        <p>© 2024 宝可梦文字对战 | Powered by React + Vite</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
```

```css
/* src/App.css */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-header {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.app-header h1 {
  margin: 0;
  font-size: 24px;
}

.app-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.app-footer {
  background: #34495e;
  color: #ecf0f1;
  padding: 15px;
  text-align: center;
  font-size: 14px;
}

@media (max-width: 600px) {
  .app-header h1 {
    font-size: 20px;
  }

  .app-main {
    padding: 15px;
  }
}
```

---

## 🎯 组件使用流程

### 1. 初始选择流程
```
用户访问 → App加载 → phase='start'
→ 显示StarterSelection组件
→ 用户点击小火龙
→ 调用selectStarter('charmander')
→ 创建Pokemon实例
→ phase切换为'main'
→ 显示MainScreen组件
```

### 2. 战斗流程
```
用户在MainScreen点击"开始战斗"
→ 调用startBattle()
→ 生成野生宝可梦
→ phase切换为'battle'
→ 显示BattleScreen组件
→ 用户点击技能按钮
→ 调用executeTurn(move)
→ AI选择技能
→ 计算战斗结果
→ 更新日志和HP
→ 战斗结束自动回血
→ 3秒后返回MainScreen
```

---

## 📝 总结

现在你已经有了所有组件的完整代码！

**组件清单**：
- ✅ HPBar - HP条
- ✅ ExpBar - 经验条
- ✅ StarterSelection - 初始选择界面
- ✅ PlayerStatus - 玩家状态卡片
- ✅ MainScreen - 主界面
- ✅ BattleLog - 战斗日志
- ✅ MoveButtons - 技能按钮组
- ✅ BattleScreen - 战斗界面
- ✅ GameContext - 全局状态管理
- ✅ App - 根组件

**下一步**：
- 创建React开发步骤清单
- 初始化Vite项目
- 复制这些代码到项目中

**准备好继续了吗？** 🚀
