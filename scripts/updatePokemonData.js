// 更新宝可梦进化链和技能学习表的脚本
const fs = require('fs');

// 进化链配置（按照初代宝可梦官方设定）
const EVOLUTION_CHAINS = {
  // 御三家
  "bulbasaur": [{ "level": 16, "evolveInto": "ivysaur" }],
  "ivysaur": [{ "level": 32, "evolveInto": "venusaur" }],
  "charmander": [{ "level": 16, "evolveInto": "charmeleon" }],
  "charmeleon": [{ "level": 36, "evolveInto": "charizard" }],
  "squirtle": [{ "level": 16, "evolveInto": "wartortle" }],
  "wartortle": [{ "level": 36, "evolveInto": "blastoise" }],

  // 常见虫系
  "caterpie": [{ "level": 7, "evolveInto": "metapod" }],
  "metapod": [{ "level": 10, "evolveInto": "butterfree" }],
  "weedle": [{ "level": 7, "evolveInto": "kakuna" }],
  "kakuna": [{ "level": 10, "evolveInto": "beedrill" }],

  // 飞行系
  "pidgey": [{ "level": 18, "evolveInto": "pidgeotto" }],
  "pidgeotto": [{ "level": 36, "evolveInto": "pidgeot" }],
  "spearow": [{ "level": 20, "evolveInto": "fearow" }],
  "zubat": [{ "level": 22, "evolveInto": "golbat" }],

  // 普通系
  "rattata": [{ "level": 20, "evolveInto": "raticate" }],
  "meowth": [{ "level": 28, "evolveInto": "persian" }],
  "doduo": [{ "level": 31, "evolveInto": "dodrio" }],

  // 毒系
  "ekans": [{ "level": 22, "evolveInto": "arbok" }],
  "grimer": [{ "level": 38, "evolveInto": "muk" }],
  "koffing": [{ "level": 35, "evolveInto": "weezing" }],

  // 电系（石头进化简化为等级）
  "pikachu": [{ "level": 30, "evolveInto": "raichu" }],
  "voltorb": [{ "level": 30, "evolveInto": "electrode" }],
  "magnemite": [{ "level": 30, "evolveInto": "magneton" }],

  // 地面系
  "sandshrew": [{ "level": 22, "evolveInto": "sandslash" }],
  "diglett": [{ "level": 26, "evolveInto": "dugtrio" }],
  "cubone": [{ "level": 28, "evolveInto": "marowak" }],
  "rhyhorn": [{ "level": 42, "evolveInto": "rhydon" }],

  // 尼多家族
  "nidoran-f": [{ "level": 16, "evolveInto": "nidorina" }],
  "nidorina": [{ "level": 36, "evolveInto": "nidoqueen" }],
  "nidoran-m": [{ "level": 16, "evolveInto": "nidorino" }],
  "nidorino": [{ "level": 36, "evolveInto": "nidoking" }],

  // 妖精系（石头进化简化为等级）
  "clefairy": [{ "level": 30, "evolveInto": "clefable" }],
  "jigglypuff": [{ "level": 30, "evolveInto": "wigglytuff" }],

  // 火系
  "vulpix": [{ "level": 35, "evolveInto": "ninetales" }],
  "growlithe": [{ "level": 35, "evolveInto": "arcanine" }],
  "ponyta": [{ "level": 40, "evolveInto": "rapidash" }],

  // 草系
  "oddish": [{ "level": 21, "evolveInto": "gloom" }],
  "gloom": [{ "level": 36, "evolveInto": "vileplume" }],
  "bellsprout": [{ "level": 21, "evolveInto": "weepinbell" }],
  "weepinbell": [{ "level": 36, "evolveInto": "victreebel" }],
  "paras": [{ "level": 24, "evolveInto": "parasect" }],
  "venonat": [{ "level": 31, "evolveInto": "venomoth" }],
  "exeggcute": [{ "level": 35, "evolveInto": "exeggutor" }],

  // 水系
  "poliwag": [{ "level": 25, "evolveInto": "poliwhirl" }],
  "poliwhirl": [{ "level": 40, "evolveInto": "poliwrath" }],
  "tentacool": [{ "level": 30, "evolveInto": "tentacruel" }],
  "slowpoke": [{ "level": 37, "evolveInto": "slowbro" }],
  "seel": [{ "level": 34, "evolveInto": "dewgong" }],
  "shellder": [{ "level": 35, "evolveInto": "cloyster" }],
  "krabby": [{ "level": 28, "evolveInto": "kingler" }],
  "horsea": [{ "level": 32, "evolveInto": "seadra" }],
  "goldeen": [{ "level": 33, "evolveInto": "seaking" }],
  "staryu": [{ "level": 35, "evolveInto": "starmie" }],
  "magikarp": [{ "level": 20, "evolveInto": "gyarados" }],
  "psyduck": [{ "level": 33, "evolveInto": "golduck" }],

  // 格斗系（交换进化简化为等级）
  "machop": [{ "level": 28, "evolveInto": "machoke" }],
  "machoke": [{ "level": 40, "evolveInto": "machamp" }],
  "mankey": [{ "level": 28, "evolveInto": "primeape" }],

  // 超能力系
  "abra": [{ "level": 16, "evolveInto": "kadabra" }],
  "kadabra": [{ "level": 40, "evolveInto": "alakazam" }],
  "drowzee": [{ "level": 26, "evolveInto": "hypno" }],

  // 岩石系
  "geodude": [{ "level": 25, "evolveInto": "graveler" }],
  "graveler": [{ "level": 40, "evolveInto": "golem" }],
  "omanyte": [{ "level": 40, "evolveInto": "omastar" }],
  "kabuto": [{ "level": 40, "evolveInto": "kabutops" }],

  // 幽灵系
  "gastly": [{ "level": 25, "evolveInto": "haunter" }],
  "haunter": [{ "level": 40, "evolveInto": "gengar" }],

  // 伊布家族（石头进化简化为等级，注意：一只伊布只能进化成一种）
  "eevee": [
    { "level": 30, "evolveInto": "vaporeon" },  // 游戏中会随机选择一个
    { "level": 30, "evolveInto": "jolteon" },
    { "level": 30, "evolveInto": "flareon" }
  ],

  // 龙系
  "dratini": [{ "level": 30, "evolveInto": "dragonair" }],
  "dragonair": [{ "level": 55, "evolveInto": "dragonite" }]
};

