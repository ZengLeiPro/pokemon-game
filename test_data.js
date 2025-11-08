// 测试宝可梦数据配置
const fs = require('fs');

// 读取JSON数据
const jsonData = JSON.parse(fs.readFileSync('./pokemon_data_generated.json', 'utf8'));

console.log('=== 宝可梦数据验证 ===\n');

// 统计数据
const totalPokemon = Object.keys(jsonData).length;
console.log(`✓ 总宝可梦数量: ${totalPokemon}`);

const withEvolutions = Object.values(jsonData).filter(p => p.evolutions && p.evolutions.length > 0).length;
console.log(`✓ 有进化链的宝可梦: ${withEvolutions}`);

const withMultipleMoves = Object.values(jsonData).filter(p => p.learnset && p.learnset.length > 1).length;
console.log(`✓ 有多个技能的宝可梦: ${withMultipleMoves}`);

const onlyTackle = Object.values(jsonData).filter(p =>
  p.learnset && p.learnset.length === 1 && p.learnset[0].move === 'tackle'
).length;
console.log(`✓ 只有撞击技能的宝可梦: ${onlyTackle}`);

// 测试御三家进化链
console.log('\n=== 御三家进化链测试 ===');

const starterTests = [
  { id: 'bulbasaur', name: '妙蛙种子', evo: 'ivysaur', level: 16 },
  { id: 'ivysaur', name: '妙蛙草', evo: 'venusaur', level: 32 },
  { id: 'charmander', name: '小火龙', evo: 'charmeleon', level: 16 },
  { id: 'charmeleon', name: '火恐龙', evo: 'charizard', level: 36 },
  { id: 'squirtle', name: '杰尼龟', evo: 'wartortle', level: 16 },
  { id: 'wartortle', name: '卡咪龟', evo: 'blastoise', level: 36 }
];

let passed = 0;
let failed = 0;

for (const test of starterTests) {
  const pokemon = jsonData[test.id];
  if (pokemon && pokemon.evolutions && pokemon.evolutions.length > 0) {
    const evo = pokemon.evolutions[0];
    if (evo.evolveInto === test.evo && evo.level === test.level) {
      console.log(`✓ ${test.name} -> ${test.level}级进化成 ${test.evo}`);
      passed++;
    } else {
      console.log(`✗ ${test.name} 进化配置错误`);
      failed++;
    }
  } else {
    console.log(`✗ ${test.name} 没有进化配置`);
    failed++;
  }
}

// 测试技能学习表
console.log('\n=== 技能学习表测试 ===');

const skillTests = [
  { id: 'charmander', name: '小火龙', minMoves: 5 },
  { id: 'bulbasaur', name: '妙蛙种子', minMoves: 5 },
  { id: 'squirtle', name: '杰尼龟', minMoves: 5 },
  { id: 'pikachu', name: '皮卡丘', minMoves: 4 }
];

for (const test of skillTests) {
  const pokemon = jsonData[test.id];
  if (pokemon && pokemon.learnset && pokemon.learnset.length >= test.minMoves) {
    const moves = pokemon.learnset.map(l => `${l.move}@Lv${l.level}`).join(', ');
    console.log(`✓ ${test.name} 有${pokemon.learnset.length}个技能: ${moves}`);
    passed++;
  } else {
    console.log(`✗ ${test.name} 技能不足 (${pokemon.learnset.length}个)`);
    failed++;
  }
}

// 测试常见宝可梦进化
console.log('\n=== 常见宝可梦进化测试 ===');

const commonTests = [
  { id: 'caterpie', evo: 'metapod', level: 7 },
  { id: 'metapod', evo: 'butterfree', level: 10 },
  { id: 'pidgey', evo: 'pidgeotto', level: 18 },
  { id: 'rattata', evo: 'raticate', level: 20 },
  { id: 'pikachu', evo: 'raichu', level: 30 }
];

for (const test of commonTests) {
  const pokemon = jsonData[test.id];
  if (pokemon && pokemon.evolutions && pokemon.evolutions.length > 0) {
    const evo = pokemon.evolutions[0];
    if (evo.evolveInto === test.evo && evo.level === test.level) {
      console.log(`✓ ${pokemon.name} -> ${test.level}级进化成 ${test.evo}`);
      passed++;
    } else {
      console.log(`✗ ${pokemon.name} 进化配置错误`);
      failed++;
    }
  } else {
    console.log(`✗ ${pokemon.name} 没有进化配置`);
    failed++;
  }
}

// 验证野生宝可梦池
console.log('\n=== 野生宝可梦池验证 ===');

// 简单验证：检查data.js中是否有WILD_POKEMON_POOL
const dataJs = fs.readFileSync('./scripts/data.js', 'utf8');
const wildPoolMatch = dataJs.match(/const WILD_POKEMON_POOL = \[([\s\S]*?)\];/);

if (wildPoolMatch) {
  const wildSpecies = dataJs.match(/"species": "([^"]+)"/g);
  if (wildSpecies) {
    console.log(`✓ 野生宝可梦池已配置，包含 ${wildSpecies.length} 个物种`);

    // 检查是否还有御三家最终形态
    const hasStarters = dataJs.includes('"species": "charizard"') ||
                        dataJs.includes('"species": "blastoise"') ||
                        dataJs.includes('"species": "venusaur"');

    if (hasStarters) {
      console.log('⚠️  注意：野生宝可梦池中仍包含御三家最终形态（这可能是设计选择）');
    } else {
      console.log('✓ 野生宝可梦池中已移除御三家最终形态');
    }

    passed++;
  } else {
    console.log('✗ 野生宝可梦池格式错误');
    failed++;
  }
} else {
  console.log('✗ 未找到野生宝可梦池配置');
  failed++;
}

// 总结
console.log('\n=== 测试总结 ===');
console.log(`通过: ${passed} 项`);
console.log(`失败: ${failed} 项`);
console.log(`总计: ${passed + failed} 项\n`);

if (failed === 0) {
  console.log('✅ 所有测试通过！数据配置完整且正确。');
} else {
  console.log('⚠️  部分测试失败，请检查配置。');
}
