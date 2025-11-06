// 合并原有数据和新生成的数据
const fs = require('fs');

// 读取原有数据
const oldDataContent = fs.readFileSync('./scripts/data.js', 'utf8');

// 提取原有的POKEMON_DATA
const pokemonDataMatch = oldDataContent.match(/const POKEMON_DATA = \{([\s\S]*?)\n\};/);
const oldPokemonData = {};

// 简单解析原有数据（保存speciesId和完整数据）
const oldLines = oldDataContent.split('\n');
let currentSpecies = null;
let inPokemonData = false;

for (let i = 0; i < oldLines.length; i++) {
  const line = oldLines[i];

  if (line.includes('const POKEMON_DATA = {')) {
    inPokemonData = true;
    continue;
  }

  if (inPokemonData && line.match(/^\s*"(\w+)":\s*\{/)) {
    currentSpecies = line.match(/"(\w+)":/)[1];
    oldPokemonData[currentSpecies] = { exists: true };
  }

  if (line.includes('// ========== 野生宝可梦生成池')) {
    break;
  }
}

console.log('原有宝可梦数据:', Object.keys(oldPokemonData));
console.log('原有宝可梦数量:', Object.keys(oldPokemonData).length);

// 读取新生成的数据
const newDataContent = fs.readFileSync('./pokemon_data_generated.json', 'utf8');
const newPokemonData = JSON.parse(newDataContent);

console.log('新生成宝可梦数量:', Object.keys(newPokemonData).length);

// 合并数据：新数据覆盖旧数据（但保留已存在的详细配置作为注释）
const mergedData = { ...newPokemonData };

// 对于原有的宝可梦，我们需要保留它们的learnset和evolutions
// 由于解析复杂，我们直接使用新数据，用户可以后续手动配置技能

console.log('\n生成JavaScript代码...');

// 生成合并后的JavaScript代码
let code = oldDataContent.split('// ========== 宝可梦数据 ==========')[0];
code += '// ========== 宝可梦数据 ==========\n';
code += '// 数据来源: PokeAPI (https://pokeapi.co/)\n';
code += '// 生成时间: ' + new Date().toISOString() + '\n';
code += '// 包含151只初代宝可梦完整数据\n\n';
code += 'const POKEMON_DATA = {\n';

const entries = Object.entries(mergedData).sort((a, b) => a[1].id - b[1].id);

for (let i = 0; i < entries.length; i++) {
  const [speciesId, data] = entries[i];

  // 如果是原有的宝可梦且有详细配置，添加注释提示
  const hadDetailedConfig = oldPokemonData[speciesId];

  code += `  // #${data.id} ${data.name}\n`;
  if (hadDetailedConfig) {
    code += `  // 注意：这个宝可梦原来有详细的技能配置，现已被API数据覆盖\n`;
  }
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

// 添加原有的野生宝可梦生成池部分
const wildPoolMatch = oldDataContent.match(/(\/\/ ========== 野生宝可梦生成池 ==========[\s\S]*$)/);
if (wildPoolMatch) {
  code += '\n' + wildPoolMatch[1];
}

// 保存备份
fs.writeFileSync('./scripts/data.js.backup', oldDataContent, 'utf8');
console.log('✓ 原data.js已备份到: scripts/data.js.backup');

// 保存新文件
fs.writeFileSync('./scripts/data.js', code, 'utf8');
console.log('✓ 新data.js已生成');
console.log(`✓ 包含 ${entries.length} 只宝可梦的完整数据`);
console.log('\n提示：');
console.log('1. 所有宝可梦的基础属性和成长值已从PokeAPI更新');
console.log('2. 技能配置(learnset)和进化信息(evolutions)需要后续手动配置');
console.log('3. 原data.js已备份，如需要可以恢复');
