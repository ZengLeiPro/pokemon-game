// ========== 属性克制表 ==========
const TYPE_CHART = {
  "火": {
    "草": 2.0,
    "冰": 2.0,
    "虫": 2.0,
    "钢": 2.0,
    "火": 0.5,
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
    "地面": 0.0
  },
  "普通": {
    "岩石": 0.5,
    "钢": 0.5
  },
  "毒": {
    "草": 2.0,
    "毒": 0.5,
    "地面": 0.5,
    "岩石": 0.5,
    "钢": 0.0
  },
  "飞行": {
    "草": 2.0,
    "虫": 2.0,
    "电": 0.5,
    "岩石": 0.5,
    "钢": 0.5
  },
  "虫": {
    "草": 2.0,
    "火": 0.5,
    "飞行": 0.5,
    "岩石": 0.5
  }
};

// ========== 经验值等级表 ==========
const EXP_TABLE = {
  1: 0,
  2: 8,
  3: 27,
  4: 64,
  5: 125,
  6: 216,
  7: 343,
  8: 512,
  9: 729,
  10: 1000,
  11: 1331,
  12: 1728,
  13: 2197,
  14: 2744,
  15: 3375,
  16: 4096,
  17: 4913,
  18: 5832,
  19: 6859,
  20: 8000,
  21: 9261,
  22: 10648,
  23: 12167,
  24: 13824,
  25: 15625,
  26: 17576,
  27: 19683,
  28: 21952,
  29: 24389,
  30: 27000,
  31: 29791,
  32: 32768,
  33: 35937,
  34: 39304,
  35: 42875,
  36: 46656,
  37: 50653,
  38: 54872,
  39: 59319,
  40: 64000,
  41: 68921,
  42: 74088,
  43: 79507,
  44: 85184,
  45: 91125,
  46: 97336,
  47: 103823,
  48: 110592,
  49: 117649,
  50: 125000
};