// 技能学习表配置
const LEARNSETS = {
  // 妙蛙种子系列
  "bulbasaur": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "growl" },
    { "level": 7, "move": "vineWhip" },
    { "level": 13, "move": "poisonPowder" },
    { "level": 20, "move": "razorLeaf" },
    { "level": 32, "move": "solarBeam" }
  ],
  "ivysaur": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "growl" },
    { "level": 1, "move": "vineWhip" },
    { "level": 7, "move": "vineWhip" },
    { "level": 13, "move": "poisonPowder" },
    { "level": 22, "move": "razorLeaf" },
    { "level": 36, "move": "solarBeam" }
  ],
  "venusaur": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "growl" },
    { "level": 1, "move": "vineWhip" },
    { "level": 1, "move": "razorLeaf" },
    { "level": 32, "move": "solarBeam" }
  ],

  // 小火龙系列
  "charmander": [
    { "level": 1, "move": "scratch" },
    { "level": 1, "move": "growl" },
    { "level": 7, "move": "ember" },
    { "level": 13, "move": "scaryFace" },
    { "level": 19, "move": "bite" },
    { "level": 28, "move": "flamethrower" },
    { "level": 34, "move": "dragonRage" }
  ],
  "charmeleon": [
    { "level": 1, "move": "scratch" },
    { "level": 1, "move": "growl" },
    { "level": 1, "move": "ember" },
    { "level": 7, "move": "ember" },
    { "level": 13, "move": "scaryFace" },
    { "level": 20, "move": "bite" },
    { "level": 30, "move": "flamethrower" },
    { "level": 36, "move": "dragonRage" }
  ],
  "charizard": [
    { "level": 1, "move": "scratch" },
    { "level": 1, "move": "growl" },
    { "level": 1, "move": "ember" },
    { "level": 1, "move": "flamethrower" },
    { "level": 36, "move": "dragonRage" }
  ],

  // 杰尼龟系列
  "squirtle": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "tailWhip" },
    { "level": 7, "move": "bubble" },
    { "level": 10, "move": "waterGun" },
    { "level": 13, "move": "withdraw" },
    { "level": 18, "move": "bite" },
    { "level": 28, "move": "hydroPump" }
  ],
  "wartortle": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "tailWhip" },
    { "level": 1, "move": "bubble" },
    { "level": 7, "move": "bubble" },
    { "level": 10, "move": "waterGun" },
    { "level": 13, "move": "withdraw" },
    { "level": 19, "move": "bite" },
    { "level": 31, "move": "hydroPump" }
  ],
  "blastoise": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "bubble" },
    { "level": 1, "move": "waterGun" },
    { "level": 1, "move": "withdraw" },
    { "level": 36, "move": "hydroPump" }
  ],

  // 绿毛虫系列
  "caterpie": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "stringShot" }
  ],
  "metapod": [
    { "level": 1, "move": "tackle" },
    { "level": 7, "move": "tackle" }
  ],
  "butterfree": [
    { "level": 1, "move": "tackle" },
    { "level": 10, "move": "bugBite" },
    { "level": 13, "move": "poisonPowder" }
  ],

  // 独角虫系列
  "weedle": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "stringShot" }
  ],
  "kakuna": [
    { "level": 1, "move": "tackle" },
    { "level": 7, "move": "tackle" }
  ],
  "beedrill": [
    { "level": 1, "move": "tackle" },
    { "level": 10, "move": "bugBite" },
    { "level": 13, "move": "poisonPowder" }
  ],

  // 波波系列
  "pidgey": [
    { "level": 1, "move": "tackle" },
    { "level": 5, "move": "peck" },
    { "level": 12, "move": "bite" }
  ],
  "pidgeotto": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "peck" },
    { "level": 5, "move": "peck" },
    { "level": 12, "move": "bite" }
  ],
  "pidgeot": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "peck" },
    { "level": 1, "move": "bite" }
  ],

  // 小拉达系列
  "rattata": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "tailWhip" },
    { "level": 7, "move": "bite" }
  ],
  "raticate": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "tailWhip" },
    { "level": 1, "move": "bite" },
    { "level": 7, "move": "bite" }
  ],

  // 烈雀系列
  "spearow": [
    { "level": 1, "move": "peck" },
    { "level": 7, "move": "leer" }
  ],
  "fearow": [
    { "level": 1, "move": "peck" },
    { "level": 1, "move": "leer" }
  ],

  // 阿柏蛇系列
  "ekans": [
    { "level": 1, "move": "tackle" },
    { "level": 8, "move": "poisonPowder" },
    { "level": 13, "move": "bite" }
  ],
  "arbok": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "poisonPowder" },
    { "level": 1, "move": "bite" }
  ],

  // 皮卡丘系列
  "pikachu": [
    { "level": 1, "move": "thunderShock" },
    { "level": 1, "move": "growl" },
    { "level": 6, "move": "tailWhip" },
    { "level": 13, "move": "thunderbolt" }
  ],
  "raichu": [
    { "level": 1, "move": "thunderShock" },
    { "level": 1, "move": "growl" },
    { "level": 1, "move": "thunderbolt" }
  ],

  // 穿山鼠系列
  "sandshrew": [
    { "level": 1, "move": "scratch" },
    { "level": 6, "move": "leer" }
  ],
  "sandslash": [
    { "level": 1, "move": "scratch" },
    { "level": 1, "move": "leer" }
  ],

  // 其他常见宝可梦（使用默认技能）
  "nidoran-f": [
    { "level": 1, "move": "tackle" },
    { "level": 8, "move": "poisonPowder" }
  ],
  "nidorina": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "poisonPowder" }
  ],
  "nidoqueen": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "poisonPowder" },
    { "level": 23, "move": "bite" }
  ],
  "nidoran-m": [
    { "level": 1, "move": "tackle" },
    { "level": 8, "move": "poisonPowder" }
  ],
  "nidorino": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "poisonPowder" }
  ],
  "nidoking": [
    { "level": 1, "move": "tackle" },
    { "level": 1, "move": "poisonPowder" },
    { "level": 23, "move": "bite" }
  ]
};

