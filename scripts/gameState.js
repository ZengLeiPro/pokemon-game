// ========== 游戏状态 ==========
const gameState = {
  // 玩家数据
  player: {
    pokemon: null,              // Pokemon对象
    battlesWon: 0,              // 胜场数
    totalBattles: 0,            // 总场数
    money: 3000,                // 金币（初始3000，参考官方游戏）
    trainerDefeats: 0           // 击败训练家数量
  },

  // 战斗状态
  battle: {
    isActive: false,            // 是否正在战斗中
    instance: null,             // Battle对象
    opponent: null,             // 对手（野生宝可梦或训练家）
    battleType: null            // 战斗类型: 'wild' 或 'trainer'
  },

  // 游戏流程状态
  phase: "start"  // 当前阶段: 'start', 'main', 'battle'
};

// ========== 保存游戏 ==========
function saveGame() {
  try {
    const saveData = {
      version: "2.0",  // 版本号升级，支持金币系统
      timestamp: Date.now(),
      playerPokemon: {
        speciesId: gameState.player.pokemon.speciesId,
        level: gameState.player.pokemon.level,
        exp: gameState.player.pokemon.exp,
        currentHP: gameState.player.pokemon.currentHP,
        maxHP: gameState.player.pokemon.maxHP,
        attack: gameState.player.pokemon.attack,
        defense: gameState.player.pokemon.defense,
        speed: gameState.player.pokemon.speed,
        moves: gameState.player.pokemon.moves.map(m => m.id)
      },
      stats: {
        battlesWon: gameState.player.battlesWon,
        totalBattles: gameState.player.totalBattles,
        money: gameState.player.money,
        trainerDefeats: gameState.player.trainerDefeats
      }
    };

    localStorage.setItem('pokemonSave', JSON.stringify(saveData));
    console.log('游戏已保存');
  } catch (error) {
    console.error('保存游戏失败:', error);
  }
}

// ========== 读取游戏 ==========
function loadGame() {
  try {
    const saved = localStorage.getItem('pokemonSave');
    if (!saved) {
      console.log('没有存档');
      return false;
    }

    const data = JSON.parse(saved);

    // 重建Pokemon对象
    const pokemon = new Pokemon(data.playerPokemon.speciesId, data.playerPokemon.level);
    pokemon.exp = data.playerPokemon.exp;
    pokemon.currentHP = data.playerPokemon.currentHP;
    pokemon.maxHP = data.playerPokemon.maxHP;
    pokemon.attack = data.playerPokemon.attack;
    pokemon.defense = data.playerPokemon.defense;

    // 兼容旧存档：如果有speed属性则加载，否则用默认值
    if (data.playerPokemon.speed !== undefined) {
      pokemon.speed = data.playerPokemon.speed;
    }

    // 重建技能列表
    pokemon.moves = data.playerPokemon.moves.map(moveId => new Move(moveId));

    gameState.player.pokemon = pokemon;
    gameState.player.battlesWon = data.stats.battlesWon;
    gameState.player.totalBattles = data.stats.totalBattles;

    // 加载金币和训练家击败数（兼容旧存档）
    gameState.player.money = data.stats.money !== undefined ? data.stats.money : 3000;
    gameState.player.trainerDefeats = data.stats.trainerDefeats || 0;

    console.log('游戏已加载');
    return true;
  } catch (error) {
    console.error('加载游戏失败:', error);
    return false;
  }
}

// ========== 重置游戏 ==========
function resetGame() {
  localStorage.removeItem('pokemonSave');
  gameState.player.pokemon = null;
  gameState.player.battlesWon = 0;
  gameState.player.totalBattles = 0;
  gameState.player.money = 3000;
  gameState.player.trainerDefeats = 0;
  gameState.phase = "start";
  console.log('游戏已重置');
}

// ========== 金币操作 ==========
// 添加金币
function addMoney(amount) {
  gameState.player.money += amount;
  saveGame();
}

// 扣除金币
function deductMoney(amount) {
  if (gameState.player.money >= amount) {
    gameState.player.money -= amount;
    saveGame();
    return true;
  }
  return false;
}

// 获取当前金币
function getMoney() {
  return gameState.player.money;
}