// ========== 技能数据 ==========
const MOVE_DATA = {
  // 火系技能
  "ember": {
    "name": "火花",
    "nameEn": "Ember",
    "type": "火",
    "category": "attack",
    "power": 40,
    "accuracy": 100,
    "pp": 25,
    "description": "发射小火苗攻击对手"
  },
  "flamethrower": {
    "name": "喷射火焰",
    "nameEn": "Flamethrower",
    "type": "火",
    "category": "attack",
    "power": 90,
    "accuracy": 100,
    "pp": 15,
    "description": "喷射烈焰攻击对手"
  },

  // 水系技能
  "waterGun": {
    "name": "水枪",
    "nameEn": "Water Gun",
    "type": "水",
    "category": "attack",
    "power": 40,
    "accuracy": 100,
    "pp": 25,
    "description": "喷射水流攻击对手"
  },
  "bubble": {
    "name": "泡沫",
    "nameEn": "Bubble",
    "type": "水",
    "category": "attack",
    "power": 40,
    "accuracy": 100,
    "pp": 30,
    "description": "喷射泡沫攻击对手"
  },
  "hydroPump": {
    "name": "水炮",
    "nameEn": "Hydro Pump",
    "type": "水",
    "category": "attack",
    "power": 110,
    "accuracy": 80,
    "pp": 5,
    "description": "喷射大量水流攻击对手"
  },

  // 草系技能
  "vineWhip": {
    "name": "藤鞭",
    "nameEn": "Vine Whip",
    "type": "草",
    "category": "attack",
    "power": 45,
    "accuracy": 100,
    "pp": 25,
    "description": "用藤鞭抽打对手"
  },
  "razorLeaf": {
    "name": "飞叶快刀",
    "nameEn": "Razor Leaf",
    "type": "草",
    "category": "attack",
    "power": 55,
    "accuracy": 95,
    "pp": 25,
    "description": "用叶片切割对手"
  },
  "solarBeam": {
    "name": "日光束",
    "nameEn": "Solar Beam",
    "type": "草",
    "category": "attack",
    "power": 120,
    "accuracy": 100,
    "pp": 10,
    "description": "收集光线攻击对手"
  },
  "poisonPowder": {
    "name": "毒粉",
    "nameEn": "Poison Powder",
    "type": "毒",
    "category": "attack",
    "power": 35,
    "accuracy": 75,
    "pp": 35,
    "description": "撒出毒粉攻击对手"
  },

  // 电系技能
  "thunderShock": {
    "name": "电击",
    "nameEn": "Thunder Shock",
    "type": "电",
    "category": "attack",
    "power": 40,
    "accuracy": 100,
    "pp": 30,
    "description": "释放电流攻击对手"
  },
  "thunderbolt": {
    "name": "十万伏特",
    "nameEn": "Thunderbolt",
    "type": "电",
    "category": "attack",
    "power": 90,
    "accuracy": 100,
    "pp": 15,
    "description": "释放强大电流攻击对手"
  },

  // 普通系技能
  "tackle": {
    "name": "撞击",
    "nameEn": "Tackle",
    "type": "普通",
    "category": "attack",
    "power": 40,
    "accuracy": 100,
    "pp": 35,
    "description": "撞击对手"
  },
  "scratch": {
    "name": "抓",
    "nameEn": "Scratch",
    "type": "普通",
    "category": "attack",
    "power": 40,
    "accuracy": 100,
    "pp": 35,
    "description": "用爪子抓对手"
  },
  "bite": {
    "name": "咬住",
    "nameEn": "Bite",
    "type": "普通",
    "category": "attack",
    "power": 60,
    "accuracy": 100,
    "pp": 25,
    "description": "用牙齿咬住对手"
  },

  // 飞行系技能
  "peck": {
    "name": "啄",
    "nameEn": "Peck",
    "type": "飞行",
    "category": "attack",
    "power": 35,
    "accuracy": 100,
    "pp": 35,
    "description": "用尖嘴啄对手"
  },

  // 虫系技能
  "bugBite": {
    "name": "虫咬",
    "nameEn": "Bug Bite",
    "type": "虫",
    "category": "attack",
    "power": 60,
    "accuracy": 100,
    "pp": 20,
    "description": "咬住对手"
  },
  "stringShot": {
    "name": "吐丝",
    "nameEn": "String Shot",
    "type": "虫",
    "category": "attack",
    "power": 25,
    "accuracy": 95,
    "pp": 40,
    "description": "吐出丝缠住对手"
  },

  // 辅助技能
  "tailWhip": {
    "name": "摇尾巴",
    "nameEn": "Tail Whip",
    "type": "普通",
    "category": "support",
    "power": 0,
    "accuracy": 100,
    "pp": 30,
    "effect": {
      "target": "opponent",
      "stat": "defense",
      "modifier": -1
    },
    "description": "降低对方的防御"
  },
  "withdraw": {
    "name": "缩入壳中",
    "nameEn": "Withdraw",
    "type": "水",
    "category": "support",
    "power": 0,
    "accuracy": 100,
    "pp": 40,
    "effect": {
      "target": "self",
      "stat": "defense",
      "modifier": 1
    },
    "description": "提升自己的防御"
  },
  "leer": {
    "name": "瞪眼",
    "nameEn": "Leer",
    "type": "普通",
    "category": "support",
    "power": 0,
    "accuracy": 100,
    "pp": 30,
    "effect": {
      "target": "opponent",
      "stat": "defense",
      "modifier": -1
    },
    "description": "降低对方的防御"
  },
  "growl": {
    "name": "叫声",
    "nameEn": "Growl",
    "type": "普通",
    "category": "support",
    "power": 0,
    "accuracy": 100,
    "pp": 40,
    "effect": {
      "target": "opponent",
      "stat": "attack",
      "modifier": -1
    },
    "description": "降低对方的攻击"
  },
  "dragonRage": {
    "name": "龙之怒",
    "nameEn": "Dragon Rage",
    "type": "普通",
    "category": "attack",
    "power": 50,
    "accuracy": 100,
    "pp": 10,
    "description": "释放龙之怒气"
  },
  "scaryFace": {
    "name": "鬼脸",
    "nameEn": "Scary Face",
    "type": "普通",
    "category": "support",
    "power": 0,
    "accuracy": 100,
    "pp": 10,
    "effect": {
      "target": "opponent",
      "stat": "defense",
      "modifier": -1
    },
    "description": "降低对方的防御"
  }
};

