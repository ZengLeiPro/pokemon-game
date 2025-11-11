// ========== 道馆系统 ==========
/**
 * 道馆系统 - 8个属性道馆，每个道馆主有6只特定属性的宝可梦
 * 参考官方游戏的道馆馆长系统
 */

// ========== 道馆馆长类 ==========
/**
 * GymLeader类 - 道馆馆长
 * 继承自NPC，但有特殊的战斗规则
 */
class GymLeader extends NPC {
  constructor(id, name, type, pokemonTeam, badge) {
    super(id, name, 'gymLeader');

    this.gymType = type;              // 道馆属性（如：岩石、水、电等）
    this.pokemonTeam = pokemonTeam;   // 6只宝可梦的队伍
    this.badge = badge;               // 勋章信息
    this.defeated = false;            // 是否已被击败
  }

  // 道馆馆长交互 - 开始挑战
  interact() {
    if (this.defeated) {
      return {
        canBattle: false,
        message: `${this.name}: 你已经拥有了${this.badge.name}！继续你的旅程吧！`
      };
    }

    return {
      canBattle: true,
      message: `${this.gymType}属性道馆馆长 ${this.name} 接受你的挑战！`,
      badge: this.badge
    };
  }

  // 标记为已击败并授予勋章
  markDefeated() {
    this.defeated = true;
  }

  // 重置状态（用于重新挑战）
  reset() {
    this.defeated = false;
    this.pokemonTeam.forEach(p => p.fullHeal());
  }

  // 获取介绍文本
  getIntroduction() {
    return `${this.gymType}属性道馆馆长 ${this.name} 向你发起挑战！`;
  }

  // 获取战败台词
  getDefeatMessage() {
    return `${this.name}: 你的实力令人钦佩！这是你应得的${this.badge.name}！`;
  }

  // 获取当前可战斗的宝可梦
  getCurrentPokemon() {
    return this.pokemonTeam.find(p => p.currentHP > 0);
  }

  // 检查是否还有可战斗的宝可梦
  hasAlivePokemon() {
    return this.pokemonTeam.some(p => p.currentHP > 0);
  }
}

// ========== 勋章数据 ==========
const BADGES = {
  boulder: {
    id: 'boulder',
    name: '岩石勋章',
    icon: '🪨',
    type: '岩石',
    description: '证明击败了岩石道馆馆长的勋章'
  },
  cascade: {
    id: 'cascade',
    name: '蓝色勋章',
    icon: '💧',
    type: '水',
    description: '证明击败了水道馆馆长的勋章'
  },
  thunder: {
    id: 'thunder',
    name: '雷电勋章',
    icon: '⚡',
    type: '电',
    description: '证明击败了电道馆馆长的勋章'
  },
  rainbow: {
    id: 'rainbow',
    name: '彩虹勋章',
    icon: '🌿',
    type: '草',
    description: '证明击败了草道馆馆长的勋章'
  },
  soul: {
    id: 'soul',
    name: '粉红勋章',
    icon: '☠️',
    type: '毒',
    description: '证明击败了毒道馆馆长的勋章'
  },
  volcano: {
    id: 'volcano',
    name: '深红勋章',
    icon: '🔥',
    type: '火',
    description: '证明击败了火道馆馆长的勋章'
  },
  earth: {
    id: 'earth',
    name: '绿色勋章',
    icon: '🌍',
    type: '地面',
    description: '证明击败了地面道馆馆长的勋章'
  },
  dragon: {
    id: 'dragon',
    name: '龙之勋章',
    icon: '🐉',
    type: '龙',
    description: '证明击败了龙道馆馆长的勋章'
  }
};

