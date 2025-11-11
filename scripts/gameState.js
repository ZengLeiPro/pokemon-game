// ========== 游戏状态 ==========
const gameState = {
  // 玩家数据
  player: {
    pokemon: null,              // 保留兼容性，但使用pokemonTeam[activePokemonIndex]
    pokemonTeam: [],            // 队伍（最多6只）
    pokemonBox: [],             // 宝可梦盒子（捕捉的宝可梦存放处）
    activePokemonIndex: 0,      // 当前出战的宝可梦索引
    bag: {},                    // 背包 { itemId: count }
    battlesWon: 0,              // 胜场数
    totalBattles: 0,            // 总场数
    money: 3000,                // 金币（初始3000，参考官方游戏）
    trainerDefeats: 0,          // 击败训练家数量
    capturedCount: 0,           // 捕获的宝可梦总数
    badges: []                  // 已获得的勋章列表
  },

  // 战斗状态
  battle: {
    isActive: false,            // 是否正在战斗中
    instance: null,             // Battle对象
    opponent: null,             // 对手（野生宝可梦或训练家）
    battleType: null            // 战斗类型: 'wild' 或 'trainer'
  },

  // 游戏流程状态
  phase: "start",  // 当前阶段: 'start', 'main', 'battle'

  // 主界面Tab状态
  currentTab: "adventure"  // 当前Tab: 'adventure', 'bag', 'pokedex', 'shop', 'services'
};

// ========== 宝可梦队伍管理 ==========

/**
 * 获取当前出战的宝可梦
 */
function getCurrentPokemon() {
  if (gameState.player.pokemonTeam.length === 0) {
    return gameState.player.pokemon; // 向后兼容
  }
  return gameState.player.pokemonTeam[gameState.player.activePokemonIndex];
}

/**
 * 添加宝可梦到队伍
 */
function addPokemonToTeam(pokemon) {
  if (gameState.player.pokemonTeam.length >= 6) {
    console.log('队伍已满，无法添加');
    return false;
  }
  gameState.player.pokemonTeam.push(pokemon);
  // 同步到player.pokemon以保持兼容性
  if (gameState.player.pokemonTeam.length === 1) {
    gameState.player.pokemon = pokemon;
    gameState.player.activePokemonIndex = 0;
  }
  saveGame();
  return true;
}

/**
 * 从队伍移除宝可梦到盒子
 */
function removePokemonFromTeam(index) {
  if (index < 0 || index >= gameState.player.pokemonTeam.length) {
    return false;
  }
  if (gameState.player.pokemonTeam.length === 1) {
    console.log('不能移除最后一只宝可梦');
    return false;
  }

  const pokemon = gameState.player.pokemonTeam.splice(index, 1)[0];
  gameState.player.pokemonBox.push(pokemon);

  // 调整activePokemonIndex
  if (gameState.player.activePokemonIndex >= gameState.player.pokemonTeam.length) {
    gameState.player.activePokemonIndex = gameState.player.pokemonTeam.length - 1;
  }

  // 更新player.pokemon
  gameState.player.pokemon = getCurrentPokemon();

  saveGame();
  return true;
}

/**
 * 添加宝可梦到盒子
 */
function addPokemonToBox(pokemon) {
  gameState.player.pokemonBox.push(pokemon);
  gameState.player.capturedCount++;
  saveGame();
  return true;
}

/**
 * 从盒子移动宝可梦到队伍
 */
function movePokemonToTeam(boxIndex) {
  if (boxIndex < 0 || boxIndex >= gameState.player.pokemonBox.length) {
    return false;
  }
  if (gameState.player.pokemonTeam.length >= 6) {
    console.log('队伍已满');
    return false;
  }

  const pokemon = gameState.player.pokemonBox.splice(boxIndex, 1)[0];
  gameState.player.pokemonTeam.push(pokemon);
  saveGame();
  return true;
}

/**
 * 切换出战宝可梦
 */
function switchActivePokemon(teamIndex) {
  if (teamIndex < 0 || teamIndex >= gameState.player.pokemonTeam.length) {
    return false;
  }
  gameState.player.activePokemonIndex = teamIndex;
  gameState.player.pokemon = getCurrentPokemon();
  saveGame();
  return true;
}

/**
 * 检查队伍是否还有可战斗的宝可梦
 */
function hasAlivePokemon() {
  return gameState.player.pokemonTeam.some(p => p.currentHP > 0);
}

/**
 * 切换到下一个可战斗的宝可梦
 */
function switchToNextAlivePokemon() {
  for (let i = 0; i < gameState.player.pokemonTeam.length; i++) {
    if (gameState.player.pokemonTeam[i].currentHP > 0) {
      switchActivePokemon(i);
      return true;
    }
  }
  return false;
}

// ========== 道具背包管理 ==========

/**
 * 添加道具
 */
function addItem(itemId, count = 1) {
  if (!gameState.player.bag[itemId]) {
    gameState.player.bag[itemId] = 0;
  }
  gameState.player.bag[itemId] += count;
  saveGame();
}

/**
 * 移除道具
 */
function removeItem(itemId, count = 1) {
  if (!gameState.player.bag[itemId] || gameState.player.bag[itemId] < count) {
    return false;
  }
  gameState.player.bag[itemId] -= count;
  if (gameState.player.bag[itemId] === 0) {
    delete gameState.player.bag[itemId];
  }
  saveGame();
  return true;
}

/**
 * 获取道具数量
 */
function getItemCount(itemId) {
  return gameState.player.bag[itemId] || 0;
}

