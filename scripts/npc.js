// ========== NPC基类 ==========
/**
 * NPC基类 - 为未来扩展预留
 * 可以派生出各种NPC类型：训练家、道馆馆长、商店老板等
 */
class NPC {
  constructor(id, name, type) {
    this.id = id;           // NPC唯一标识
    this.name = name;       // NPC名字
    this.type = type;       // NPC类型: 'trainer', 'gymLeader', 'shopKeeper' 等
  }

  // 交互方法 - 子类实现
  interact() {
    throw new Error('子类必须实现 interact() 方法');
  }
}

// ========== 训练家类 ==========
/**
 * Trainer类 - 可对战的训练家
 * 参考官方游戏的训练家系统
 */
class Trainer extends NPC {
  constructor(id, name, trainerClass, pokemon, prizeMoney) {
    super(id, name, 'trainer');

    this.trainerClass = trainerClass;  // 训练家职业（如：短裤小子、虫捕少年等）
    this.pokemon = pokemon;            // 训练家的宝可梦（Pokemon对象）
    this.prizeMoney = prizeMoney;      // 战胜后获得的奖金
    this.defeated = false;             // 是否已被击败
  }

  // 训练家交互 - 开始对战
  interact() {
    if (this.defeated) {
      return {
        canBattle: false,
        message: `${this.name}: 你真厉害！继续加油吧！`
      };
    }

    return {
      canBattle: true,
      message: `${this.trainerClass} ${this.name} 向你发起了挑战！`,
      prizeMoney: this.prizeMoney
    };
  }

  // 标记为已击败
  markDefeated() {
    this.defeated = true;
  }

  // 重置状态（用于重新挑战）
  reset() {
    this.defeated = false;
    this.pokemon.fullHeal();
  }

  // 获取介绍文本
  getIntroduction() {
    return `${this.trainerClass} ${this.name}想要和你对战！`;
  }

  // 获取战败台词
  getDefeatMessage() {
    return `${this.name}: 我输了...你真是厉害的训练家！`;
  }
}

// ========== 训练家数据库 ==========
const TRAINER_DATA = {
  // 短裤小子系列
  "youngster_joey": {
    id: "youngster_joey",
    name: "小刚",
    trainerClass: "短裤小子",
    pokemonSpecies: "rattata",
    pokemonLevel: 5,
    basePrize: 100
  },
  "youngster_mikey": {
    id: "youngster_mikey",
    name: "小明",
    trainerClass: "短裤小子",
    pokemonSpecies: "pidgey",
    pokemonLevel: 7,
    basePrize: 140
  },

  // 虫捕少年系列
  "bugcatcher_rick": {
    id: "bugcatcher_rick",
    name: "阿力",
    trainerClass: "虫捕少年",
    pokemonSpecies: "caterpie",
    pokemonLevel: 4,
    basePrize: 80
  },
  "bugcatcher_doug": {
    id: "bugcatcher_doug",
    name: "阿东",
    trainerClass: "虫捕少年",
    pokemonSpecies: "weedle",
    pokemonLevel: 6,
    basePrize: 120
  },

  // 女训练家系列
  "lass_alice": {
    id: "lass_alice",
    name: "爱丽丝",
    trainerClass: "女训练家",
    pokemonSpecies: "pikachu",
    pokemonLevel: 8,
    basePrize: 160
  },

  // 高级训练家（更强）
  "camper_liam": {
    id: "camper_liam",
    name: "利亚姆",
    trainerClass: "野营小子",
    pokemonSpecies: "sandshrew",
    pokemonLevel: 12,
    basePrize: 240
  },

  // 御三家训练家（强力）
  "cooltrainer_jake": {
    id: "cooltrainer_jake",
    name: "杰克",
    trainerClass: "精英训练家",
    pokemonSpecies: "charmander",
    pokemonLevel: 15,
    basePrize: 400
  },
  "cooltrainer_emma": {
    id: "cooltrainer_emma",
    name: "艾玛",
    trainerClass: "精英训练家",
    pokemonSpecies: "squirtle",
    pokemonLevel: 15,
    basePrize: 400
  }
};