// ========== 道馆数据配置 ==========
const GYM_DATA = {
  // 1. 岩石道馆（小刚）
  rock_gym: {
    id: 'rock_gym',
    name: '小刚',
    type: '岩石',
    badge: BADGES.boulder,
    recommendedLevel: 12,
    pokemon: [
      { species: 'geodude', level: 10 },
      { species: 'geodude', level: 11 },
      { species: 'onix', level: 14 },
      { species: 'geodude', level: 12 },
      { species: 'geodude', level: 13 },
      { species: 'onix', level: 15 }
    ],
    location: '尼比市',
    description: '坚如磐石的男子汉！'
  },

  // 2. 水道馆（小霞）
  water_gym: {
    id: 'water_gym',
    name: '小霞',
    type: '水',
    badge: BADGES.cascade,
    recommendedLevel: 18,
    pokemon: [
      { species: 'staryu', level: 16 },
      { species: 'squirtle', level: 17 },
      { species: 'psyduck', level: 17 },
      { species: 'goldeen', level: 18 },
      { species: 'staryu', level: 19 },
      { species: 'starmie', level: 21 }
    ],
    location: '华蓝市',
    description: '水之美少女训练家！'
  },

  // 3. 电道馆（马志士）
  electric_gym: {
    id: 'electric_gym',
    name: '马志士',
    type: '电',
    badge: BADGES.thunder,
    recommendedLevel: 24,
    pokemon: [
      { species: 'voltorb', level: 21 },
      { species: 'pikachu', level: 22 },
      { species: 'pikachu', level: 23 },
      { species: 'magnemite', level: 23 },
      { species: 'voltorb', level: 24 },
      { species: 'raichu', level: 28 }
    ],
    location: '枯叶市',
    description: '闪电般的美国大兵！'
  },

  // 4. 草道馆（莉佳）
  grass_gym: {
    id: 'grass_gym',
    name: '莉佳',
    type: '草',
    badge: BADGES.rainbow,
    recommendedLevel: 29,
    pokemon: [
      { species: 'oddish', level: 26 },
      { species: 'bellsprout', level: 27 },
      { species: 'weepinbell', level: 28 },
      { species: 'gloom', level: 28 },
      { species: 'tangela', level: 29 },
      { species: 'vileplume', level: 32 }
    ],
    location: '彩虹市',
    description: '散发自然香气的公主！'
  },

  // 5. 毒道馆（阿桔）
  poison_gym: {
    id: 'poison_gym',
    name: '阿桔',
    type: '毒',
    badge: BADGES.soul,
    recommendedLevel: 35,
    pokemon: [
      { species: 'koffing', level: 32 },
      { species: 'grimer', level: 33 },
      { species: 'koffing', level: 34 },
      { species: 'grimer', level: 34 },
      { species: 'weezing', level: 36 },
      { species: 'muk', level: 38 }
    ],
    location: '浅红市',
    description: '忍术与毒的大师！'
  },

  // 6. 火道馆（夏伯）
  fire_gym: {
    id: 'fire_gym',
    name: '夏伯',
    type: '火',
    badge: BADGES.volcano,
    recommendedLevel: 42,
    pokemon: [
      { species: 'growlithe', level: 38 },
      { species: 'vulpix', level: 39 },
      { species: 'ponyta', level: 40 },
      { species: 'growlithe', level: 41 },
      { species: 'arcanine', level: 43 },
      { species: 'ninetales', level: 45 }
    ],
    location: '红莲岛',
    description: '热情燃烧的测验狂！'
  },

  // 7. 地面道馆（坂木）
  ground_gym: {
    id: 'ground_gym',
    name: '坂木',
    type: '地面',
    badge: BADGES.earth,
    recommendedLevel: 48,
    pokemon: [
      { species: 'sandshrew', level: 44 },
      { species: 'diglett', level: 45 },
      { species: 'sandslash', level: 46 },
      { species: 'dugtrio', level: 47 },
      { species: 'nidoking', level: 49 },
      { species: 'nidoqueen', level: 50 }
    ],
    location: '常青市',
    description: '大地的主宰者！'
  },

  // 8. 龙道馆（渡）
  dragon_gym: {
    id: 'dragon_gym',
    name: '渡',
    type: '龙',
    badge: BADGES.dragon,
    recommendedLevel: 55,
    pokemon: [
      { species: 'dragonair', level: 50 },
      { species: 'dragonair', level: 51 },
      { species: 'dragonair', level: 52 },
      { species: 'dragonite', level: 53 },
      { species: 'dragonite', level: 54 },
      { species: 'dragonite', level: 58 }
    ],
    location: '石英高原',
    description: '龙系大师，四天王之首！'
  }
};

// ========== 创建道馆馆长实例 ==========
/**
 * 根据道馆ID创建道馆馆长实例
 */
function createGymLeader(gymId) {
  const data = GYM_DATA[gymId];
  if (!data) {
    console.error(`未找到道馆: ${gymId}`);
    return null;
  }

  // 创建道馆馆长的6只宝可梦队伍
  const pokemonTeam = data.pokemon.map(pData => {
    const pokemon = new Pokemon(pData.species, pData.level);
    return pokemon;
  });

  // 创建道馆馆长实例
  return new GymLeader(
    data.id,
    data.name,
    data.type,
    pokemonTeam,
    data.badge
  );
}

// ========== 获取所有道馆列表 ==========
function getAllGyms() {
  return Object.keys(GYM_DATA).map(gymId => {
    const data = GYM_DATA[gymId];
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      badge: data.badge,
      recommendedLevel: data.recommendedLevel,
      location: data.location,
      description: data.description
    };
  });
}

// ========== 获取勋章信息 ==========
function getBadgeInfo(badgeId) {
  return BADGES[badgeId];
}

// ========== 检查是否已获得勋章 ==========
function hasBadge(badgeId) {
  return gameState.player.badges && gameState.player.badges.includes(badgeId);
}

// ========== 授予勋章 ==========
function awardBadge(badgeId) {
  if (!gameState.player.badges) {
    gameState.player.badges = [];
  }

  if (!gameState.player.badges.includes(badgeId)) {
    gameState.player.badges.push(badgeId);
    saveGame();
    return true;
  }

  return false;
}

// ========== 获取已获得的勋章数量 ==========
function getBadgeCount() {
  return gameState.player.badges ? gameState.player.badges.length : 0;
}