/**
 * 使用道具
 */
function useItem(itemId, targetPokemon) {
  if (getItemCount(itemId) === 0) {
    return { success: false, message: '没有该道具' };
  }

  const item = createItem(itemId);
  if (!item) {
    return { success: false, message: '无效的道具' };
  }

  const result = item.use(targetPokemon);
  if (result.success && item.type === 'medicine') {
    removeItem(itemId, 1);
  }

  return result;
}

// ========== 保存游戏 ==========
function saveGame() {
  try {
    const saveData = {
      version: "3.0",  // 版本号升级，支持队伍、背包和捕捉系统
      timestamp: Date.now(),

      // 保存队伍中的所有宝可梦
      pokemonTeam: gameState.player.pokemonTeam.map(p => ({
        speciesId: p.speciesId,
        level: p.level,
        exp: p.exp,
        currentHP: p.currentHP,
        maxHP: p.maxHP,
        attack: p.attack,
        defense: p.defense,
        speed: p.speed,
        moves: p.moves.map(m => m.id)
      })),

      // 保存盒子中的宝可梦
      pokemonBox: gameState.player.pokemonBox.map(p => ({
        speciesId: p.speciesId,
        level: p.level,
        exp: p.exp,
        currentHP: p.currentHP,
        maxHP: p.maxHP,
        attack: p.attack,
        defense: p.defense,
        speed: p.speed,
        moves: p.moves.map(m => m.id)
      })),

      activePokemonIndex: gameState.player.activePokemonIndex,

      // 保存背包
      bag: gameState.player.bag,

      // 保存统计数据
      stats: {
        battlesWon: gameState.player.battlesWon,
        totalBattles: gameState.player.totalBattles,
        money: gameState.player.money,
        trainerDefeats: gameState.player.trainerDefeats,
        capturedCount: gameState.player.capturedCount
      },

      // 保存勋章
      badges: gameState.player.badges || []
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

    // 兼容旧版本存档（2.0及以下）
    if (data.version === "2.0" || !data.version) {
      return loadLegacySave(data);
    }

    // 加载新版本存档（3.0）
    // 重建队伍中的宝可梦
    gameState.player.pokemonTeam = data.pokemonTeam.map(pData => {
      const pokemon = new Pokemon(pData.speciesId, pData.level);
      pokemon.exp = pData.exp;
      pokemon.currentHP = pData.currentHP;
      pokemon.maxHP = pData.maxHP;
      pokemon.attack = pData.attack;
      pokemon.defense = pData.defense;
      pokemon.speed = pData.speed;
      pokemon.moves = pData.moves.map(moveId => new Move(moveId));
      return pokemon;
    });

    // 重建盒子中的宝可梦
    gameState.player.pokemonBox = (data.pokemonBox || []).map(pData => {
      const pokemon = new Pokemon(pData.speciesId, pData.level);
      pokemon.exp = pData.exp;
      pokemon.currentHP = pData.currentHP;
      pokemon.maxHP = pData.maxHP;
      pokemon.attack = pData.attack;
      pokemon.defense = pData.defense;
      pokemon.speed = pData.speed;
      pokemon.moves = pData.moves.map(moveId => new Move(moveId));
      return pokemon;
    });

    gameState.player.activePokemonIndex = data.activePokemonIndex || 0;
    gameState.player.pokemon = getCurrentPokemon();

    // 加载背包
    gameState.player.bag = data.bag || {};

    // 加载统计数据
    gameState.player.battlesWon = data.stats.battlesWon;
    gameState.player.totalBattles = data.stats.totalBattles;
    gameState.player.money = data.stats.money !== undefined ? data.stats.money : 3000;
    gameState.player.trainerDefeats = data.stats.trainerDefeats || 0;
    gameState.player.capturedCount = data.stats.capturedCount || 0;

    // 加载勋章
    gameState.player.badges = data.badges || [];

    console.log('游戏已加载');
    return true;
  } catch (error) {
    console.error('加载游戏失败:', error);
    return false;
  }
}

// ========== 加载旧版本存档 ==========
function loadLegacySave(data) {
  console.log('检测到旧版本存档，正在迁移...');

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

  // 迁移到队伍系统
  gameState.player.pokemonTeam = [pokemon];
  gameState.player.pokemonBox = [];
  gameState.player.activePokemonIndex = 0;
  gameState.player.pokemon = pokemon;

  // 初始化背包（赠送新手礼包）
  gameState.player.bag = {
    'potion': 5,
    'pokeball': 5
  };

  gameState.player.battlesWon = data.stats.battlesWon;
  gameState.player.totalBattles = data.stats.totalBattles;
  gameState.player.money = data.stats.money !== undefined ? data.stats.money : 3000;
  gameState.player.trainerDefeats = data.stats.trainerDefeats || 0;
  gameState.player.capturedCount = 0;
  gameState.player.badges = [];

  // 保存迁移后的存档
  saveGame();
  console.log('存档迁移完成');
  return true;
}

// ========== 重置游戏 ==========
function resetGame() {
  localStorage.removeItem('pokemonSave');
  gameState.player.pokemon = null;
  gameState.player.pokemonTeam = [];
  gameState.player.pokemonBox = [];
  gameState.player.activePokemonIndex = 0;
  gameState.player.bag = {};
  gameState.player.battlesWon = 0;
  gameState.player.totalBattles = 0;
  gameState.player.money = 3000;
  gameState.player.trainerDefeats = 0;
  gameState.player.capturedCount = 0;
  gameState.player.badges = [];
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
