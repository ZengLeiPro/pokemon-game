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
    const currentPokemon = getCurrentPokemon();
    if (currentPokemon) {
      UI.updatePlayerStatus(currentPokemon);
    }
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

  // 绑定对战结束确认按钮
  bindBattleEndConfirm();

  // 绑定Tab导航按钮
  bindTabNavigation();

  // 绑定重置按钮
  bindResetButtons();

  // 绑定战斗界面按钮
  bindBattleButtons();
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
  const starterPokemon = new Pokemon(pokemonId, 5);

  // 添加到队伍
  addPokemonToTeam(starterPokemon);

  // 赠送新手礼包
  addItem('potion', 5);
  addItem('pokeball', 5);

  // 保存游戏
  saveGame();

  // 切换到主界面
  gameState.phase = 'main';
  UI.showScreen('main-screen');
  UI.updatePlayerStatus(getCurrentPokemon());
  UI.updateStats(0, 0);
  UI.updateMoney(gameState.player.money);

  // 显示欢迎消息
  showShopMessage(`你选择了 ${starterPokemon.name}！开始你的冒险吧！`, 'success');
  setTimeout(() => {
    showShopMessage('获得了新手礼包：5个伤药和5个精灵球！', 'success');
  }, 2000);
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
    // 恢复队伍中所有宝可梦
    let healedCount = 0;
    gameState.player.pokemonTeam.forEach(pokemon => {
      if (pokemon.currentHP < pokemon.maxHP) {
        pokemon.fullHeal();
        healedCount++;
      }
    });

    if (healedCount > 0) {
      showShopMessage(`所有宝可梦的HP已恢复至满！`, 'success');
      UI.updatePlayerStatus(getCurrentPokemon());
      UI.renderBag(); // 更新背包中的宝可梦显示
      saveGame();
    } else {
      showShopMessage('宝可梦的HP已经是满的了！', 'info');
    }
  });

  // 宝可梦盒子按钮
  const pokemonBoxBtn = document.getElementById('pokemon-box-btn');
  if (pokemonBoxBtn) {
    pokemonBoxBtn.addEventListener('click', () => {
      UI.renderPokemonBox();
      document.getElementById('pokemon-box-panel').classList.remove('hidden');
    });
  }

  // 关闭盒子面板按钮
  const closeBoxBtn = document.getElementById('close-box-btn');
  if (closeBoxBtn) {
    closeBoxBtn.addEventListener('click', () => {
      document.getElementById('pokemon-box-panel').classList.add('hidden');
    });
  }

  // 保存游戏按钮
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveGame();
      alert('游戏已保存！');
    });
  }

  // 重置游戏按钮（服务Tab中的）
  const resetGameBtn = document.getElementById('reset-game-btn');
  if (resetGameBtn) {
    resetGameBtn.addEventListener('click', () => {
      if (confirm('确定要重置游戏吗？所有进度将被清除！')) {
        resetGame();
        location.reload();
      }
    });
  }
}

// ========== 绑定Tab导航按钮 ==========
function bindTabNavigation() {
  // 获取所有导航按钮（包括侧边栏和底部导航）
  const navButtons = document.querySelectorAll('.nav-btn');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) {
        UI.switchTab(tabId);
      }
    });
  });
}

// ========== 绑定重置按钮 ==========
function bindResetButtons() {
  // 顶部重置按钮
  const headerResetBtn = document.getElementById('reset-btn');
  if (headerResetBtn) {
    headerResetBtn.addEventListener('click', () => {
      if (confirm('确定要重置游戏吗？所有进度将被清除！')) {
        resetGame();
        location.reload();
      }
    });
  }
}

// ========== 绑定战斗界面按钮 ==========
function bindBattleButtons() {
  // 使用道具按钮
  const useItemBtn = document.getElementById('use-item-btn');
  if (useItemBtn) {
    useItemBtn.addEventListener('click', () => {
      // 显示道具面板
      UI.renderBattleItemList();
      document.getElementById('battle-item-panel').classList.remove('hidden');
    });
  }

  // 关闭道具面板按钮
  const closeItemPanelBtn = document.getElementById('close-item-panel-btn');
  if (closeItemPanelBtn) {
    closeItemPanelBtn.addEventListener('click', () => {
      document.getElementById('battle-item-panel').classList.add('hidden');
    });
  }

  // 逃跑按钮
  const fleeBtn = document.getElementById('flee-btn');
  if (fleeBtn) {
    fleeBtn.addEventListener('click', () => {
      const battle = gameState.battle.instance;
      if (battle && battle.isActive) {
        battle.flee();
      }
    });
  }
}

// ========== 绑定对战结束确认按钮 ==========
function bindBattleEndConfirm() {
  const confirmBtn = document.getElementById('confirm-button');
  confirmBtn.addEventListener('click', () => {
    console.log('确认按钮被点击');

    // 隐藏确认按钮
    document.getElementById('battle-end-confirm').style.display = 'none';
    // 显示战斗操作区域
    document.getElementById('battle-actions').style.display = 'block';
    // 隐藏道具面板
    document.getElementById('battle-item-panel').classList.add('hidden');

    // 返回主界面
    UI.showScreen('main-screen');

    // 根据上一场对战的结果显示消息
    if (gameState.battle.lastWinner === 'player') {
      UI.showMessage('准备开始下一场战斗！');
    } else if (gameState.battle.lastWinner === 'flee') {
      UI.showMessage('成功逃离了战斗！');
    } else {
      UI.showMessage('继续加油！再来挑战吧！');
    }

    // 结束战斗状态
    gameState.battle.isActive = false;
    gameState.battle.lastWinner = null;
  });
}

// ========== 开始战斗 ==========
function onStartBattle(battleType = 'wild') {
  const currentPokemon = getCurrentPokemon();
  if (!currentPokemon) {
    UI.showMessage('请先选择初始宝可梦！');
    return;
  }

  console.log(`开始${battleType === 'trainer' ? '训练家' : '野生宝可梦'}战斗...`);

  let opponent;
  let battle;

  if (battleType === 'trainer') {
    // 生成训练家
    opponent = generateTrainer(currentPokemon.level);
    console.log('训练家:', opponent.name, opponent.trainerClass);
    console.log('训练家的宝可梦:', opponent.pokemon);

    // 创建战斗实例
    battle = new Battle(currentPokemon, opponent, 'trainer');
  } else {
    // 生成野生宝可梦
    opponent = generateWildPokemon(currentPokemon.level);
    console.log('野生宝可梦:', opponent);

    // 创建战斗实例
    battle = new Battle(currentPokemon, opponent, 'wild');
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

  // 确保技能按钮容器显示，确认按钮隐藏
  document.getElementById('move-buttons').style.display = 'grid';
  document.getElementById('battle-end-confirm').style.display = 'none';

  // 开始战斗
  battle.start();

  // 生成技能按钮
  UI.createMoveButtons(currentPokemon.moves, onPlayerMoveSelected);
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
