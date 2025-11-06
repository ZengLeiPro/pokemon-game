// 从PokeAPI批量获取151只初代宝可梦数据
// 使用方法: node fetchPokemonData.js

// 类型映射（英文 -> 中文）
const TYPE_MAP = {
  'normal': '普通',
  'fire': '火',
  'water': '水',
  'grass': '草',
  'electric': '电',
  'ice': '冰',
  'fighting': '格斗',
  'poison': '毒',
  'ground': '地面',
  'flying': '飞行',
  'psychic': '超能力',
  'bug': '虫',
  'rock': '岩石',
  'ghost': '幽灵',
  'dragon': '龙',
  'dark': '恶',
  'steel': '钢',
  'fairy': '妖精'
};

// 宝可梦名称映射（英文 -> 中文）
const NAME_MAP = {
  'bulbasaur': '妙蛙种子',
  'ivysaur': '妙蛙草',
  'venusaur': '妙蛙花',
  'charmander': '小火龙',
  'charmeleon': '火恐龙',
  'charizard': '喷火龙',
  'squirtle': '杰尼龟',
  'wartortle': '卡咪龟',
  'blastoise': '水箭龟',
  'caterpie': '绿毛虫',
  'metapod': '铁甲蛹',
  'butterfree': '巴大蝶',
  'weedle': '独角虫',
  'kakuna': '铁壳蛹',
  'beedrill': '大针蜂',
  'pidgey': '波波',
  'pidgeotto': '比比鸟',
  'pidgeot': '大比鸟',
  'rattata': '小拉达',
  'raticate': '拉达',
  'spearow': '烈雀',
  'fearow': '大嘴雀',
  'ekans': '阿柏蛇',
  'arbok': '阿柏怪',
  'pikachu': '皮卡丘',
  'raichu': '雷丘',
  'sandshrew': '穿山鼠',
  'sandslash': '穿山王',
  'nidoran-f': '尼多兰',
  'nidorina': '尼多娜',
  'nidoqueen': '尼多后',
  'nidoran-m': '尼多朗',
  'nidorino': '尼多力诺',
  'nidoking': '尼多王',
  'clefairy': '皮皮',
  'clefable': '皮可西',
  'vulpix': '六尾',
  'ninetales': '九尾',
  'jigglypuff': '胖丁',
  'wigglytuff': '胖可丁',
  'zubat': '超音蝠',
  'golbat': '大嘴蝠',
  'oddish': '走路草',
  'gloom': '臭臭花',
  'vileplume': '霸王花',
  'paras': '派拉斯',
  'parasect': '派拉斯特',
  'venonat': '毛球',
  'venomoth': '摩鲁蛾',
  'diglett': '地鼠',
  'dugtrio': '三地鼠',
  'meowth': '喵喵',
  'persian': '猫老大',
  'psyduck': '可达鸭',
  'golduck': '哥达鸭',
  'mankey': '猴怪',
  'primeape': '火爆猴',
  'growlithe': '卡蒂狗',
  'arcanine': '风速狗',
  'poliwag': '蚊香蝌蚪',
  'poliwhirl': '蚊香君',
  'poliwrath': '蚊香泳士',
  'abra': '凯西',
  'kadabra': '勇基拉',
  'alakazam': '胡地',
  'machop': '腕力',
  'machoke': '豪力',
  'machamp': '怪力',
  'bellsprout': '喇叭芽',
  'weepinbell': '口呆花',
  'victreebel': '大食花',
  'tentacool': '玛瑙水母',
  'tentacruel': '毒刺水母',
  'geodude': '小拳石',
  'graveler': '隆隆石',
  'golem': '隆隆岩',
  'ponyta': '小火马',
  'rapidash': '烈焰马',
  'slowpoke': '呆呆兽',
  'slowbro': '呆壳兽',
  'magnemite': '小磁怪',
  'magneton': '三合一磁怪',
  'farfetchd': '大葱鸭',
  'doduo': '嘟嘟',
  'dodrio': '嘟嘟利',
  'seel': '小海狮',
  'dewgong': '白海狮',
  'grimer': '臭泥',
  'muk': '臭臭泥',
  'shellder': '大舌贝',
  'cloyster': '刺甲贝',
  'gastly': '鬼斯',
  'haunter': '鬼斯通',
  'gengar': '耿鬼',
  'onix': '大岩蛇',
  'drowzee': '催眠貘',
  'hypno': '引梦貘人',
  'krabby': '大钳蟹',
  'kingler': '巨钳蟹',
  'voltorb': '霹雳电球',
  'electrode': '顽皮雷弹',
  'exeggcute': '蛋蛋',
  'exeggutor': '椰蛋树',
  'cubone': '卡拉卡拉',
  'marowak': '嘎拉嘎拉',
  'hitmonlee': '飞腿郎',
  'hitmonchan': '快拳郎',
  'lickitung': '大舌头',
  'koffing': '瓦斯弹',
  'weezing': '双弹瓦斯',
  'rhyhorn': '独角犀牛',
  'rhydon': '钻角犀兽',
  'chansey': '吉利蛋',
  'tangela': '蔓藤怪',
  'kangaskhan': '袋兽',
  'horsea': '墨海马',
  'seadra': '海刺龙',
  'goldeen': '角金鱼',
  'seaking': '金鱼王',
  'staryu': '海星星',
  'starmie': '宝石海星',
  'mr-mime': '魔墙人偶',
  'scyther': '飞天螳螂',
  'jynx': '迷唇姐',
  'electabuzz': '电击兽',
  'magmar': '鸭嘴火兽',
  'pinsir': '凯罗斯',
  'tauros': '肯泰罗',
  'magikarp': '鲤鱼王',
  'gyarados': '暴鲤龙',
  'lapras': '拉普拉斯',
  'ditto': '百变怪',
  'eevee': '伊布',
  'vaporeon': '水伊布',
  'jolteon': '雷伊布',
  'flareon': '火伊布',
  'porygon': '多边兽',
  'omanyte': '菊石兽',
  'omastar': '多刺菊石兽',
  'kabuto': '化石盔',
  'kabutops': '镰刀盔',
  'aerodactyl': '化石翼龙',
  'snorlax': '卡比兽',
  'articuno': '急冻鸟',
  'zapdos': '闪电鸟',
  'moltres': '火焰鸟',
  'dratini': '迷你龙',
  'dragonair': '哈克龙',
  'dragonite': '快龙',
  'mewtwo': '超梦',
  'mew': '梦幻'
};

