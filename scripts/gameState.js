// ========== 游戏状态 ==========
const gameState = {
  // 玩家数据
  player: {
    pokemon: null,              // Pokemon对象
    battlesWon: 0,              // 胜场数
    totalBattles: 0             // 总场数
  },

  // 战斗状态
  battle: {
    isActive: false,            // 是否正在战斗中
    instance: null,             // Battle对象
    wildPokemon: null           // 野生宝可梦
  },

  // 游戏流程状态
  phase: "start"  // 当前阶段: 'start', 'main', 'battle'
};

// ========== 保存游戏 ==========
function saveGame() {
  try {
    const saveData = {
      version: "1.0",
      timestamp: Date.now(),
      playerPokemon: {
        speciesId: gameState.player.pokemon.speciesId,
        level: gameState.player.pokemon.level,
        exp: gameState.player.pokemon.exp,
        currentHP: gameState.player.pokemon.currentHP,
        maxHP: gameState.player.pokemon.maxHP,
        attack: gameState.player.pokemon.attack,
        defense: gameState.player.pokemon.defense,
        moves: gameState.player.pokemon.moves.map(m => m.id)
      },
      stats: {
        battlesWon: gameState.player.battlesWon,
        totalBattles: gameState.player.totalBattles
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

    // 重建技能列表
    pokemon.moves = data.playerPokemon.moves.map(moveId => new Move(moveId));

    gameState.player.pokemon = pokemon;
    gameState.player.battlesWon = data.stats.battlesWon;
    gameState.player.totalBattles = data.stats.totalBattles;

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
  gameState.phase = "start";
  console.log('游戏已重置');
}
