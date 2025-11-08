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
// 数据来源: PokeAPI (https://pokeapi.co/)
// 更新时间: 2025-11-08T00:54:43.713Z
// 包含151只初代宝可梦完整数据（已配置进化链和技能学习表）

const POKEMON_DATA = {
  // #1 妙蛙种子
  "bulbasaur": {
    "id": 1,
    "name": "妙蛙种子",
    "nameEn": "Bulbasaur",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 45,
      "attack": 49,
      "defense": 49,
      "speed": 45
    },
    "statsGrowth": {
      "hp": 7,
      "attack": 8,
      "defense": 8,
      "speed": 7
    },
    "evolutions": [
      { "level": 16, "evolveInto": "ivysaur" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "growl" },
      { "level": 7, "move": "vineWhip" },
      { "level": 13, "move": "poisonPowder" },
      { "level": 20, "move": "razorLeaf" },
      { "level": 32, "move": "solarBeam" }
    ]
  },

  // #2 妙蛙草
  "ivysaur": {
    "id": 2,
    "name": "妙蛙草",
    "nameEn": "Ivysaur",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 60,
      "attack": 62,
      "defense": 63,
      "speed": 60
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 10,
      "defense": 10,
      "speed": 9
    },
    "evolutions": [
      { "level": 32, "evolveInto": "venusaur" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "growl" },
      { "level": 1, "move": "vineWhip" },
      { "level": 7, "move": "vineWhip" },
      { "level": 13, "move": "poisonPowder" },
      { "level": 22, "move": "razorLeaf" },
      { "level": 36, "move": "solarBeam" }
    ]
  },

  // #3 妙蛙花
  "venusaur": {
    "id": 3,
    "name": "妙蛙花",
    "nameEn": "Venusaur",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 80,
      "attack": 82,
      "defense": 83,
      "speed": 80
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 13,
      "defense": 13,
      "speed": 12
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "growl" },
      { "level": 1, "move": "vineWhip" },
      { "level": 1, "move": "razorLeaf" },
      { "level": 32, "move": "solarBeam" }
    ]
  },

  // #4 小火龙
  "charmander": {
    "id": 4,
    "name": "小火龙",
    "nameEn": "Charmander",
    "type": ["火"],
    "baseStats": {
      "hp": 39,
      "attack": 52,
      "defense": 43,
      "speed": 65
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 8,
      "defense": 7,
      "speed": 10
    },
    "evolutions": [
      { "level": 16, "evolveInto": "charmeleon" }
    ],
    "learnset": [
      { "level": 1, "move": "scratch" },
      { "level": 1, "move": "growl" },
      { "level": 7, "move": "ember" },
      { "level": 13, "move": "scaryFace" },
      { "level": 19, "move": "bite" },
      { "level": 28, "move": "flamethrower" },
      { "level": 34, "move": "dragonRage" }
    ]
  },

  // #5 火恐龙
  "charmeleon": {
    "id": 5,
    "name": "火恐龙",
    "nameEn": "Charmeleon",
    "type": ["火"],
    "baseStats": {
      "hp": 58,
      "attack": 64,
      "defense": 58,
      "speed": 80
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 10,
      "defense": 9,
      "speed": 12
    },
    "evolutions": [
      { "level": 36, "evolveInto": "charizard" }
    ],
    "learnset": [
      { "level": 1, "move": "scratch" },
      { "level": 1, "move": "growl" },
      { "level": 1, "move": "ember" },
      { "level": 7, "move": "ember" },
      { "level": 13, "move": "scaryFace" },
      { "level": 20, "move": "bite" },
      { "level": 30, "move": "flamethrower" },
      { "level": 36, "move": "dragonRage" }
    ]
  },

  // #6 喷火龙
  "charizard": {
    "id": 6,
    "name": "喷火龙",
    "nameEn": "Charizard",
    "type": ["火", "飞行"],
    "baseStats": {
      "hp": 78,
      "attack": 84,
      "defense": 78,
      "speed": 100
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 13,
      "defense": 12,
      "speed": 15
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "scratch" },
      { "level": 1, "move": "growl" },
      { "level": 1, "move": "ember" },
      { "level": 1, "move": "flamethrower" },
      { "level": 36, "move": "dragonRage" }
    ]
  },

  // #7 杰尼龟
  "squirtle": {
    "id": 7,
    "name": "杰尼龟",
    "nameEn": "Squirtle",
    "type": ["水"],
    "baseStats": {
      "hp": 44,
      "attack": 48,
      "defense": 65,
      "speed": 43
    },
    "statsGrowth": {
      "hp": 7,
      "attack": 8,
      "defense": 10,
      "speed": 7
    },
    "evolutions": [
      { "level": 16, "evolveInto": "wartortle" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "tailWhip" },
      { "level": 7, "move": "bubble" },
      { "level": 10, "move": "waterGun" },
      { "level": 13, "move": "withdraw" },
      { "level": 18, "move": "bite" },
      { "level": 28, "move": "hydroPump" }
    ]
  },

  // #8 卡咪龟
  "wartortle": {
    "id": 8,
    "name": "卡咪龟",
    "nameEn": "Wartortle",
    "type": ["水"],
    "baseStats": {
      "hp": 59,
      "attack": 63,
      "defense": 80,
      "speed": 58
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 10,
      "defense": 12,
      "speed": 9
    },
    "evolutions": [
      { "level": 36, "evolveInto": "blastoise" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "tailWhip" },
      { "level": 1, "move": "bubble" },
      { "level": 7, "move": "bubble" },
      { "level": 10, "move": "waterGun" },
      { "level": 13, "move": "withdraw" },
      { "level": 19, "move": "bite" },
      { "level": 31, "move": "hydroPump" }
    ]
  },

  // #9 水箭龟
  "blastoise": {
    "id": 9,
    "name": "水箭龟",
    "nameEn": "Blastoise",
    "type": ["水"],
    "baseStats": {
      "hp": 79,
      "attack": 83,
      "defense": 100,
      "speed": 78
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 13,
      "defense": 15,
      "speed": 12
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "bubble" },
      { "level": 1, "move": "waterGun" },
      { "level": 1, "move": "withdraw" },
      { "level": 36, "move": "hydroPump" }
    ]
  },

  // #10 绿毛虫
  "caterpie": {
    "id": 10,
    "name": "绿毛虫",
    "nameEn": "Caterpie",
    "type": ["虫"],
    "baseStats": {
      "hp": 45,
      "attack": 30,
      "defense": 35,
      "speed": 45
    },
    "statsGrowth": {
      "hp": 7,
      "attack": 5,
      "defense": 6,
      "speed": 7
    },
    "evolutions": [
      { "level": 7, "evolveInto": "metapod" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "stringShot" }
    ]
  },

  // #11 铁甲蛹
  "metapod": {
    "id": 11,
    "name": "铁甲蛹",
    "nameEn": "Metapod",
    "type": ["虫"],
    "baseStats": {
      "hp": 50,
      "attack": 20,
      "defense": 55,
      "speed": 30
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 3,
      "defense": 9,
      "speed": 5
    },
    "evolutions": [
      { "level": 10, "evolveInto": "butterfree" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 7, "move": "tackle" }
    ]
  },

  // #12 巴大蝶
  "butterfree": {
    "id": 12,
    "name": "巴大蝶",
    "nameEn": "Butterfree",
    "type": ["虫", "飞行"],
    "baseStats": {
      "hp": 60,
      "attack": 45,
      "defense": 50,
      "speed": 70
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 7,
      "defense": 8,
      "speed": 11
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "bugBite" },
      { "level": 13, "move": "poisonPowder" }
    ]
  },

  // #13 独角虫
  "weedle": {
    "id": 13,
    "name": "独角虫",
    "nameEn": "Weedle",
    "type": ["虫", "毒"],
    "baseStats": {
      "hp": 40,
      "attack": 35,
      "defense": 30,
      "speed": 50
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 6,
      "defense": 5,
      "speed": 8
    },
    "evolutions": [
      { "level": 7, "evolveInto": "kakuna" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "stringShot" }
    ]
  },

  // #14 铁壳蛹
  "kakuna": {
    "id": 14,
    "name": "铁壳蛹",
    "nameEn": "Kakuna",
    "type": ["虫", "毒"],
    "baseStats": {
      "hp": 45,
      "attack": 25,
      "defense": 50,
      "speed": 35
    },
    "statsGrowth": {
      "hp": 7,
      "attack": 4,
      "defense": 8,
      "speed": 6
    },
    "evolutions": [
      { "level": 10, "evolveInto": "beedrill" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 7, "move": "tackle" }
    ]
  },

  // #15 大针蜂
  "beedrill": {
    "id": 15,
    "name": "大针蜂",
    "nameEn": "Beedrill",
    "type": ["虫", "毒"],
    "baseStats": {
      "hp": 65,
      "attack": 90,
      "defense": 40,
      "speed": 75
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 14,
      "defense": 6,
      "speed": 12
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "bugBite" },
      { "level": 13, "move": "poisonPowder" }
    ]
  },

  // #16 波波
  "pidgey": {
    "id": 16,
    "name": "波波",
    "nameEn": "Pidgey",
    "type": ["普通", "飞行"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 40,
      "speed": 56
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 7,
      "defense": 6,
      "speed": 9
    },
    "evolutions": [
      { "level": 18, "evolveInto": "pidgeotto" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 5, "move": "peck" },
      { "level": 12, "move": "bite" }
    ]
  },

  // #17 比比鸟
  "pidgeotto": {
    "id": 17,
    "name": "比比鸟",
    "nameEn": "Pidgeotto",
    "type": ["普通", "飞行"],
    "baseStats": {
      "hp": 63,
      "attack": 60,
      "defense": 55,
      "speed": 71
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 9,
      "defense": 9,
      "speed": 11
    },
    "evolutions": [
      { "level": 36, "evolveInto": "pidgeot" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "peck" },
      { "level": 5, "move": "peck" },
      { "level": 12, "move": "bite" }
    ]
  },

  // #18 大比鸟
  "pidgeot": {
    "id": 18,
    "name": "大比鸟",
    "nameEn": "Pidgeot",
    "type": ["普通", "飞行"],
    "baseStats": {
      "hp": 83,
      "attack": 80,
      "defense": 75,
      "speed": 101
    },
    "statsGrowth": {
      "hp": 13,
      "attack": 12,
      "defense": 12,
      "speed": 16
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "peck" },
      { "level": 1, "move": "bite" }
    ]
  },

  // #19 小拉达
  "rattata": {
    "id": 19,
    "name": "小拉达",
    "nameEn": "Rattata",
    "type": ["普通"],
    "baseStats": {
      "hp": 30,
      "attack": 56,
      "defense": 35,
      "speed": 72
    },
    "statsGrowth": {
      "hp": 5,
      "attack": 9,
      "defense": 6,
      "speed": 11
    },
    "evolutions": [
      { "level": 20, "evolveInto": "raticate" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "tailWhip" },
      { "level": 7, "move": "bite" }
    ]
  },

  // #20 拉达
  "raticate": {
    "id": 20,
    "name": "拉达",
    "nameEn": "Raticate",
    "type": ["普通"],
    "baseStats": {
      "hp": 55,
      "attack": 81,
      "defense": 60,
      "speed": 97
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 13,
      "defense": 9,
      "speed": 15
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "tailWhip" },
      { "level": 1, "move": "bite" },
      { "level": 7, "move": "bite" }
    ]
  },

  // #21 烈雀
  "spearow": {
    "id": 21,
    "name": "烈雀",
    "nameEn": "Spearow",
    "type": ["普通", "飞行"],
    "baseStats": {
      "hp": 40,
      "attack": 60,
      "defense": 30,
      "speed": 70
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 9,
      "defense": 5,
      "speed": 11
    },
    "evolutions": [
      { "level": 20, "evolveInto": "fearow" }
    ],
    "learnset": [
      { "level": 1, "move": "peck" },
      { "level": 7, "move": "leer" }
    ]
  },

  // #22 大嘴雀
  "fearow": {
    "id": 22,
    "name": "大嘴雀",
    "nameEn": "Fearow",
    "type": ["普通", "飞行"],
    "baseStats": {
      "hp": 65,
      "attack": 90,
      "defense": 65,
      "speed": 100
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 14,
      "defense": 10,
      "speed": 15
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "peck" },
      { "level": 1, "move": "leer" }
    ]
  },

  // #23 阿柏蛇
  "ekans": {
    "id": 23,
    "name": "阿柏蛇",
    "nameEn": "Ekans",
    "type": ["毒"],
    "baseStats": {
      "hp": 35,
      "attack": 60,
      "defense": 44,
      "speed": 55
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 9,
      "defense": 7,
      "speed": 9
    },
    "evolutions": [
      { "level": 22, "evolveInto": "arbok" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 8, "move": "poisonPowder" },
      { "level": 13, "move": "bite" }
    ]
  },

  // #24 阿柏怪
  "arbok": {
    "id": 24,
    "name": "阿柏怪",
    "nameEn": "Arbok",
    "type": ["毒"],
    "baseStats": {
      "hp": 60,
      "attack": 95,
      "defense": 69,
      "speed": 80
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 15,
      "defense": 11,
      "speed": 12
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "poisonPowder" },
      { "level": 1, "move": "bite" }
    ]
  },

  // #25 皮卡丘
  "pikachu": {
    "id": 25,
    "name": "皮卡丘",
    "nameEn": "Pikachu",
    "type": ["电"],
    "baseStats": {
      "hp": 35,
      "attack": 55,
      "defense": 40,
      "speed": 90
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 9,
      "defense": 6,
      "speed": 14
    },
    "evolutions": [
      { "level": 30, "evolveInto": "raichu" }
    ],
    "learnset": [
      { "level": 1, "move": "thunderShock" },
      { "level": 1, "move": "growl" },
      { "level": 6, "move": "tailWhip" },
      { "level": 13, "move": "thunderbolt" }
    ]
  },

  // #26 雷丘
  "raichu": {
    "id": 26,
    "name": "雷丘",
    "nameEn": "Raichu",
    "type": ["电"],
    "baseStats": {
      "hp": 60,
      "attack": 90,
      "defense": 55,
      "speed": 110
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 14,
      "defense": 9,
      "speed": 17
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "thunderShock" },
      { "level": 1, "move": "growl" },
      { "level": 1, "move": "thunderbolt" }
    ]
  },

  // #27 穿山鼠
  "sandshrew": {
    "id": 27,
    "name": "穿山鼠",
    "nameEn": "Sandshrew",
    "type": ["地面"],
    "baseStats": {
      "hp": 50,
      "attack": 75,
      "defense": 85,
      "speed": 40
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 12,
      "defense": 13,
      "speed": 6
    },
    "evolutions": [
      { "level": 22, "evolveInto": "sandslash" }
    ],
    "learnset": [
      { "level": 1, "move": "scratch" },
      { "level": 6, "move": "leer" }
    ]
  },

  // #28 穿山王
  "sandslash": {
    "id": 28,
    "name": "穿山王",
    "nameEn": "Sandslash",
    "type": ["地面"],
    "baseStats": {
      "hp": 75,
      "attack": 100,
      "defense": 110,
      "speed": 65
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 15,
      "defense": 17,
      "speed": 10
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "scratch" },
      { "level": 1, "move": "leer" }
    ]
  },

  // #29 尼多兰
  "nidoran-f": {
    "id": 29,
    "name": "尼多兰",
    "nameEn": "Nidoran f",
    "type": ["毒"],
    "baseStats": {
      "hp": 55,
      "attack": 47,
      "defense": 52,
      "speed": 41
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 8,
      "defense": 8,
      "speed": 7
    },
    "evolutions": [
      { "level": 16, "evolveInto": "nidorina" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 8, "move": "poisonPowder" }
    ]
  },

  // #30 尼多娜
  "nidorina": {
    "id": 30,
    "name": "尼多娜",
    "nameEn": "Nidorina",
    "type": ["毒"],
    "baseStats": {
      "hp": 70,
      "attack": 62,
      "defense": 67,
      "speed": 56
    },
    "statsGrowth": {
      "hp": 11,
      "attack": 10,
      "defense": 11,
      "speed": 9
    },
    "evolutions": [
      { "level": 36, "evolveInto": "nidoqueen" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "poisonPowder" }
    ]
  },

  // #31 尼多后
  "nidoqueen": {
    "id": 31,
    "name": "尼多后",
    "nameEn": "Nidoqueen",
    "type": ["毒", "地面"],
    "baseStats": {
      "hp": 90,
      "attack": 92,
      "defense": 87,
      "speed": 76
    },
    "statsGrowth": {
      "hp": 14,
      "attack": 14,
      "defense": 14,
      "speed": 12
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "poisonPowder" },
      { "level": 23, "move": "bite" }
    ]
  },

  // #32 尼多朗
  "nidoran-m": {
    "id": 32,
    "name": "尼多朗",
    "nameEn": "Nidoran m",
    "type": ["毒"],
    "baseStats": {
      "hp": 46,
      "attack": 57,
      "defense": 40,
      "speed": 50
    },
    "statsGrowth": {
      "hp": 7,
      "attack": 9,
      "defense": 6,
      "speed": 8
    },
    "evolutions": [
      { "level": 16, "evolveInto": "nidorino" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 8, "move": "poisonPowder" }
    ]
  },

  // #33 尼多力诺
  "nidorino": {
    "id": 33,
    "name": "尼多力诺",
    "nameEn": "Nidorino",
    "type": ["毒"],
    "baseStats": {
      "hp": 61,
      "attack": 72,
      "defense": 57,
      "speed": 65
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 11,
      "defense": 9,
      "speed": 10
    },
    "evolutions": [
      { "level": 36, "evolveInto": "nidoking" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "poisonPowder" }
    ]
  },

  // #34 尼多王
  "nidoking": {
    "id": 34,
    "name": "尼多王",
    "nameEn": "Nidoking",
    "type": ["毒", "地面"],
    "baseStats": {
      "hp": 81,
      "attack": 102,
      "defense": 77,
      "speed": 85
    },
    "statsGrowth": {
      "hp": 13,
      "attack": 16,
      "defense": 12,
      "speed": 13
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 1, "move": "poisonPowder" },
      { "level": 23, "move": "bite" }
    ]
  },

  // #35 皮皮
  "clefairy": {
    "id": 35,
    "name": "皮皮",
    "nameEn": "Clefairy",
    "type": ["妖精"],
    "baseStats": {
      "hp": 70,
      "attack": 45,
      "defense": 48,
      "speed": 35
    },
    "statsGrowth": {
      "hp": 11,
      "attack": 7,
      "defense": 8,
      "speed": 6
    },
    "evolutions": [
      { "level": 30, "evolveInto": "clefable" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #36 皮可西
  "clefable": {
    "id": 36,
    "name": "皮可西",
    "nameEn": "Clefable",
    "type": ["妖精"],
    "baseStats": {
      "hp": 95,
      "attack": 70,
      "defense": 73,
      "speed": 60
    },
    "statsGrowth": {
      "hp": 15,
      "attack": 11,
      "defense": 11,
      "speed": 9
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #37 六尾
  "vulpix": {
    "id": 37,
    "name": "六尾",
    "nameEn": "Vulpix",
    "type": ["火"],
    "baseStats": {
      "hp": 38,
      "attack": 41,
      "defense": 40,
      "speed": 65
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 7,
      "defense": 6,
      "speed": 10
    },
    "evolutions": [
      { "level": 35, "evolveInto": "ninetales" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "ember" },
      { "level": 20, "move": "flamethrower" }
    ]
  },

  // #38 九尾
  "ninetales": {
    "id": 38,
    "name": "九尾",
    "nameEn": "Ninetales",
    "type": ["火"],
    "baseStats": {
      "hp": 73,
      "attack": 76,
      "defense": 75,
      "speed": 100
    },
    "statsGrowth": {
      "hp": 11,
      "attack": 12,
      "defense": 12,
      "speed": 15
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "ember" },
      { "level": 20, "move": "flamethrower" }
    ]
  },

  // #39 胖丁
  "jigglypuff": {
    "id": 39,
    "name": "胖丁",
    "nameEn": "Jigglypuff",
    "type": ["普通", "妖精"],
    "baseStats": {
      "hp": 115,
      "attack": 45,
      "defense": 20,
      "speed": 20
    },
    "statsGrowth": {
      "hp": 18,
      "attack": 7,
      "defense": 3,
      "speed": 3
    },
    "evolutions": [
      { "level": 30, "evolveInto": "wigglytuff" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #40 胖可丁
  "wigglytuff": {
    "id": 40,
    "name": "胖可丁",
    "nameEn": "Wigglytuff",
    "type": ["普通", "妖精"],
    "baseStats": {
      "hp": 140,
      "attack": 70,
      "defense": 45,
      "speed": 45
    },
    "statsGrowth": {
      "hp": 21,
      "attack": 11,
      "defense": 7,
      "speed": 7
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #41 超音蝠
  "zubat": {
    "id": 41,
    "name": "超音蝠",
    "nameEn": "Zubat",
    "type": ["毒", "飞行"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 35,
      "speed": 55
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 7,
      "defense": 6,
      "speed": 9
    },
    "evolutions": [
      { "level": 22, "evolveInto": "golbat" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "peck" }
    ]
  },

  // #42 大嘴蝠
  "golbat": {
    "id": 42,
    "name": "大嘴蝠",
    "nameEn": "Golbat",
    "type": ["毒", "飞行"],
    "baseStats": {
      "hp": 75,
      "attack": 80,
      "defense": 70,
      "speed": 90
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 12,
      "defense": 11,
      "speed": 14
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "peck" }
    ]
  },

  // #43 走路草
  "oddish": {
    "id": 43,
    "name": "走路草",
    "nameEn": "Oddish",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 45,
      "attack": 50,
      "defense": 55,
      "speed": 30
    },
    "statsGrowth": {
      "hp": 7,
      "attack": 8,
      "defense": 9,
      "speed": 5
    },
    "evolutions": [
      { "level": 21, "evolveInto": "gloom" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "vineWhip" },
      { "level": 20, "move": "razorLeaf" }
    ]
  },

  // #44 臭臭花
  "gloom": {
    "id": 44,
    "name": "臭臭花",
    "nameEn": "Gloom",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 60,
      "attack": 65,
      "defense": 70,
      "speed": 40
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 10,
      "defense": 11,
      "speed": 6
    },
    "evolutions": [
      { "level": 36, "evolveInto": "vileplume" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "vineWhip" },
      { "level": 20, "move": "razorLeaf" }
    ]
  },

  // #45 霸王花
  "vileplume": {
    "id": 45,
    "name": "霸王花",
    "nameEn": "Vileplume",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 75,
      "attack": 80,
      "defense": 85,
      "speed": 50
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 12,
      "defense": 13,
      "speed": 8
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "vineWhip" },
      { "level": 20, "move": "razorLeaf" }
    ]
  },

  // #46 派拉斯
  "paras": {
    "id": 46,
    "name": "派拉斯",
    "nameEn": "Paras",
    "type": ["虫", "草"],
    "baseStats": {
      "hp": 35,
      "attack": 70,
      "defense": 55,
      "speed": 25
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 11,
      "defense": 9,
      "speed": 4
    },
    "evolutions": [
      { "level": 24, "evolveInto": "parasect" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "vineWhip" },
      { "level": 20, "move": "razorLeaf" }
    ]
  },

  // #47 派拉斯特
  "parasect": {
    "id": 47,
    "name": "派拉斯特",
    "nameEn": "Parasect",
    "type": ["虫", "草"],
    "baseStats": {
      "hp": 60,
      "attack": 95,
      "defense": 80,
      "speed": 30
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 15,
      "defense": 12,
      "speed": 5
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "vineWhip" },
      { "level": 20, "move": "razorLeaf" }
    ]
  },

  // #48 毛球
  "venonat": {
    "id": 48,
    "name": "毛球",
    "nameEn": "Venonat",
    "type": ["虫", "毒"],
    "baseStats": {
      "hp": 60,
      "attack": 55,
      "defense": 50,
      "speed": 45
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 9,
      "defense": 8,
      "speed": 7
    },
    "evolutions": [
      { "level": 31, "evolveInto": "venomoth" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "bugBite" }
    ]
  },

  // #49 摩鲁蛾
  "venomoth": {
    "id": 49,
    "name": "摩鲁蛾",
    "nameEn": "Venomoth",
    "type": ["虫", "毒"],
    "baseStats": {
      "hp": 70,
      "attack": 65,
      "defense": 60,
      "speed": 90
    },
    "statsGrowth": {
      "hp": 11,
      "attack": 10,
      "defense": 9,
      "speed": 14
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "bugBite" }
    ]
  },

  // #50 地鼠
  "diglett": {
    "id": 50,
    "name": "地鼠",
    "nameEn": "Diglett",
    "type": ["地面"],
    "baseStats": {
      "hp": 10,
      "attack": 55,
      "defense": 25,
      "speed": 95
    },
    "statsGrowth": {
      "hp": 2,
      "attack": 9,
      "defense": 4,
      "speed": 15
    },
    "evolutions": [
      { "level": 26, "evolveInto": "dugtrio" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #51 三地鼠
  "dugtrio": {
    "id": 51,
    "name": "三地鼠",
    "nameEn": "Dugtrio",
    "type": ["地面"],
    "baseStats": {
      "hp": 35,
      "attack": 100,
      "defense": 50,
      "speed": 120
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 15,
      "defense": 8,
      "speed": 18
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #52 喵喵
  "meowth": {
    "id": 52,
    "name": "喵喵",
    "nameEn": "Meowth",
    "type": ["普通"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 35,
      "speed": 90
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 7,
      "defense": 6,
      "speed": 14
    },
    "evolutions": [
      { "level": 28, "evolveInto": "persian" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #53 猫老大
  "persian": {
    "id": 53,
    "name": "猫老大",
    "nameEn": "Persian",
    "type": ["普通"],
    "baseStats": {
      "hp": 65,
      "attack": 70,
      "defense": 60,
      "speed": 115
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 11,
      "defense": 9,
      "speed": 18
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #54 可达鸭
  "psyduck": {
    "id": 54,
    "name": "可达鸭",
    "nameEn": "Psyduck",
    "type": ["水"],
    "baseStats": {
      "hp": 50,
      "attack": 52,
      "defense": 48,
      "speed": 55
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 8,
      "defense": 8,
      "speed": 9
    },
    "evolutions": [
      { "level": 33, "evolveInto": "golduck" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #55 哥达鸭
  "golduck": {
    "id": 55,
    "name": "哥达鸭",
    "nameEn": "Golduck",
    "type": ["水"],
    "baseStats": {
      "hp": 80,
      "attack": 82,
      "defense": 78,
      "speed": 85
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 13,
      "defense": 12,
      "speed": 13
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #56 猴怪
  "mankey": {
    "id": 56,
    "name": "猴怪",
    "nameEn": "Mankey",
    "type": ["格斗"],
    "baseStats": {
      "hp": 40,
      "attack": 80,
      "defense": 35,
      "speed": 70
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 12,
      "defense": 6,
      "speed": 11
    },
    "evolutions": [
      { "level": 28, "evolveInto": "primeape" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #57 火爆猴
  "primeape": {
    "id": 57,
    "name": "火爆猴",
    "nameEn": "Primeape",
    "type": ["格斗"],
    "baseStats": {
      "hp": 65,
      "attack": 105,
      "defense": 60,
      "speed": 95
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 16,
      "defense": 9,
      "speed": 15
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #58 卡蒂狗
  "growlithe": {
    "id": 58,
    "name": "卡蒂狗",
    "nameEn": "Growlithe",
    "type": ["火"],
    "baseStats": {
      "hp": 55,
      "attack": 70,
      "defense": 45,
      "speed": 60
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 11,
      "defense": 7,
      "speed": 9
    },
    "evolutions": [
      { "level": 35, "evolveInto": "arcanine" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "ember" },
      { "level": 20, "move": "flamethrower" }
    ]
  },

  // #59 风速狗
  "arcanine": {
    "id": 59,
    "name": "风速狗",
    "nameEn": "Arcanine",
    "type": ["火"],
    "baseStats": {
      "hp": 90,
      "attack": 110,
      "defense": 80,
      "speed": 95
    },
    "statsGrowth": {
      "hp": 14,
      "attack": 17,
      "defense": 12,
      "speed": 15
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "ember" },
      { "level": 20, "move": "flamethrower" }
    ]
  },

  // #60 蚊香蝌蚪
  "poliwag": {
    "id": 60,
    "name": "蚊香蝌蚪",
    "nameEn": "Poliwag",
    "type": ["水"],
    "baseStats": {
      "hp": 40,
      "attack": 50,
      "defense": 40,
      "speed": 90
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 8,
      "defense": 6,
      "speed": 14
    },
    "evolutions": [
      { "level": 25, "evolveInto": "poliwhirl" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #61 蚊香君
  "poliwhirl": {
    "id": 61,
    "name": "蚊香君",
    "nameEn": "Poliwhirl",
    "type": ["水"],
    "baseStats": {
      "hp": 65,
      "attack": 65,
      "defense": 65,
      "speed": 90
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 10,
      "defense": 10,
      "speed": 14
    },
    "evolutions": [
      { "level": 40, "evolveInto": "poliwrath" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #62 蚊香泳士
  "poliwrath": {
    "id": 62,
    "name": "蚊香泳士",
    "nameEn": "Poliwrath",
    "type": ["水", "格斗"],
    "baseStats": {
      "hp": 90,
      "attack": 95,
      "defense": 95,
      "speed": 70
    },
    "statsGrowth": {
      "hp": 14,
      "attack": 15,
      "defense": 15,
      "speed": 11
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #63 凯西
  "abra": {
    "id": 63,
    "name": "凯西",
    "nameEn": "Abra",
    "type": ["超能力"],
    "baseStats": {
      "hp": 25,
      "attack": 20,
      "defense": 15,
      "speed": 90
    },
    "statsGrowth": {
      "hp": 4,
      "attack": 3,
      "defense": 3,
      "speed": 14
    },
    "evolutions": [
      { "level": 16, "evolveInto": "kadabra" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #64 勇基拉
  "kadabra": {
    "id": 64,
    "name": "勇基拉",
    "nameEn": "Kadabra",
    "type": ["超能力"],
    "baseStats": {
      "hp": 40,
      "attack": 35,
      "defense": 30,
      "speed": 105
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 6,
      "defense": 5,
      "speed": 16
    },
    "evolutions": [
      { "level": 40, "evolveInto": "alakazam" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #65 胡地
  "alakazam": {
    "id": 65,
    "name": "胡地",
    "nameEn": "Alakazam",
    "type": ["超能力"],
    "baseStats": {
      "hp": 55,
      "attack": 50,
      "defense": 45,
      "speed": 120
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 8,
      "defense": 7,
      "speed": 18
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #66 腕力
  "machop": {
    "id": 66,
    "name": "腕力",
    "nameEn": "Machop",
    "type": ["格斗"],
    "baseStats": {
      "hp": 70,
      "attack": 80,
      "defense": 50,
      "speed": 35
    },
    "statsGrowth": {
      "hp": 11,
      "attack": 12,
      "defense": 8,
      "speed": 6
    },
    "evolutions": [
      { "level": 28, "evolveInto": "machoke" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #67 豪力
  "machoke": {
    "id": 67,
    "name": "豪力",
    "nameEn": "Machoke",
    "type": ["格斗"],
    "baseStats": {
      "hp": 80,
      "attack": 100,
      "defense": 70,
      "speed": 45
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 15,
      "defense": 11,
      "speed": 7
    },
    "evolutions": [
      { "level": 40, "evolveInto": "machamp" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #68 怪力
  "machamp": {
    "id": 68,
    "name": "怪力",
    "nameEn": "Machamp",
    "type": ["格斗"],
    "baseStats": {
      "hp": 90,
      "attack": 130,
      "defense": 80,
      "speed": 55
    },
    "statsGrowth": {
      "hp": 14,
      "attack": 20,
      "defense": 12,
      "speed": 9
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #69 喇叭芽
  "bellsprout": {
    "id": 69,
    "name": "喇叭芽",
    "nameEn": "Bellsprout",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 50,
      "attack": 75,
      "defense": 35,
      "speed": 40
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 12,
      "defense": 6,
      "speed": 6
    },
    "evolutions": [
      { "level": 21, "evolveInto": "weepinbell" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "vineWhip" },
      { "level": 20, "move": "razorLeaf" }
    ]
  },

  // #70 口呆花
  "weepinbell": {
    "id": 70,
    "name": "口呆花",
    "nameEn": "Weepinbell",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 65,
      "attack": 90,
      "defense": 50,
      "speed": 55
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 14,
      "defense": 8,
      "speed": 9
    },
    "evolutions": [
      { "level": 36, "evolveInto": "victreebel" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "vineWhip" },
      { "level": 20, "move": "razorLeaf" }
    ]
  },

  // #71 大食花
  "victreebel": {
    "id": 71,
    "name": "大食花",
    "nameEn": "Victreebel",
    "type": ["草", "毒"],
    "baseStats": {
      "hp": 80,
      "attack": 105,
      "defense": 65,
      "speed": 70
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 16,
      "defense": 10,
      "speed": 11
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "vineWhip" },
      { "level": 20, "move": "razorLeaf" }
    ]
  },

  // #72 玛瑙水母
  "tentacool": {
    "id": 72,
    "name": "玛瑙水母",
    "nameEn": "Tentacool",
    "type": ["水", "毒"],
    "baseStats": {
      "hp": 40,
      "attack": 40,
      "defense": 35,
      "speed": 70
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 6,
      "defense": 6,
      "speed": 11
    },
    "evolutions": [
      { "level": 30, "evolveInto": "tentacruel" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #73 毒刺水母
  "tentacruel": {
    "id": 73,
    "name": "毒刺水母",
    "nameEn": "Tentacruel",
    "type": ["水", "毒"],
    "baseStats": {
      "hp": 80,
      "attack": 70,
      "defense": 65,
      "speed": 100
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 11,
      "defense": 10,
      "speed": 15
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #74 小拳石
  "geodude": {
    "id": 74,
    "name": "小拳石",
    "nameEn": "Geodude",
    "type": ["岩石", "地面"],
    "baseStats": {
      "hp": 40,
      "attack": 80,
      "defense": 100,
      "speed": 20
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 12,
      "defense": 15,
      "speed": 3
    },
    "evolutions": [
      { "level": 25, "evolveInto": "graveler" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #75 隆隆石
  "graveler": {
    "id": 75,
    "name": "隆隆石",
    "nameEn": "Graveler",
    "type": ["岩石", "地面"],
    "baseStats": {
      "hp": 55,
      "attack": 95,
      "defense": 115,
      "speed": 35
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 15,
      "defense": 18,
      "speed": 6
    },
    "evolutions": [
      { "level": 40, "evolveInto": "golem" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #76 隆隆岩
  "golem": {
    "id": 76,
    "name": "隆隆岩",
    "nameEn": "Golem",
    "type": ["岩石", "地面"],
    "baseStats": {
      "hp": 80,
      "attack": 120,
      "defense": 130,
      "speed": 45
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 18,
      "defense": 20,
      "speed": 7
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #77 小火马
  "ponyta": {
    "id": 77,
    "name": "小火马",
    "nameEn": "Ponyta",
    "type": ["火"],
    "baseStats": {
      "hp": 50,
      "attack": 85,
      "defense": 55,
      "speed": 90
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 13,
      "defense": 9,
      "speed": 14
    },
    "evolutions": [
      { "level": 40, "evolveInto": "rapidash" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "ember" },
      { "level": 20, "move": "flamethrower" }
    ]
  },

  // #78 烈焰马
  "rapidash": {
    "id": 78,
    "name": "烈焰马",
    "nameEn": "Rapidash",
    "type": ["火"],
    "baseStats": {
      "hp": 65,
      "attack": 100,
      "defense": 70,
      "speed": 105
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 15,
      "defense": 11,
      "speed": 16
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "ember" },
      { "level": 20, "move": "flamethrower" }
    ]
  },

  // #79 呆呆兽
  "slowpoke": {
    "id": 79,
    "name": "呆呆兽",
    "nameEn": "Slowpoke",
    "type": ["水", "超能力"],
    "baseStats": {
      "hp": 90,
      "attack": 65,
      "defense": 65,
      "speed": 15
    },
    "statsGrowth": {
      "hp": 14,
      "attack": 10,
      "defense": 10,
      "speed": 3
    },
    "evolutions": [
      { "level": 37, "evolveInto": "slowbro" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #80 呆壳兽
  "slowbro": {
    "id": 80,
    "name": "呆壳兽",
    "nameEn": "Slowbro",
    "type": ["水", "超能力"],
    "baseStats": {
      "hp": 95,
      "attack": 75,
      "defense": 110,
      "speed": 30
    },
    "statsGrowth": {
      "hp": 15,
      "attack": 12,
      "defense": 17,
      "speed": 5
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #81 小磁怪
  "magnemite": {
    "id": 81,
    "name": "小磁怪",
    "nameEn": "Magnemite",
    "type": ["电", "钢"],
    "baseStats": {
      "hp": 25,
      "attack": 35,
      "defense": 70,
      "speed": 45
    },
    "statsGrowth": {
      "hp": 4,
      "attack": 6,
      "defense": 11,
      "speed": 7
    },
    "evolutions": [
      { "level": 30, "evolveInto": "magneton" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "thunderShock" },
      { "level": 20, "move": "thunderbolt" }
    ]
  },

  // #82 三合一磁怪
  "magneton": {
    "id": 82,
    "name": "三合一磁怪",
    "nameEn": "Magneton",
    "type": ["电", "钢"],
    "baseStats": {
      "hp": 50,
      "attack": 60,
      "defense": 95,
      "speed": 70
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 9,
      "defense": 15,
      "speed": 11
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "thunderShock" },
      { "level": 20, "move": "thunderbolt" }
    ]
  },

  // #83 大葱鸭
  "farfetchd": {
    "id": 83,
    "name": "大葱鸭",
    "nameEn": "Farfetchd",
    "type": ["普通", "飞行"],
    "baseStats": {
      "hp": 52,
      "attack": 90,
      "defense": 55,
      "speed": 60
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 14,
      "defense": 9,
      "speed": 9
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "peck" }
    ]
  },

  // #84 嘟嘟
  "doduo": {
    "id": 84,
    "name": "嘟嘟",
    "nameEn": "Doduo",
    "type": ["普通", "飞行"],
    "baseStats": {
      "hp": 35,
      "attack": 85,
      "defense": 45,
      "speed": 75
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 13,
      "defense": 7,
      "speed": 12
    },
    "evolutions": [
      { "level": 31, "evolveInto": "dodrio" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "peck" }
    ]
  },

  // #85 嘟嘟利
  "dodrio": {
    "id": 85,
    "name": "嘟嘟利",
    "nameEn": "Dodrio",
    "type": ["普通", "飞行"],
    "baseStats": {
      "hp": 60,
      "attack": 110,
      "defense": 70,
      "speed": 110
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 17,
      "defense": 11,
      "speed": 17
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "peck" }
    ]
  },

  // #86 小海狮
  "seel": {
    "id": 86,
    "name": "小海狮",
    "nameEn": "Seel",
    "type": ["水"],
    "baseStats": {
      "hp": 65,
      "attack": 45,
      "defense": 55,
      "speed": 45
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 7,
      "defense": 9,
      "speed": 7
    },
    "evolutions": [
      { "level": 34, "evolveInto": "dewgong" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #87 白海狮
  "dewgong": {
    "id": 87,
    "name": "白海狮",
    "nameEn": "Dewgong",
    "type": ["水", "冰"],
    "baseStats": {
      "hp": 90,
      "attack": 70,
      "defense": 80,
      "speed": 70
    },
    "statsGrowth": {
      "hp": 14,
      "attack": 11,
      "defense": 12,
      "speed": 11
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #88 臭泥
  "grimer": {
    "id": 88,
    "name": "臭泥",
    "nameEn": "Grimer",
    "type": ["毒"],
    "baseStats": {
      "hp": 80,
      "attack": 80,
      "defense": 50,
      "speed": 25
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 12,
      "defense": 8,
      "speed": 4
    },
    "evolutions": [
      { "level": 38, "evolveInto": "muk" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "poisonPowder" }
    ]
  },

  // #89 臭臭泥
  "muk": {
    "id": 89,
    "name": "臭臭泥",
    "nameEn": "Muk",
    "type": ["毒"],
    "baseStats": {
      "hp": 105,
      "attack": 105,
      "defense": 75,
      "speed": 50
    },
    "statsGrowth": {
      "hp": 16,
      "attack": 16,
      "defense": 12,
      "speed": 8
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "poisonPowder" }
    ]
  },

  // #90 大舌贝
  "shellder": {
    "id": 90,
    "name": "大舌贝",
    "nameEn": "Shellder",
    "type": ["水"],
    "baseStats": {
      "hp": 30,
      "attack": 65,
      "defense": 100,
      "speed": 40
    },
    "statsGrowth": {
      "hp": 5,
      "attack": 10,
      "defense": 15,
      "speed": 6
    },
    "evolutions": [
      { "level": 35, "evolveInto": "cloyster" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #91 刺甲贝
  "cloyster": {
    "id": 91,
    "name": "刺甲贝",
    "nameEn": "Cloyster",
    "type": ["水", "冰"],
    "baseStats": {
      "hp": 50,
      "attack": 95,
      "defense": 180,
      "speed": 70
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 15,
      "defense": 27,
      "speed": 11
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #92 鬼斯
  "gastly": {
    "id": 92,
    "name": "鬼斯",
    "nameEn": "Gastly",
    "type": ["幽灵", "毒"],
    "baseStats": {
      "hp": 30,
      "attack": 35,
      "defense": 30,
      "speed": 80
    },
    "statsGrowth": {
      "hp": 5,
      "attack": 6,
      "defense": 5,
      "speed": 12
    },
    "evolutions": [
      { "level": 25, "evolveInto": "haunter" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "poisonPowder" }
    ]
  },

  // #93 鬼斯通
  "haunter": {
    "id": 93,
    "name": "鬼斯通",
    "nameEn": "Haunter",
    "type": ["幽灵", "毒"],
    "baseStats": {
      "hp": 45,
      "attack": 50,
      "defense": 45,
      "speed": 95
    },
    "statsGrowth": {
      "hp": 7,
      "attack": 8,
      "defense": 7,
      "speed": 15
    },
    "evolutions": [
      { "level": 40, "evolveInto": "gengar" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "poisonPowder" }
    ]
  },

  // #94 耿鬼
  "gengar": {
    "id": 94,
    "name": "耿鬼",
    "nameEn": "Gengar",
    "type": ["幽灵", "毒"],
    "baseStats": {
      "hp": 60,
      "attack": 65,
      "defense": 60,
      "speed": 110
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 10,
      "defense": 9,
      "speed": 17
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "poisonPowder" }
    ]
  },

  // #95 大岩蛇
  "onix": {
    "id": 95,
    "name": "大岩蛇",
    "nameEn": "Onix",
    "type": ["岩石", "地面"],
    "baseStats": {
      "hp": 35,
      "attack": 45,
      "defense": 160,
      "speed": 70
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 7,
      "defense": 24,
      "speed": 11
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #96 催眠貘
  "drowzee": {
    "id": 96,
    "name": "催眠貘",
    "nameEn": "Drowzee",
    "type": ["超能力"],
    "baseStats": {
      "hp": 60,
      "attack": 48,
      "defense": 45,
      "speed": 42
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 8,
      "defense": 7,
      "speed": 7
    },
    "evolutions": [
      { "level": 26, "evolveInto": "hypno" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #97 引梦貘人
  "hypno": {
    "id": 97,
    "name": "引梦貘人",
    "nameEn": "Hypno",
    "type": ["超能力"],
    "baseStats": {
      "hp": 85,
      "attack": 73,
      "defense": 70,
      "speed": 67
    },
    "statsGrowth": {
      "hp": 13,
      "attack": 11,
      "defense": 11,
      "speed": 11
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #98 大钳蟹
  "krabby": {
    "id": 98,
    "name": "大钳蟹",
    "nameEn": "Krabby",
    "type": ["水"],
    "baseStats": {
      "hp": 30,
      "attack": 105,
      "defense": 90,
      "speed": 50
    },
    "statsGrowth": {
      "hp": 5,
      "attack": 16,
      "defense": 14,
      "speed": 8
    },
    "evolutions": [
      { "level": 28, "evolveInto": "kingler" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #99 巨钳蟹
  "kingler": {
    "id": 99,
    "name": "巨钳蟹",
    "nameEn": "Kingler",
    "type": ["水"],
    "baseStats": {
      "hp": 55,
      "attack": 130,
      "defense": 115,
      "speed": 75
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 20,
      "defense": 18,
      "speed": 12
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #100 霹雳电球
  "voltorb": {
    "id": 100,
    "name": "霹雳电球",
    "nameEn": "Voltorb",
    "type": ["电"],
    "baseStats": {
      "hp": 40,
      "attack": 30,
      "defense": 50,
      "speed": 100
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 5,
      "defense": 8,
      "speed": 15
    },
    "evolutions": [
      { "level": 30, "evolveInto": "electrode" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "thunderShock" },
      { "level": 20, "move": "thunderbolt" }
    ]
  },

  // #101 顽皮雷弹
  "electrode": {
    "id": 101,
    "name": "顽皮雷弹",
    "nameEn": "Electrode",
    "type": ["电"],
    "baseStats": {
      "hp": 60,
      "attack": 50,
      "defense": 70,
      "speed": 150
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 8,
      "defense": 11,
      "speed": 23
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "thunderShock" },
      { "level": 20, "move": "thunderbolt" }
    ]
  },

  // #102 蛋蛋
  "exeggcute": {
    "id": 102,
    "name": "蛋蛋",
    "nameEn": "Exeggcute",
    "type": ["草", "超能力"],
    "baseStats": {
      "hp": 60,
      "attack": 40,
      "defense": 80,
      "speed": 40
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 6,
      "defense": 12,
      "speed": 6
    },
    "evolutions": [
      { "level": 35, "evolveInto": "exeggutor" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "vineWhip" },
      { "level": 20, "move": "razorLeaf" }
    ]
  },

  // #103 椰蛋树
  "exeggutor": {
    "id": 103,
    "name": "椰蛋树",
    "nameEn": "Exeggutor",
    "type": ["草", "超能力"],
    "baseStats": {
      "hp": 95,
      "attack": 95,
      "defense": 85,
      "speed": 55
    },
    "statsGrowth": {
      "hp": 15,
      "attack": 15,
      "defense": 13,
      "speed": 9
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "vineWhip" },
      { "level": 20, "move": "razorLeaf" }
    ]
  },

  // #104 卡拉卡拉
  "cubone": {
    "id": 104,
    "name": "卡拉卡拉",
    "nameEn": "Cubone",
    "type": ["地面"],
    "baseStats": {
      "hp": 50,
      "attack": 50,
      "defense": 95,
      "speed": 35
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 8,
      "defense": 15,
      "speed": 6
    },
    "evolutions": [
      { "level": 28, "evolveInto": "marowak" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #105 嘎拉嘎拉
  "marowak": {
    "id": 105,
    "name": "嘎拉嘎拉",
    "nameEn": "Marowak",
    "type": ["地面"],
    "baseStats": {
      "hp": 60,
      "attack": 80,
      "defense": 110,
      "speed": 45
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 12,
      "defense": 17,
      "speed": 7
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #106 飞腿郎
  "hitmonlee": {
    "id": 106,
    "name": "飞腿郎",
    "nameEn": "Hitmonlee",
    "type": ["格斗"],
    "baseStats": {
      "hp": 50,
      "attack": 120,
      "defense": 53,
      "speed": 87
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 18,
      "defense": 8,
      "speed": 14
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #107 快拳郎
  "hitmonchan": {
    "id": 107,
    "name": "快拳郎",
    "nameEn": "Hitmonchan",
    "type": ["格斗"],
    "baseStats": {
      "hp": 50,
      "attack": 105,
      "defense": 79,
      "speed": 76
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 16,
      "defense": 12,
      "speed": 12
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #108 大舌头
  "lickitung": {
    "id": 108,
    "name": "大舌头",
    "nameEn": "Lickitung",
    "type": ["普通"],
    "baseStats": {
      "hp": 90,
      "attack": 55,
      "defense": 75,
      "speed": 30
    },
    "statsGrowth": {
      "hp": 14,
      "attack": 9,
      "defense": 12,
      "speed": 5
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #109 瓦斯弹
  "koffing": {
    "id": 109,
    "name": "瓦斯弹",
    "nameEn": "Koffing",
    "type": ["毒"],
    "baseStats": {
      "hp": 40,
      "attack": 65,
      "defense": 95,
      "speed": 35
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 10,
      "defense": 15,
      "speed": 6
    },
    "evolutions": [
      { "level": 35, "evolveInto": "weezing" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "poisonPowder" }
    ]
  },

  // #110 双弹瓦斯
  "weezing": {
    "id": 110,
    "name": "双弹瓦斯",
    "nameEn": "Weezing",
    "type": ["毒"],
    "baseStats": {
      "hp": 65,
      "attack": 90,
      "defense": 120,
      "speed": 60
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 14,
      "defense": 18,
      "speed": 9
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "poisonPowder" }
    ]
  },

  // #111 独角犀牛
  "rhyhorn": {
    "id": 111,
    "name": "独角犀牛",
    "nameEn": "Rhyhorn",
    "type": ["地面", "岩石"],
    "baseStats": {
      "hp": 80,
      "attack": 85,
      "defense": 95,
      "speed": 25
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 13,
      "defense": 15,
      "speed": 4
    },
    "evolutions": [
      { "level": 42, "evolveInto": "rhydon" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #112 钻角犀兽
  "rhydon": {
    "id": 112,
    "name": "钻角犀兽",
    "nameEn": "Rhydon",
    "type": ["地面", "岩石"],
    "baseStats": {
      "hp": 105,
      "attack": 130,
      "defense": 120,
      "speed": 40
    },
    "statsGrowth": {
      "hp": 16,
      "attack": 20,
      "defense": 18,
      "speed": 6
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #113 吉利蛋
  "chansey": {
    "id": 113,
    "name": "吉利蛋",
    "nameEn": "Chansey",
    "type": ["普通"],
    "baseStats": {
      "hp": 250,
      "attack": 5,
      "defense": 5,
      "speed": 50
    },
    "statsGrowth": {
      "hp": 38,
      "attack": 1,
      "defense": 1,
      "speed": 8
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #114 蔓藤怪
  "tangela": {
    "id": 114,
    "name": "蔓藤怪",
    "nameEn": "Tangela",
    "type": ["草"],
    "baseStats": {
      "hp": 65,
      "attack": 55,
      "defense": 115,
      "speed": 60
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 9,
      "defense": 18,
      "speed": 9
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "vineWhip" },
      { "level": 20, "move": "razorLeaf" }
    ]
  },

  // #115 袋兽
  "kangaskhan": {
    "id": 115,
    "name": "袋兽",
    "nameEn": "Kangaskhan",
    "type": ["普通"],
    "baseStats": {
      "hp": 105,
      "attack": 95,
      "defense": 80,
      "speed": 90
    },
    "statsGrowth": {
      "hp": 16,
      "attack": 15,
      "defense": 12,
      "speed": 14
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #116 墨海马
  "horsea": {
    "id": 116,
    "name": "墨海马",
    "nameEn": "Horsea",
    "type": ["水"],
    "baseStats": {
      "hp": 30,
      "attack": 40,
      "defense": 70,
      "speed": 60
    },
    "statsGrowth": {
      "hp": 5,
      "attack": 6,
      "defense": 11,
      "speed": 9
    },
    "evolutions": [
      { "level": 32, "evolveInto": "seadra" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #117 海刺龙
  "seadra": {
    "id": 117,
    "name": "海刺龙",
    "nameEn": "Seadra",
    "type": ["水"],
    "baseStats": {
      "hp": 55,
      "attack": 65,
      "defense": 95,
      "speed": 85
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 10,
      "defense": 15,
      "speed": 13
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #118 角金鱼
  "goldeen": {
    "id": 118,
    "name": "角金鱼",
    "nameEn": "Goldeen",
    "type": ["水"],
    "baseStats": {
      "hp": 45,
      "attack": 67,
      "defense": 60,
      "speed": 63
    },
    "statsGrowth": {
      "hp": 7,
      "attack": 11,
      "defense": 9,
      "speed": 10
    },
    "evolutions": [
      { "level": 33, "evolveInto": "seaking" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #119 金鱼王
  "seaking": {
    "id": 119,
    "name": "金鱼王",
    "nameEn": "Seaking",
    "type": ["水"],
    "baseStats": {
      "hp": 80,
      "attack": 92,
      "defense": 65,
      "speed": 68
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 14,
      "defense": 10,
      "speed": 11
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #120 海星星
  "staryu": {
    "id": 120,
    "name": "海星星",
    "nameEn": "Staryu",
    "type": ["水"],
    "baseStats": {
      "hp": 30,
      "attack": 45,
      "defense": 55,
      "speed": 85
    },
    "statsGrowth": {
      "hp": 5,
      "attack": 7,
      "defense": 9,
      "speed": 13
    },
    "evolutions": [
      { "level": 35, "evolveInto": "starmie" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #121 宝石海星
  "starmie": {
    "id": 121,
    "name": "宝石海星",
    "nameEn": "Starmie",
    "type": ["水", "超能力"],
    "baseStats": {
      "hp": 60,
      "attack": 75,
      "defense": 85,
      "speed": 115
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 12,
      "defense": 13,
      "speed": 18
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #122 魔墙人偶
  "mr-mime": {
    "id": 122,
    "name": "魔墙人偶",
    "nameEn": "Mr mime",
    "type": ["超能力", "妖精"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 65,
      "speed": 90
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 7,
      "defense": 10,
      "speed": 14
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #123 飞天螳螂
  "scyther": {
    "id": 123,
    "name": "飞天螳螂",
    "nameEn": "Scyther",
    "type": ["虫", "飞行"],
    "baseStats": {
      "hp": 70,
      "attack": 110,
      "defense": 80,
      "speed": 105
    },
    "statsGrowth": {
      "hp": 11,
      "attack": 17,
      "defense": 12,
      "speed": 16
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "bugBite" }
    ]
  },

  // #124 迷唇姐
  "jynx": {
    "id": 124,
    "name": "迷唇姐",
    "nameEn": "Jynx",
    "type": ["冰", "超能力"],
    "baseStats": {
      "hp": 65,
      "attack": 50,
      "defense": 35,
      "speed": 95
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 8,
      "defense": 6,
      "speed": 15
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #125 电击兽
  "electabuzz": {
    "id": 125,
    "name": "电击兽",
    "nameEn": "Electabuzz",
    "type": ["电"],
    "baseStats": {
      "hp": 65,
      "attack": 83,
      "defense": 57,
      "speed": 105
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 13,
      "defense": 9,
      "speed": 16
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "thunderShock" },
      { "level": 20, "move": "thunderbolt" }
    ]
  },

  // #126 鸭嘴火兽
  "magmar": {
    "id": 126,
    "name": "鸭嘴火兽",
    "nameEn": "Magmar",
    "type": ["火"],
    "baseStats": {
      "hp": 65,
      "attack": 95,
      "defense": 57,
      "speed": 93
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 15,
      "defense": 9,
      "speed": 14
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "ember" },
      { "level": 20, "move": "flamethrower" }
    ]
  },

  // #127 凯罗斯
  "pinsir": {
    "id": 127,
    "name": "凯罗斯",
    "nameEn": "Pinsir",
    "type": ["虫"],
    "baseStats": {
      "hp": 65,
      "attack": 125,
      "defense": 100,
      "speed": 85
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 19,
      "defense": 15,
      "speed": 13
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "bugBite" }
    ]
  },

  // #128 肯泰罗
  "tauros": {
    "id": 128,
    "name": "肯泰罗",
    "nameEn": "Tauros",
    "type": ["普通"],
    "baseStats": {
      "hp": 75,
      "attack": 100,
      "defense": 95,
      "speed": 110
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 15,
      "defense": 15,
      "speed": 17
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #129 鲤鱼王
  "magikarp": {
    "id": 129,
    "name": "鲤鱼王",
    "nameEn": "Magikarp",
    "type": ["水"],
    "baseStats": {
      "hp": 20,
      "attack": 10,
      "defense": 55,
      "speed": 80
    },
    "statsGrowth": {
      "hp": 3,
      "attack": 2,
      "defense": 9,
      "speed": 12
    },
    "evolutions": [
      { "level": 20, "evolveInto": "gyarados" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #130 暴鲤龙
  "gyarados": {
    "id": 130,
    "name": "暴鲤龙",
    "nameEn": "Gyarados",
    "type": ["水", "飞行"],
    "baseStats": {
      "hp": 95,
      "attack": 125,
      "defense": 79,
      "speed": 81
    },
    "statsGrowth": {
      "hp": 15,
      "attack": 19,
      "defense": 12,
      "speed": 13
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #131 拉普拉斯
  "lapras": {
    "id": 131,
    "name": "拉普拉斯",
    "nameEn": "Lapras",
    "type": ["水", "冰"],
    "baseStats": {
      "hp": 130,
      "attack": 85,
      "defense": 80,
      "speed": 60
    },
    "statsGrowth": {
      "hp": 20,
      "attack": 13,
      "defense": 12,
      "speed": 9
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #132 百变怪
  "ditto": {
    "id": 132,
    "name": "百变怪",
    "nameEn": "Ditto",
    "type": ["普通"],
    "baseStats": {
      "hp": 48,
      "attack": 48,
      "defense": 48,
      "speed": 48
    },
    "statsGrowth": {
      "hp": 8,
      "attack": 8,
      "defense": 8,
      "speed": 8
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #133 伊布
  "eevee": {
    "id": 133,
    "name": "伊布",
    "nameEn": "Eevee",
    "type": ["普通"],
    "baseStats": {
      "hp": 55,
      "attack": 55,
      "defense": 50,
      "speed": 55
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 9,
      "defense": 8,
      "speed": 9
    },
    "evolutions": [
      { "level": 30, "evolveInto": "vaporeon" },
      { "level": 30, "evolveInto": "jolteon" },
      { "level": 30, "evolveInto": "flareon" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #134 水伊布
  "vaporeon": {
    "id": 134,
    "name": "水伊布",
    "nameEn": "Vaporeon",
    "type": ["水"],
    "baseStats": {
      "hp": 130,
      "attack": 65,
      "defense": 60,
      "speed": 65
    },
    "statsGrowth": {
      "hp": 20,
      "attack": 10,
      "defense": 9,
      "speed": 10
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #135 雷伊布
  "jolteon": {
    "id": 135,
    "name": "雷伊布",
    "nameEn": "Jolteon",
    "type": ["电"],
    "baseStats": {
      "hp": 65,
      "attack": 65,
      "defense": 60,
      "speed": 130
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 10,
      "defense": 9,
      "speed": 20
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "thunderShock" },
      { "level": 20, "move": "thunderbolt" }
    ]
  },

  // #136 火伊布
  "flareon": {
    "id": 136,
    "name": "火伊布",
    "nameEn": "Flareon",
    "type": ["火"],
    "baseStats": {
      "hp": 65,
      "attack": 130,
      "defense": 60,
      "speed": 65
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 20,
      "defense": 9,
      "speed": 10
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "ember" },
      { "level": 20, "move": "flamethrower" }
    ]
  },

  // #137 多边兽
  "porygon": {
    "id": 137,
    "name": "多边兽",
    "nameEn": "Porygon",
    "type": ["普通"],
    "baseStats": {
      "hp": 65,
      "attack": 60,
      "defense": 70,
      "speed": 40
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 9,
      "defense": 11,
      "speed": 6
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #138 菊石兽
  "omanyte": {
    "id": 138,
    "name": "菊石兽",
    "nameEn": "Omanyte",
    "type": ["岩石", "水"],
    "baseStats": {
      "hp": 35,
      "attack": 40,
      "defense": 100,
      "speed": 35
    },
    "statsGrowth": {
      "hp": 6,
      "attack": 6,
      "defense": 15,
      "speed": 6
    },
    "evolutions": [
      { "level": 40, "evolveInto": "omastar" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #139 多刺菊石兽
  "omastar": {
    "id": 139,
    "name": "多刺菊石兽",
    "nameEn": "Omastar",
    "type": ["岩石", "水"],
    "baseStats": {
      "hp": 70,
      "attack": 60,
      "defense": 125,
      "speed": 55
    },
    "statsGrowth": {
      "hp": 11,
      "attack": 9,
      "defense": 19,
      "speed": 9
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #140 化石盔
  "kabuto": {
    "id": 140,
    "name": "化石盔",
    "nameEn": "Kabuto",
    "type": ["岩石", "水"],
    "baseStats": {
      "hp": 30,
      "attack": 80,
      "defense": 90,
      "speed": 55
    },
    "statsGrowth": {
      "hp": 5,
      "attack": 12,
      "defense": 14,
      "speed": 9
    },
    "evolutions": [
      { "level": 40, "evolveInto": "kabutops" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #141 镰刀盔
  "kabutops": {
    "id": 141,
    "name": "镰刀盔",
    "nameEn": "Kabutops",
    "type": ["岩石", "水"],
    "baseStats": {
      "hp": 60,
      "attack": 115,
      "defense": 105,
      "speed": 80
    },
    "statsGrowth": {
      "hp": 9,
      "attack": 18,
      "defense": 16,
      "speed": 12
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "waterGun" },
      { "level": 20, "move": "hydroPump" }
    ]
  },

  // #142 化石翼龙
  "aerodactyl": {
    "id": 142,
    "name": "化石翼龙",
    "nameEn": "Aerodactyl",
    "type": ["岩石", "飞行"],
    "baseStats": {
      "hp": 80,
      "attack": 105,
      "defense": 65,
      "speed": 130
    },
    "statsGrowth": {
      "hp": 12,
      "attack": 16,
      "defense": 10,
      "speed": 20
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "peck" }
    ]
  },

  // #143 卡比兽
  "snorlax": {
    "id": 143,
    "name": "卡比兽",
    "nameEn": "Snorlax",
    "type": ["普通"],
    "baseStats": {
      "hp": 160,
      "attack": 110,
      "defense": 65,
      "speed": 30
    },
    "statsGrowth": {
      "hp": 24,
      "attack": 17,
      "defense": 10,
      "speed": 5
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #144 急冻鸟
  "articuno": {
    "id": 144,
    "name": "急冻鸟",
    "nameEn": "Articuno",
    "type": ["冰", "飞行"],
    "baseStats": {
      "hp": 90,
      "attack": 85,
      "defense": 100,
      "speed": 85
    },
    "statsGrowth": {
      "hp": 14,
      "attack": 13,
      "defense": 15,
      "speed": 13
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "peck" }
    ]
  },

  // #145 闪电鸟
  "zapdos": {
    "id": 145,
    "name": "闪电鸟",
    "nameEn": "Zapdos",
    "type": ["电", "飞行"],
    "baseStats": {
      "hp": 90,
      "attack": 90,
      "defense": 85,
      "speed": 100
    },
    "statsGrowth": {
      "hp": 14,
      "attack": 14,
      "defense": 13,
      "speed": 15
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "thunderShock" },
      { "level": 20, "move": "thunderbolt" }
    ]
  },

  // #146 火焰鸟
  "moltres": {
    "id": 146,
    "name": "火焰鸟",
    "nameEn": "Moltres",
    "type": ["火", "飞行"],
    "baseStats": {
      "hp": 90,
      "attack": 100,
      "defense": 90,
      "speed": 90
    },
    "statsGrowth": {
      "hp": 14,
      "attack": 15,
      "defense": 14,
      "speed": 14
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "ember" },
      { "level": 20, "move": "flamethrower" }
    ]
  },

  // #147 迷你龙
  "dratini": {
    "id": 147,
    "name": "迷你龙",
    "nameEn": "Dratini",
    "type": ["龙"],
    "baseStats": {
      "hp": 41,
      "attack": 64,
      "defense": 45,
      "speed": 50
    },
    "statsGrowth": {
      "hp": 7,
      "attack": 10,
      "defense": 7,
      "speed": 8
    },
    "evolutions": [
      { "level": 30, "evolveInto": "dragonair" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #148 哈克龙
  "dragonair": {
    "id": 148,
    "name": "哈克龙",
    "nameEn": "Dragonair",
    "type": ["龙"],
    "baseStats": {
      "hp": 61,
      "attack": 84,
      "defense": 65,
      "speed": 70
    },
    "statsGrowth": {
      "hp": 10,
      "attack": 13,
      "defense": 10,
      "speed": 11
    },
    "evolutions": [
      { "level": 55, "evolveInto": "dragonite" }
    ],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #149 快龙
  "dragonite": {
    "id": 149,
    "name": "快龙",
    "nameEn": "Dragonite",
    "type": ["龙", "飞行"],
    "baseStats": {
      "hp": 91,
      "attack": 134,
      "defense": 95,
      "speed": 80
    },
    "statsGrowth": {
      "hp": 14,
      "attack": 21,
      "defense": 15,
      "speed": 12
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" },
      { "level": 10, "move": "peck" }
    ]
  },

  // #150 超梦
  "mewtwo": {
    "id": 150,
    "name": "超梦",
    "nameEn": "Mewtwo",
    "type": ["超能力"],
    "baseStats": {
      "hp": 106,
      "attack": 110,
      "defense": 90,
      "speed": 130
    },
    "statsGrowth": {
      "hp": 16,
      "attack": 17,
      "defense": 14,
      "speed": 20
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  },

  // #151 梦幻
  "mew": {
    "id": 151,
    "name": "梦幻",
    "nameEn": "Mew",
    "type": ["超能力"],
    "baseStats": {
      "hp": 100,
      "attack": 100,
      "defense": 100,
      "speed": 100
    },
    "statsGrowth": {
      "hp": 15,
      "attack": 15,
      "defense": 15,
      "speed": 15
    },
    "evolutions": [],
    "learnset": [
      { "level": 1, "move": "tackle" }
    ]
  }
};

// ========== 野生宝可梦生成池 ==========
const WILD_POKEMON_POOL = [
  // ========== 新手区域（1-10级）==========
  // 常见虫系
  {
    "species": "caterpie",
    "minLevel": 2,
    "maxLevel": 5,
    "weight": 25
  },
  {
    "species": "weedle",
    "minLevel": 2,
    "maxLevel": 5,
    "weight": 25
  },
  {
    "species": "metapod",
    "minLevel": 6,
    "maxLevel": 9,
    "weight": 15
  },
  {
    "species": "kakuna",
    "minLevel": 6,
    "maxLevel": 9,
    "weight": 15
  },

  // 常见普通系
  {
    "species": "rattata",
    "minLevel": 2,
    "maxLevel": 8,
    "weight": 25
  },
  {
    "species": "pidgey",
    "minLevel": 3,
    "maxLevel": 10,
    "weight": 25
  },
  {
    "species": "spearow",
    "minLevel": 3,
    "maxLevel": 9,
    "weight": 20
  },

  // ========== 初级区域（8-18级）==========
  {
    "species": "butterfree",
    "minLevel": 10,
    "maxLevel": 14,
    "weight": 12
  },
  {
    "species": "beedrill",
    "minLevel": 10,
    "maxLevel": 14,
    "weight": 12
  },
  {
    "species": "pidgeotto",
    "minLevel": 15,
    "maxLevel": 20,
    "weight": 15
  },
  {
    "species": "raticate",
    "minLevel": 15,
    "maxLevel": 22,
    "weight": 15
  },

  // 电系
  {
    "species": "pikachu",
    "minLevel": 10,
    "maxLevel": 18,
    "weight": 18
  },

  // 地面系
  {
    "species": "sandshrew",
    "minLevel": 10,
    "maxLevel": 18,
    "weight": 18
  },
  {
    "species": "diglett",
    "minLevel": 12,
    "maxLevel": 20,
    "weight": 15
  },

  // 毒系
  {
    "species": "ekans",
    "minLevel": 8,
    "maxLevel": 16,
    "weight": 18
  },
  {
    "species": "zubat",
    "minLevel": 10,
    "maxLevel": 18,
    "weight": 18
  },

  // 草系
  {
    "species": "oddish",
    "minLevel": 10,
    "maxLevel": 18,
    "weight": 18
  },
  {
    "species": "bellsprout",
    "minLevel": 10,
    "maxLevel": 18,
    "weight": 18
  },

  // ========== 中级区域（18-30级）==========
  // 进化形态
  {
    "species": "sandslash",
    "minLevel": 22,
    "maxLevel": 28,
    "weight": 12
  },
  {
    "species": "arbok",
    "minLevel": 22,
    "maxLevel": 28,
    "weight": 10
  },
  {
    "species": "golbat",
    "minLevel": 22,
    "maxLevel": 28,
    "weight": 10
  },
  {
    "species": "gloom",
    "minLevel": 21,
    "maxLevel": 28,
    "weight": 12
  },
  {
    "species": "weepinbell",
    "minLevel": 21,
    "maxLevel": 28,
    "weight": 12
  },

  // 水系
  {
    "species": "poliwag",
    "minLevel": 15,
    "maxLevel": 22,
    "weight": 15
  },
  {
    "species": "tentacool",
    "minLevel": 15,
    "maxLevel": 25,
    "weight": 15
  },
  {
    "species": "psyduck",
    "minLevel": 18,
    "maxLevel": 25,
    "weight": 15
  },
  {
    "species": "slowpoke",
    "minLevel": 18,
    "maxLevel": 28,
    "weight": 12
  },
  {
    "species": "krabby",
    "minLevel": 18,
    "maxLevel": 25,
    "weight": 15
  },
  {
    "species": "horsea",
    "minLevel": 18,
    "maxLevel": 25,
    "weight": 15
  },
  {
    "species": "goldeen",
    "minLevel": 18,
    "maxLevel": 25,
    "weight": 15
  },
  {
    "species": "magikarp",
    "minLevel": 5,
    "maxLevel": 15,
    "weight": 20
  },

  // 岩石/地面系
  {
    "species": "geodude",
    "minLevel": 15,
    "maxLevel": 22,
    "weight": 15
  },
  {
    "species": "onix",
    "minLevel": 18,
    "maxLevel": 28,
    "weight": 10
  },
  {
    "species": "cubone",
    "minLevel": 18,
    "maxLevel": 26,
    "weight": 12
  },

  // 格斗系
  {
    "species": "mankey",
    "minLevel": 15,
    "maxLevel": 25,
    "weight": 15
  },
  {
    "species": "machop",
    "minLevel": 15,
    "maxLevel": 25,
    "weight": 15
  },

  // 超能力系
  {
    "species": "abra",
    "minLevel": 10,
    "maxLevel": 18,
    "weight": 12
  },
  {
    "species": "drowzee",
    "minLevel": 18,
    "maxLevel": 25,
    "weight": 12
  },

  // 火系
  {
    "species": "vulpix",
    "minLevel": 18,
    "maxLevel": 28,
    "weight": 12
  },
  {
    "species": "growlithe",
    "minLevel": 18,
    "maxLevel": 28,
    "weight": 12
  },
  {
    "species": "ponyta",
    "minLevel": 22,
    "maxLevel": 32,
    "weight": 10
  },

  // 其他
  {
    "species": "meowth",
    "minLevel": 15,
    "maxLevel": 25,
    "weight": 15
  },
  {
    "species": "paras",
    "minLevel": 15,
    "maxLevel": 22,
    "weight": 15
  },
  {
    "species": "venonat",
    "minLevel": 18,
    "maxLevel": 28,
    "weight": 12
  },

  // ========== 高级区域（28-40级）==========
  {
    "species": "poliwhirl",
    "minLevel": 25,
    "maxLevel": 35,
    "weight": 10
  },
  {
    "species": "tentacruel",
    "minLevel": 30,
    "maxLevel": 38,
    "weight": 8
  },
  {
    "species": "graveler",
    "minLevel": 25,
    "maxLevel": 35,
    "weight": 10
  },
  {
    "species": "kadabra",
    "minLevel": 20,
    "maxLevel": 30,
    "weight": 8
  },
  {
    "species": "machoke",
    "minLevel": 28,
    "maxLevel": 35,
    "weight": 10
  },
  {
    "species": "marowak",
    "minLevel": 28,
    "maxLevel": 35,
    "weight": 10
  },
  {
    "species": "kingler",
    "minLevel": 28,
    "maxLevel": 35,
    "weight": 10
  },
  {
    "species": "seadra",
    "minLevel": 32,
    "maxLevel": 38,
    "weight": 8
  },
  {
    "species": "golduck",
    "minLevel": 33,
    "maxLevel": 38,
    "weight": 8
  },
  {
    "species": "primeape",
    "minLevel": 28,
    "maxLevel": 35,
    "weight": 10
  },
  {
    "species": "hypno",
    "minLevel": 28,
    "maxLevel": 35,
    "weight": 8
  },
  {
    "species": "persian",
    "minLevel": 28,
    "maxLevel": 35,
    "weight": 10
  },
  {
    "species": "parasect",
    "minLevel": 24,
    "maxLevel": 32,
    "weight": 10
  },
  {
    "species": "venomoth",
    "minLevel": 31,
    "maxLevel": 38,
    "weight": 8
  },

  // 稀有火系进化形态
  {
    "species": "ninetales",
    "minLevel": 35,
    "maxLevel": 40,
    "weight": 5
  },
  {
    "species": "arcanine",
    "minLevel": 35,
    "maxLevel": 40,
    "weight": 5
  },
  {
    "species": "rapidash",
    "minLevel": 40,
    "maxLevel": 45,
    "weight": 5
  },

  // ========== 稀有区域（35-50级）==========
  // 最终进化形态（稀有）
  {
    "species": "pidgeot",
    "minLevel": 36,
    "maxLevel": 42,
    "weight": 5
  },
  {
    "species": "fearow",
    "minLevel": 30,
    "maxLevel": 38,
    "weight": 5
  },
  {
    "species": "vileplume",
    "minLevel": 36,
    "maxLevel": 42,
    "weight": 4
  },
  {
    "species": "victreebel",
    "minLevel": 36,
    "maxLevel": 42,
    "weight": 4
  },
  {
    "species": "golem",
    "minLevel": 40,
    "maxLevel": 45,
    "weight": 4
  },
  {
    "species": "alakazam",
    "minLevel": 40,
    "maxLevel": 45,
    "weight": 4
  },
  {
    "species": "machamp",
    "minLevel": 40,
    "maxLevel": 45,
    "weight": 4
  },

  // 龙系（超稀有）
  {
    "species": "dratini",
    "minLevel": 15,
    "maxLevel": 25,
    "weight": 5
  },
  {
    "species": "dragonair",
    "minLevel": 30,
    "maxLevel": 40,
    "weight": 3
  },
  {
    "species": "gyarados",
    "minLevel": 25,
    "maxLevel": 35,
    "weight": 3
  },

  // 电系进化
  {
    "species": "raichu",
    "minLevel": 30,
    "maxLevel": 38,
    "weight": 5
  },
  {
    "species": "magneton",
    "minLevel": 30,
    "maxLevel": 38,
    "weight": 5
  },

  // 幽灵系（稀有）
  {
    "species": "gastly",
    "minLevel": 18,
    "maxLevel": 25,
    "weight": 8
  },
  {
    "species": "haunter",
    "minLevel": 25,
    "maxLevel": 35,
    "weight": 5
  },
  {
    "species": "gengar",
    "minLevel": 40,
    "maxLevel": 45,
    "weight": 3
  },

  // 尼多家族
  {
    "species": "nidoran-f",
    "minLevel": 12,
    "maxLevel": 18,
    "weight": 15
  },
  {
    "species": "nidoran-m",
    "minLevel": 12,
    "maxLevel": 18,
    "weight": 15
  },
  {
    "species": "nidorina",
    "minLevel": 18,
    "maxLevel": 28,
    "weight": 10
  },
  {
    "species": "nidorino",
    "minLevel": 18,
    "maxLevel": 28,
    "weight": 10
  },

  // 伊布（稀有）
  {
    "species": "eevee",
    "minLevel": 15,
    "maxLevel": 25,
    "weight": 5
  }
];