// 延迟函数，避免请求过快
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 从API获取单个宝可梦数据
async function fetchPokemonById(id) {
  return new Promise((resolve, reject) => {
    const https = require('https');
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (error) {
          console.error(`解析宝可梦 ${id} 数据失败:`, error.message);
          resolve(null);
        }
      });
    }).on('error', (error) => {
      console.error(`获取宝可梦 ${id} 失败:`, error.message);
      resolve(null);
    });
  });
}

// 从API获取进化链数据
async function fetchEvolutionChain(speciesUrl) {
  try {
    // 先获取species数据
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();

    // 再获取进化链数据
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();

    return evolutionData;
  } catch (error) {
    console.error('获取进化链失败:', error.message);
    return null;
  }
}

// 解析进化链
function parseEvolutionChain(chain, currentSpeciesName) {
  const evolutions = [];

  function traverse(node, level = 0) {
    if (node.species.name === currentSpeciesName) {
      // 找到当前宝可梦，处理它的进化
      for (const evo of node.evolves_to) {
        const evoDetail = evo.evolution_details[0];
        if (evoDetail && evoDetail.min_level) {
          evolutions.push({
            level: evoDetail.min_level,
            evolveInto: evo.species.name
          });
        }
        // 递归处理下一级进化
        traverse(evo, level + 1);
      }
    } else {
      // 继续遍历
      for (const evo of node.evolves_to) {
        traverse(evo, level + 1);
      }
    }
  }

  traverse(chain);
  return evolutions;
}

// 转换宝可梦数据为项目格式
function convertPokemonData(apiData) {
  const name = apiData.name;
  const chineseName = NAME_MAP[name] || name;

  // 提取属性
  const types = apiData.types
    .sort((a, b) => a.slot - b.slot)
    .map(t => TYPE_MAP[t.type.name] || t.type.name);

  // 提取基础属性值
  const stats = {};
  apiData.stats.forEach(stat => {
    const statName = stat.stat.name;
    if (statName === 'hp') stats.hp = stat.base_stat;
    if (statName === 'attack') stats.attack = stat.base_stat;
    if (statName === 'defense') stats.defense = stat.base_stat;
    if (statName === 'speed') stats.speed = stat.base_stat;
  });

  // 计算属性成长值（简化：基础值的15%，向上取整）
  const statsGrowth = {
    hp: Math.max(1, Math.ceil(stats.hp * 0.15)),
    attack: Math.max(1, Math.ceil(stats.attack * 0.15)),
    defense: Math.max(1, Math.ceil(stats.defense * 0.15)),
    speed: Math.max(1, Math.ceil(stats.speed * 0.15))
  };

  return {
    id: apiData.id,
    name: chineseName,
    nameEn: apiData.name.charAt(0).toUpperCase() + apiData.name.slice(1),
    type: types,
    baseStats: stats,
    statsGrowth: statsGrowth,
    evolutions: [], // 稍后填充
    learnset: [] // 稍后填充
  };
}