// 为没有配置的宝可梦生成基础技能学习表
function generateDefaultLearnset(pokemonId, type) {
  const learnset = [{ "level": 1, "move": "tackle" }];

  // 根据属性添加对应的技能
  if (type.includes("火")) {
    learnset.push({ "level": 10, "move": "ember" });
    learnset.push({ "level": 20, "move": "flamethrower" });
  } else if (type.includes("水")) {
    learnset.push({ "level": 10, "move": "waterGun" });
    learnset.push({ "level": 20, "move": "hydroPump" });
  } else if (type.includes("草")) {
    learnset.push({ "level": 10, "move": "vineWhip" });
    learnset.push({ "level": 20, "move": "razorLeaf" });
  } else if (type.includes("电")) {
    learnset.push({ "level": 10, "move": "thunderShock" });
    learnset.push({ "level": 20, "move": "thunderbolt" });
  } else if (type.includes("虫")) {
    learnset.push({ "level": 10, "move": "bugBite" });
  } else if (type.includes("飞行")) {
    learnset.push({ "level": 10, "move": "peck" });
  } else if (type.includes("毒")) {
    learnset.push({ "level": 10, "move": "poisonPowder" });
  }

  return learnset;
}

// 主函数：更新宝可梦数据
async function updatePokemonData() {
  console.log('开始更新宝可梦数据...\n');

  // 读取现有的JSON数据
  const jsonData = JSON.parse(fs.readFileSync('./pokemon_data_generated.json', 'utf8'));

  let updatedCount = 0;
  let evolutionCount = 0;

  // 更新每只宝可梦
  for (const [speciesId, pokemon] of Object.entries(jsonData)) {
    // 更新进化链
    if (EVOLUTION_CHAINS[speciesId]) {
      pokemon.evolutions = EVOLUTION_CHAINS[speciesId];
      evolutionCount++;
    }

    // 更新技能学习表
    if (LEARNSETS[speciesId]) {
      pokemon.learnset = LEARNSETS[speciesId];
    } else {
      // 生成默认技能学习表
      pokemon.learnset = generateDefaultLearnset(speciesId, pokemon.type);
    }

    updatedCount++;
  }

  console.log(`✓ 已更新 ${updatedCount} 只宝可梦`);
  console.log(`✓ 配置了 ${evolutionCount} 条进化链`);

  // 保存更新后的JSON
  fs.writeFileSync('./pokemon_data_generated.json', JSON.stringify(jsonData, null, 2), 'utf8');
  console.log('\n✓ JSON数据已更新');

  // 生成JavaScript代码
  console.log('正在生成JavaScript代码...');
  let jsCode = '// ========== 宝可梦数据 ==========\n';
  jsCode += '// 数据来源: PokeAPI (https://pokeapi.co/)\n';
  jsCode += '// 更新时间: ' + new Date().toISOString() + '\n';
  jsCode += '// 包含151只初代宝可梦完整数据（已配置进化链和技能学习表）\n\n';
  jsCode += 'const POKEMON_DATA = {\n';

  const entries = Object.entries(jsonData).sort((a, b) => a[1].id - b[1].id);

  for (let i = 0; i < entries.length; i++) {
    const [speciesId, data] = entries[i];

    jsCode += `  // #${data.id} ${data.name}\n`;
    jsCode += `  "${speciesId}": {\n`;
    jsCode += `    "id": ${data.id},\n`;
    jsCode += `    "name": "${data.name}",\n`;
    jsCode += `    "nameEn": "${data.nameEn}",\n`;
    jsCode += `    "type": [${data.type.map(t => `"${t}"`).join(', ')}],\n`;
    jsCode += `    "baseStats": {\n`;
    jsCode += `      "hp": ${data.baseStats.hp},\n`;
    jsCode += `      "attack": ${data.baseStats.attack},\n`;
    jsCode += `      "defense": ${data.baseStats.defense},\n`;
    jsCode += `      "speed": ${data.baseStats.speed}\n`;
    jsCode += `    },\n`;
    jsCode += `    "statsGrowth": {\n`;
    jsCode += `      "hp": ${data.statsGrowth.hp},\n`;
    jsCode += `      "attack": ${data.statsGrowth.attack},\n`;
    jsCode += `      "defense": ${data.statsGrowth.defense},\n`;
    jsCode += `      "speed": ${data.statsGrowth.speed}\n`;
    jsCode += `    },\n`;

    // 进化链
    if (data.evolutions && data.evolutions.length > 0) {
      jsCode += `    "evolutions": [\n`;
      data.evolutions.forEach((evo, idx) => {
        jsCode += `      { "level": ${evo.level}, "evolveInto": "${evo.evolveInto}" }`;
        if (idx < data.evolutions.length - 1) jsCode += ',';
        jsCode += '\n';
      });
      jsCode += `    ],\n`;
    } else {
      jsCode += `    "evolutions": [],\n`;
    }

    // 技能学习表
    jsCode += `    "learnset": [\n`;
    data.learnset.forEach((learn, idx) => {
      jsCode += `      { "level": ${learn.level}, "move": "${learn.move}" }`;
      if (idx < data.learnset.length - 1) jsCode += ',';
      jsCode += '\n';
    });
    jsCode += `    ]\n`;

    jsCode += `  }`;

    if (i < entries.length - 1) {
      jsCode += ',\n\n';
    } else {
      jsCode += '\n';
    }
  }

  jsCode += '};\n';

  fs.writeFileSync('./pokemon_data_generated.js', jsCode, 'utf8');
  console.log('✓ JavaScript代码已生成\n');

  console.log('完成！请将生成的代码复制到 scripts/data.js 中替换现有的 POKEMON_DATA');
}

// 运行
updatePokemonData().catch(console.error);
