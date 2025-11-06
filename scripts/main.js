// ========== 主程序 ==========

// ========== 页面加载完成后初始化游戏 ==========
window.addEventListener('DOMContentLoaded', () => {
  console.log('游戏启动...');

  // 尝试读取存档
  const hasSave = loadGame();

  if (hasSave) {
    // 有存档，直接进入主界面
    gameState.phase = 'main';
    UI.showScreen('main-screen');
    UI.updatePlayerStatus(gameState.player.pokemon);
    UI.updateStats(gameState.player.battlesWon, gameState.player.totalBattles);
    UI.updateMoney(gameState.player.money);
    UI.showMessage(`欢迎回来！继续你的冒险吧！`);
  } else {
    // 没有存档，显示初始选择界面
    gameState.phase = 'start';
    UI.showScreen('starter-selection');
  }

  // 绑定初始选择按钮事件
  bindStarterSelection();

  // 绑定主界面按钮事件
  bindMainScreenButtons();
});

// ========== 绑定初始选择按钮 ==========
function bindStarterSelection() {
  const starterButtons = document.querySelectorAll('.starter-btn');

  starterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pokemonId = btn.getAttribute('data-pokemon');
      onStarterSelected(pokemonId);
    });
  });
}

// ========== 初始宝可梦选择事件 ==========
function onStarterSelected(pokemonId) {
  console.log(`选择了：${pokemonId}`);

  // 创建玩家的宝可梦（5级）
  gameState.player.pokemon = new Pokemon(pokemonId, 5);

  // 保存游戏
  saveGame();

  // 切换到主界面
  gameState.phase = 'main';
  UI.showScreen('main-screen');
  UI.updatePlayerStatus(gameState.player.pokemon);
  UI.updateStats(0, 0);
  UI.updateMoney(gameState.player.money);
  UI.showMessage(`你选择了 ${gameState.player.pokemon.name}！开始你的冒险吧！`);
}

// ========== 绑定主界面按钮 ==========
function bindMainScreenButtons() {
  // 野生宝可梦对战按钮
  const wildBattleBtn = document.getElementById('wild-battle-btn');
  wildBattleBtn.addEventListener('click', () => onStartBattle('wild'));

  // 训练家对战按钮
  const trainerBattleBtn = document.getElementById('trainer-battle-btn');
  trainerBattleBtn.addEventListener('click', () => onStartBattle('trainer'));

  // 宝可梦中心按钮
  const centerBtn = document.getElementById('center-btn');
  centerBtn.addEventListener('click', () => {
    if (gameState.player.pokemon) {
      gameState.player.pokemon.fullHeal();
      UI.updatePlayerStatus(gameState.player.pokemon);
      UI.showMessage(`${gameState.player.pokemon.name} 的 HP 已恢复至满！`);
      saveGame();
    }
  });
}

// ========== 开始战斗 ==========
function onStartBattle(battleType = 'wild') {
  if (!gameState.player.pokemon) {
    UI.showMessage('请先选择初始宝可梦！');
    return;
  }

  console.log(`开始${battleType === 'trainer' ? '训练家' : '野生宝可梦'}战斗...`);

  let opponent;
  let battle;

  if (battleType === 'trainer') {
    // 生成训练家
    opponent = generateTrainer(gameState.player.pokemon.level);
    console.log('训练家:', opponent.name, opponent.trainerClass);
    console.log('训练家的宝可梦:', opponent.pokemon);

    // 创建战斗实例
    battle = new Battle(gameState.player.pokemon, opponent, 'trainer');
  } else {
    // 生成野生宝可梦
    opponent = generateWildPokemon(gameState.player.pokemon.level);
    console.log('野生宝可梦:', opponent);

    // 创建战斗实例
    battle = new Battle(gameState.player.pokemon, opponent, 'wild');
  }

  // 保存到游戏状态
  gameState.battle = {
    isActive: true,
    instance: battle,
    opponent: opponent,
    battleType: battleType
  };

  // 切换到战斗界面
  gameState.phase = 'battle';
  UI.showScreen('battle-screen');

  // 开始战斗
  battle.start();

  // 生成技能按钮
  UI.createMoveButtons(gameState.player.pokemon.moves, onPlayerMoveSelected);
}

// ========== 玩家选择技能 ==========
async function onPlayerMoveSelected(playerMove) {
  const battle = gameState.battle.instance;

  if (!battle || !battle.isActive) {
    return;
  }

  console.log(`玩家选择了技能: ${playerMove.name}`);

  // 禁用技能按钮（防止重复点击）
  UI.setMoveButtonsEnabled(false);

  // AI选择技能（获取对手的宝可梦）
  const opponentPokemon = gameState.battle.battleType === 'trainer'
    ? gameState.battle.opponent.pokemon
    : gameState.battle.opponent;

  const aiMove = SimpleAI.chooseMove(opponentPokemon);
  console.log(`AI选择了技能: ${aiMove.name}`);

  // 执行回合（等待所有动画和延迟完成）
  await battle.executeTurn(playerMove, aiMove);

  // 如果战斗还没结束，重新启用按钮
  if (battle.isActive) {
    UI.setMoveButtonsEnabled(true);
  }
}

// ========== 调试功能（可选） ==========
// 在控制台输入 resetGame() 可以重置游戏
window.resetGame = resetGame;

// 在控制台输入 gameState 可以查看游戏状态
window.gameState = gameState;

console.log('游戏初始化完成！');
console.log('提示：在控制台输入 resetGame() 可以重置游戏');