// ========== 宝可梦数据 ==========
const POKEMON_DATA = {
  // 御三家 - 小火龙系列
  "charmander": {
    "id": 4,
    "name": "小火龙",
    "nameEn": "Charmander",
    "type": ["火"],
    "baseStats": {
      "hp": 39,
      "attack": 52,
      "defense": 43
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 3,
      "defense": 2
    },
    "evolutions": [
      { "level": 16, "evolveInto": "charmeleon" },
      { "level": 36, "evolveInto": "charizard" }
    ],
    "learnset": [
      { "level": 1, "move": "ember" },
      { "level": 1, "move": "tailWhip" },
      { "level": 10, "move": "dragonRage" },
      { "level": 16, "move": "scaryFace" },
      { "level": 28, "move": "flamethrower" }
    ]
  },
  "charmeleon": {
    "id": 5,
    "name": "火恐龙",
    "nameEn": "Charmeleon",
    "type": ["火"],
    "baseStats": {
      "hp": 58,
      "attack": 64,
      "defense": 58
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 3,
      "defense": 2
    },
    "evolutions": [
      { "level": 36, "evolveInto": "charizard" }
    ],
    "learnset": [
      { "level": 1, "move": "ember" },
      { "level": 1, "move": "tailWhip" },
      { "level": 28, "move": "flamethrower" }
    ]
  },
  "charizard": {
    "id": 6,
    "name": "喷火龙",
    "nameEn": "Charizard",
    "type": ["火", "飞行"],
    "baseStats": {
      "hp": 78,
      "attack": 84,
      "defense": 78
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 3,
      "defense": 2
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "ember" },
      { "level": 1, "move": "flamethrower" }
    ]
  },

  // 御三家 - 杰尼龟系列
  "squirtle": {
    "id": 7,
    "name": "杰尼龟",
    "nameEn": "Squirtle",
    "type": ["水"],
    "baseStats": {
      "hp": 44,
      "attack": 48,
      "defense": 65
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 2,
      "defense": 3
    },
    "evolutions": [
      { "level": 16, "evolveInto": "wartortle" },
      { "level": 36, "evolveInto": "blastoise" }
    ],
    "learnset": [
      { "level": 1, "move": "waterGun" },
      { "level": 1, "move": "withdraw" },
      { "level": 10, "move": "bubble" },
      { "level": 16, "move": "bite" }
    ]
  },
  "wartortle": {
    "id": 8,
    "name": "卡咪龟",
    "nameEn": "Wartortle",
    "type": ["水"],
    "baseStats": {
      "hp": 59,
      "attack": 63,
      "defense": 80
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 2,
      "defense": 3
    },
    "evolutions": [
      { "level": 36, "evolveInto": "blastoise" }
    ],
    "learnset": [
      { "level": 1, "move": "waterGun" },
      { "level": 1, "move": "bubble" }
    ]
  },
  "blastoise": {
    "id": 9,
    "name": "水箭龟",
    "nameEn": "Blastoise",
    "type": ["水"],
    "baseStats": {
      "hp": 79,
      "attack": 83,
      "defense": 100
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 2,
      "defense": 3
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "waterGun" },
      { "level": 1, "move": "hydroPump" }
    ]
  },

  // 御三家 - 妙蛙种子系列
  "bulbasaur": {
    "id": 1,
    "name": "妙蛙种子",
    "nameEn": "Bulbasaur",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 45,
      "attack": 49,
      "defense": 49
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 2,
      "defense": 2
    },
    "evolutions": [
      { "level": 16, "evolveInto": "ivysaur" },
      { "level": 36, "evolveInto": "venusaur" }
    ],
    "learnset": [
      { "level": 1, "move": "vineWhip" },
      { "level": 1, "move": "leer" },
      { "level": 10, "move": "poisonPowder" },
      { "level": 16, "move": "razorLeaf" },
      { "level": 32, "move": "solarBeam" }
    ]
  },
  "ivysaur": {
    "id": 2,
    "name": "妙蛙草",
    "nameEn": "Ivysaur",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 60,
      "attack": 62,
      "defense": 63
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 2,
      "defense": 2
    },
    "evolutions": [
      { "level": 36, "evolveInto": "venusaur" }
    ],
    "learnset": [
      { "level": 1, "move": "vineWhip" },
      { "level": 1, "move": "razorLeaf" }
    ]
  },
  "venusaur": {
    "id": 3,
    "name": "妙蛙花",
    "nameEn": "Venusaur",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 80,
      "attack": 82,
      "defense": 83
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 2,
      "defense": 2
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "vineWhip" },
      { "level": 1, "move": "solarBeam" }
    ]
  },

  // 野生宝可梦
  "caterpie": {
    "id": 10,
    "name": "绿毛虫",
    "nameEn": "Caterpie",
    "type": ["虫"],
    "baseStats": {
      "hp": 45,
      "attack": 30,
      "defense": 35
    },
    "statsGrowth": {
      "hp": 5,
      "attack": 1,
      "defense": 1
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "stringShot" }
    ]
  },
  "weedle": {
    "id": 13,
    "name": "独角虫",
    "nameEn": "Weedle",
    "type": ["虫", "毒"],
    "baseStats": {
      "hp": 40,
      "attack": 35,
      "defense": 30
    },
    "statsGrowth": {
      "hp": 5,
      "attack": 1,
      "defense": 1
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "poisonPowder" }
    ]
  },
  "rattata": {
    "id": 19,
    "name": "小拉达",
    "nameEn": "Rattata",
    "type": ["普通"],
    "baseStats": {
      "hp": 30,
      "attack": 56,
      "defense": 35
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 2,
      "defense": 1
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "tailWhip" },
      { "level": 7, "move": "bite" }
    ]
  },
  "pidgey": {
    "id": 16,
    "name": "波波",
    "nameEn": "Pidgey",
    "type": ["普通", "飞行"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 40
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 2,
      "defense": 1
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "peck" },
      { "level": 9, "move": "growl" }
    ]
  },
  "pikachu": {
    "id": 25,
    "name": "皮卡丘",
    "nameEn": "Pikachu",
    "type": ["电"],
    "baseStats": {
      "hp": 35,
      "attack": 55,
      "defense": 40
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 2,
      "defense": 1
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "thunderShock" },
      { "level": 1, "move": "tailWhip" },
      { "level": 13, "move": "thunderbolt" }
    ]
  },
  "sandshrew": {
    "id": 27,
    "name": "穿山鼠",
    "nameEn": "Sandshrew",
    "type": ["地面"],
    "baseStats": {
      "hp": 50,
      "attack": 75,
      "defense": 85
    },
    "statsGrowth": {
      "hp": 7,
      "attack": 3,
      "defense": 3
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "scratch" },
      { "level": 1, "move": "leer" }
    ]
  }
};

