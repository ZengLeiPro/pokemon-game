// ========== Battle类 ==========
class Battle {
  constructor(playerPokemon, wildPokemon) {
    this.playerPokemon = playerPokemon;
    this.wildPokemon = wildPokemon;
    this.turn = 0;
    this.isActive = true;
    this.winner = null;
  }

  // ========== 开始战斗 ==========
  start() {
    this.turn = 0;
    this.isActive = true;
    this.winner = null;

    // 重置能力等级变化（战斗开始时清零）
    this.playerPokemon.statModifiers = { attack: 0, defense: 0 };
    this.wildPokemon.statModifiers = { attack: 0, defense: 0 };

    // 显示遭遇文字
    UI.clearBattleLog();
    UI.addBattleLog(`野生的 ${this.wildPokemon.name} Lv.${this.wildPokemon.level} 出现了！`);
    UI.addBattleLog(`你的 ${this.playerPokemon.name} Lv.${this.playerPokemon.level} 准备战斗！`);
    UI.updateBattleStatus(this.playerPokemon, this.wildPokemon);
  }

  // ========== 执行回合 ==========
  executeTurn(playerMove, aiMove) {
    this.turn++;
    UI.addBattleLog(`\n--- 第 ${this.turn} 回合 ---`);

    // 决定行动顺序（简化版：玩家先攻）
    // 先攻方行动
    this.executeMove(this.playerPokemon, this.wildPokemon, playerMove, true);

    // 检查战斗是否结束
    if (this.checkBattleEnd()) {
      return this.endBattle();
    }

    // 后攻方行动
    this.executeMove(this.wildPokemon, this.playerPokemon, aiMove, false);

    // 再次检查战斗是否结束
    if (this.checkBattleEnd()) {
      return this.endBattle();
    }

    // 更新UI
    UI.updateBattleStatus(this.playerPokemon, this.wildPokemon);
  }

  // ========== 执行单个技能 ==========
  executeMove(attacker, defender, move, isPlayer) {
    const attackerName = isPlayer ?
      `你的 ${attacker.name}` : `野生的 ${attacker.name}`;

    UI.addBattleLog(`${attackerName} 使用了 ${move.name}！`);

    if (move.category === 'attack') {
      // 攻击技能
      this.executeAttackMove(attacker, defender, move, isPlayer);
    } else if (move.category === 'support') {
      // 辅助技能
      this.executeSupportMove(attacker, defender, move, isPlayer);
    }
  }

  // ========== 执行攻击技能 ==========
  executeAttackMove(attacker, defender, move, isPlayer) {
    // 1. 计算基础伤害
    const attackStat = this.getModifiedStat(attacker, 'attack');
    const defenseStat = this.getModifiedStat(defender, 'defense');

    let baseDamage = (attackStat * move.power) / defenseStat;

    // 2. 属性克制倍数
    const typeMultiplier = this.getTypeEffectiveness(move.type, defender.type);

    // 3. 随机系数（0.85 - 1.0）
    const randomFactor = 0.85 + Math.random() * 0.15;

    // 4. 最终伤害（向下取整，最少1点）
    let finalDamage = Math.floor(baseDamage * typeMultiplier * randomFactor);
    finalDamage = Math.max(1, finalDamage);

    // 5. 应用伤害
    defender.currentHP -= finalDamage;
    defender.currentHP = Math.max(0, defender.currentHP);

    // 6. 显示伤害信息
    if (typeMultiplier === 2.0) {
      UI.addBattleLog(`效果绝佳！造成 ${finalDamage} 点伤害！`, 'critical');
    } else if (typeMultiplier === 0.5) {
      UI.addBattleLog(`效果不好...造成 ${finalDamage} 点伤害`, '');
    } else if (typeMultiplier === 0.0) {
      UI.addBattleLog(`对 ${defender.name} 无效！`, '');
      return;
    } else {
      UI.addBattleLog(`造成 ${finalDamage} 点伤害！`);
    }

    // 7. 显示剩余HP
    const defenderName = isPlayer ?
      `野生的 ${defender.name}` : `你的 ${defender.name}`;
    UI.addBattleLog(`${defenderName} 剩余 HP: ${defender.currentHP}/${defender.maxHP}`);
  }

  // ========== 执行辅助技能 ==========
  executeSupportMove(user, opponent, move, isPlayer) {
    const effect = move.effect;
    const target = effect.target === 'self' ? user : opponent;

    // 应用能力变化
    const oldValue = target.statModifiers[effect.stat];
    target.statModifiers[effect.stat] += effect.modifier;

    // 限制范围在-6到+6
    target.statModifiers[effect.stat] = Math.max(-6,
      Math.min(6, target.statModifiers[effect.stat]));

    const actualChange = target.statModifiers[effect.stat] - oldValue;

    if (actualChange === 0) {
      UI.addBattleLog(`但是没有效果！`);
      return;
    }

    // 显示变化信息
    const targetName = (target === this.playerPokemon) ?
      `你的 ${target.name}` : `野生的 ${target.name}`;

    const statName = effect.stat === 'attack' ? '攻击' : '防御';

    if (actualChange > 0) {
      UI.addBattleLog(`${targetName} 的 ${statName} 提升了！`, 'success');
    } else {
      UI.addBattleLog(`${targetName} 的 ${statName} 降低了！`);
    }
  }