// ========== 训练家生成池 ==========
// 根据玩家等级匹配合适的训练家
const TRAINER_POOL = [
  // 低等级区域（1-10级）
  {
    trainerId: "youngster_joey",
    minPlayerLevel: 1,
    maxPlayerLevel: 8,
    weight: 30
  },
  {
    trainerId: "bugcatcher_rick",
    minPlayerLevel: 1,
    maxPlayerLevel: 6,
    weight: 25
  },
  {
    trainerId: "bugcatcher_doug",
    minPlayerLevel: 3,
    maxPlayerLevel: 10,
    weight: 20
  },
  {
    trainerId: "youngster_mikey",
    minPlayerLevel: 5,
    maxPlayerLevel: 12,
    weight: 25
  },

  // 中等级区域（8-20级）
  {
    trainerId: "lass_alice",
    minPlayerLevel: 6,
    maxPlayerLevel: 15,
    weight: 20
  },
  {
    trainerId: "camper_liam",
    minPlayerLevel: 10,
    maxPlayerLevel: 20,
    weight: 15
  },

  // 高等级区域（15+级）
  {
    trainerId: "cooltrainer_jake",
    minPlayerLevel: 12,
    maxPlayerLevel: 50,
    weight: 10
  },
  {
    trainerId: "cooltrainer_emma",
    minPlayerLevel: 12,
    maxPlayerLevel: 50,
    weight: 10
  }
];

// ========== 生成训练家 ==========
/**
 * 根据玩家等级生成合适的训练家
 * 参考官方游戏，训练家等级和奖金会根据玩家等级调整
 */
function generateTrainer(playerLevel) {
  // 1. 筛选符合等级范围的训练家
  const availablePool = TRAINER_POOL.filter(entry => {
    return entry.maxPlayerLevel >= playerLevel && entry.minPlayerLevel <= playerLevel;
  });

  if (availablePool.length === 0) {
    // 如果没有符合的，默认生成一个短裤小子
    const data = TRAINER_DATA["youngster_joey"];
    return createTrainerInstance(data, playerLevel);
  }

  // 2. 加权随机选择
  const totalWeight = availablePool.reduce((sum, entry) => sum + entry.weight, 0);
  let random = Math.random() * totalWeight;

  for (let entry of availablePool) {
    random -= entry.weight;
    if (random <= 0) {
      const data = TRAINER_DATA[entry.trainerId];
      return createTrainerInstance(data, playerLevel);
    }
  }

  // 兜底
  const data = TRAINER_DATA["youngster_joey"];
  return createTrainerInstance(data, playerLevel);
}

// ========== 创建训练家实例 ==========
/**
 * 根据训练家数据创建实例
 * 训练家的宝可梦等级会根据玩家等级适当调整
 */
function createTrainerInstance(data, playerLevel) {
  // 训练家宝可梦等级在数据等级±1范围内，但不超过玩家等级+2
  let trainerPokemonLevel = data.pokemonLevel;

  // 如果玩家等级高，适当提升训练家宝可梦等级（但保持挑战性）
  if (playerLevel > data.pokemonLevel + 3) {
    trainerPokemonLevel = Math.min(playerLevel - 1, playerLevel);
  }

  trainerPokemonLevel = Math.max(1, Math.min(50, trainerPokemonLevel));

  // 创建训练家的宝可梦
  const pokemon = new Pokemon(data.pokemonSpecies, trainerPokemonLevel);

  // 计算奖金：基础奖金 × 宝可梦等级
  const prizeMoney = data.basePrize + (trainerPokemonLevel * 20);

  // 创建训练家实例
  return new Trainer(
    data.id,
    data.name,
    data.trainerClass,
    pokemon,
    prizeMoney
  );
}