// 主函数
async function fetchAllPokemon() {
  console.log('开始获取151只初代宝可梦数据...\n');

  const allPokemonData = {};
  const batchSize = 10; // 每批处理10只

  for (let i = 1; i <= 151; i += batchSize) {
    const batch = [];
    const end = Math.min(i + batchSize - 1, 151);

    console.log(`正在获取第 ${i}-${end} 只宝可梦...`);

    // 批量获取
    for (let j = i; j <= end; j++) {
      batch.push(fetchPokemonById(j));
    }

    const results = await Promise.all(batch);

    // 处理结果
    for (const apiData of results) {
      if (apiData) {
        const pokemonData = convertPokemonData(apiData);
        const speciesId = apiData.name;
        allPokemonData[speciesId] = pokemonData;
        console.log(`  ✓ #${pokemonData.id} ${pokemonData.name} (${pokemonData.nameEn})`);
      }
    }

    // 延迟，避免请求过快
    if (end < 151) {
      await delay(500);
    }
  }

  console.log('\n数据获取完成！');
  console.log(`共获取 ${Object.keys(allPokemonData).length} 只宝可梦\n`);

  return allPokemonData;
}

// 生成JavaScript代码
function generateJavaScriptCode(pokemonData) {
  let code = '// ========== 宝可梦数据 ==========\n';
  code += '// 数据来源: PokeAPI (https://pokeapi.co/)\n';
  code += '// 生成时间: ' + new Date().toISOString() + '\n\n';
  code += 'const POKEMON_DATA = {\n';

  const entries = Object.entries(pokemonData).sort((a, b) => a[1].id - b[1].id);

  for (let i = 0; i < entries.length; i++) {
    const [speciesId, data] = entries[i];

    code += `  // #${data.id} ${data.name}\n`;
    code += `  "${speciesId}": {\n`;
    code += `    "id": ${data.id},\n`;
    code += `    "name": "${data.name}",\n`;
    code += `    "nameEn": "${data.nameEn}",\n`;
    code += `    "type": [${data.type.map(t => `"${t}"`).join(', ')}],\n`;
    code += `    "baseStats": {\n`;
    code += `      "hp": ${data.baseStats.hp},\n`;
    code += `      "attack": ${data.baseStats.attack},\n`;
    code += `      "defense": ${data.baseStats.defense},\n`;
    code += `      "speed": ${data.baseStats.speed}\n`;
    code += `    },\n`;
    code += `    "statsGrowth": {\n`;
    code += `      "hp": ${data.statsGrowth.hp},\n`;
    code += `      "attack": ${data.statsGrowth.attack},\n`;
    code += `      "defense": ${data.statsGrowth.defense},\n`;
    code += `      "speed": ${data.statsGrowth.speed}\n`;
    code += `    },\n`;
    code += `    "evolutions": [],\n`;
    code += `    "learnset": [\n`;
    code += `      { "level": 1, "move": "tackle" }\n`;
    code += `    ]\n`;
    code += `  }`;

    if (i < entries.length - 1) {
      code += ',\n\n';
    } else {
      code += '\n';
    }
  }

  code += '};\n';

  return code;
}

// 运行主函数
async function main() {
  try {
    const pokemonData = await fetchAllPokemon();

    // 生成JavaScript代码
    console.log('正在生成JavaScript代码...');
    const jsCode = generateJavaScriptCode(pokemonData);

    // 保存到文件
    const fs = require('fs');
    const outputPath = './pokemon_data_generated.js';
    fs.writeFileSync(outputPath, jsCode, 'utf8');

    console.log(`\n✓ 数据已保存到: ${outputPath}`);
    console.log('\n提示: 你可以将生成的数据复制到 scripts/data.js 文件中的 POKEMON_DATA 对象');

    // 同时生成JSON格式，方便查看
    const jsonPath = './pokemon_data_generated.json';
    fs.writeFileSync(jsonPath, JSON.stringify(pokemonData, null, 2), 'utf8');
    console.log(`✓ JSON格式已保存到: ${jsonPath}`);

  } catch (error) {
    console.error('发生错误:', error);
  }
}

// 执行
main();