// ========== 野生宝可梦生成池 ==========
const WILD_POKEMON_POOL = [
  // 低等级区域（1-15级）
  {
    "species": "caterpie",
    "minLevel": 2,
    "maxLevel": 7,
    "weight": 30
  },
  {
    "species": "weedle",
    "minLevel": 2,
    "maxLevel": 7,
    "weight": 30
  },
  {
    "species": "rattata",
    "minLevel": 2,
    "maxLevel": 10,
    "weight": 25
  },
  {
    "species": "pidgey",
    "minLevel": 3,
    "maxLevel": 12,
    "weight": 20
  },

  // 中等级区域（10-30级）
  {
    "species": "pikachu",
    "minLevel": 10,
    "maxLevel": 25,
    "weight": 15
  },
  {
    "species": "sandshrew",
    "minLevel": 12,
    "maxLevel": 28,
    "weight": 12
  },

  // 高等级区域（30-50级）
  {
    "species": "charizard",
    "minLevel": 36,
    "maxLevel": 45,
    "weight": 3
  },
  {
    "species": "blastoise",
    "minLevel": 36,
    "maxLevel": 45,
    "weight": 3
  },
  {
    "species": "venusaur",
    "minLevel": 36,
    "maxLevel": 45,
    "weight": 3
  }
];