  // ========== 获取修正后的属性 ==========
  getModifiedStat(pokemon, statName) {
    const baseValue = pokemon[statName];
    const modifier = pokemon.statModifiers[statName] || 0;

    // 能力等级对应的倍率
    const multipliers = {
      '-6': 0.25, '-5': 0.28, '-4': 0.33, '-3': 0.4, '-2': 0.5, '-1': 0.66,
      '0': 1.0,
      '1': 1.5, '2': 2.0, '3': 2.5, '4': 3.0, '5': 3.5, '6': 4.0
    };

    return Math.floor(baseValue * multipliers[modifier.toString()]);
  }

  // ========== 属性克制查询 ==========
  getTypeEffectiveness(attackType, defenderTypes) {
    let multiplier = 1.0;

    // 遍历防御方的每个属性
    for (let defType of defenderTypes) {
      if (TYPE_CHART[attackType] && TYPE_CHART[attackType][defType] !== undefined) {
        multiplier *= TYPE_CHART[attackType][defType];
      }
    }

    return multiplier;
  }

  // ========== 检查战斗是否结束 ==========
  checkBattleEnd() {
    if (this.wildPokemon.currentHP <= 0) {
      this.winner = 'player';
      return true;
    }

    if (this.playerPokemon.currentHP <= 0) {
      this.winner = 'wild';
      return true;
    }

    return false;
  }

  // ========== 战斗结束处理 ==========
  endBattle() {
    this.isActive = false;

    if (this.winner === 'player') {
      UI.addBattleLog(`\n野生的 ${this.wildPokemon.name} 倒下了！`, 'success');
      UI.addBattleLog(`战斗胜利！`, 'success');

      // 计算经验值
      const expGained = this.wildPokemon.level * 5;
      UI.addBattleLog(`获得 ${expGained} 点经验！`, 'success');

      // 加经验（可能会升级）
      const leveledUp = this.playerPokemon.gainExp(expGained);

      if (leveledUp) {
        UI.addBattleLog(`\n${this.playerPokemon.name} 升到了 Lv.${this.playerPokemon.level}！`, 'success');
        const growth = POKEMON_DATA[this.playerPokemon.speciesId].statsGrowth;
        UI.addBattleLog(`HP+${growth.hp}，攻击+${growth.attack}，防御+${growth.defense}！`);
      }

      // 战后自动回血
      this.playerPokemon.currentHP = this.playerPokemon.maxHP;
      UI.addBattleLog(`\n战斗结束！你的 ${this.playerPokemon.name} HP已完全恢复至 ${this.playerPokemon.maxHP}/${this.playerPokemon.maxHP}！`, 'success');

      // 更新战绩
      gameState.player.battlesWon++;
      gameState.player.totalBattles++;

    } else {
      UI.addBattleLog(`\n你的 ${this.playerPokemon.name} 倒下了！`, 'critical');
      UI.addBattleLog(`战斗失败！`);

      // 失败也回血
      this.playerPokemon.currentHP = this.playerPokemon.maxHP;
      UI.addBattleLog(`\n战斗结束！你的 ${this.playerPokemon.name} HP已完全恢复至 ${this.playerPokemon.maxHP}/${this.playerPokemon.maxHP}！`);

      // 更新战绩
      gameState.player.totalBattles++;
    }

    // 保存游戏
    saveGame();

    // 更新UI
    UI.updatePlayerStatus(this.playerPokemon);
    UI.updateStats(gameState.player.battlesWon, gameState.player.totalBattles);

    // 3秒后返回主界面
    setTimeout(() => {
      UI.showScreen('main-screen');
      UI.showMessage('准备开始下一场战斗！');
      gameState.battle.isActive = false;
    }, 3000);

    return this.winner;
  }
}

// ========== Simple AI系统 ==========
class SimpleAI {
  // 选择一个随机技能
  static chooseMove(pokemon) {
    const moves = pokemon.moves;
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  }
}

// ========== 野生宝可梦生成函数 ==========
function generateWildPokemon(playerLevel) {
  // 1. 确定等级范围（玩家等级±2）
  const minLevel = Math.max(1, playerLevel - 2);
  const maxLevel = Math.min(50, playerLevel + 2);

  // 2. 筛选符合等级范围的宝可梦
  const availablePool = WILD_POKEMON_POOL.filter(entry => {
    return entry.maxLevel >= minLevel && entry.minLevel <= maxLevel;
  });

  if (availablePool.length === 0) {
    // 如果没有符合的，默认生成一只小拉达
    return new Pokemon('rattata', playerLevel);
  }

  // 3. 加权随机选择
  const totalWeight = availablePool.reduce((sum, entry) => sum + entry.weight, 0);
  let random = Math.random() * totalWeight;

  for (let entry of availablePool) {
    random -= entry.weight;
    if (random <= 0) {
      // 4. 随机一个具体等级
      const wildLevel = minLevel + Math.floor(Math.random() * (maxLevel - minLevel + 1));

      // 5. 创建宝可梦实例
      return new Pokemon(entry.species, wildLevel);
    }
  }

  // 兜底
  return new Pokemon('rattata', playerLevel);
}
