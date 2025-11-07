// ========== Battle类 ==========
class Battle {
  constructor(playerPokemon, opponent, battleType = 'wild') {
    this.playerPokemon = playerPokemon;
    this.opponent = opponent;  // 可以是野生宝可梦或训练家
    this.battleType = battleType;  // 'wild' 或 'trainer'
    this.turn = 0;
    this.isActive = true;
    this.winner = null;

    // 获取对手的宝可梦
    if (battleType === 'trainer') {
      this.opponentPokemon = opponent.pokemon;
    } else {
      this.opponentPokemon = opponent;
    }
  }

  // ========== 开始战斗 ==========
  start() {
    this.turn = 0;
    this.isActive = true;
    this.winner = null;

    // 重置能力等级变化（战斗开始时清零）
    this.playerPokemon.statModifiers = { attack: 0, defense: 0 };
    this.opponentPokemon.statModifiers = { attack: 0, defense: 0 };

    // 显示遭遇文字
    UI.clearBattleLog();

    if (this.battleType === 'trainer') {
      // 训练家对战
      UI.addBattleLog(this.opponent.getIntroduction());
      UI.addBattleLog(`${this.opponent.name} 派出了 ${this.opponentPokemon.name} Lv.${this.opponentPokemon.level}！`);
    } else {
      // 野生宝可梦对战
      UI.addBattleLog(`野生的 ${this.opponentPokemon.name} Lv.${this.opponentPokemon.level} 出现了！`);
    }

    UI.addBattleLog(`你的 ${this.playerPokemon.name} Lv.${this.playerPokemon.level} 准备战斗！`);
    UI.updateBattleStatus(this.playerPokemon, this.opponentPokemon, this.battleType, this.opponent);
  }

  // ========== 执行回合 ==========
  async executeTurn(playerMove, aiMove) {
    this.turn++;
    UI.addBattleLog(`\n--- 第 ${this.turn} 回合 ---`);

    // 等待一小段时间
    await this.delay(300);

    // 决定行动顺序（根据速度判断谁先攻击）
    let firstAttacker, firstDefender, firstMove, firstIsPlayer;
    let secondAttacker, secondDefender, secondMove, secondIsPlayer;

    // 比较速度
    if (this.playerPokemon.speed > this.opponentPokemon.speed) {
      // 玩家速度更快，玩家先攻
      firstAttacker = this.playerPokemon;
      firstDefender = this.opponentPokemon;
      firstMove = playerMove;
      firstIsPlayer = true;
      secondAttacker = this.opponentPokemon;
      secondDefender = this.playerPokemon;
      secondMove = aiMove;
      secondIsPlayer = false;
    } else if (this.playerPokemon.speed < this.opponentPokemon.speed) {
      // 对手速度更快，对手先攻
      firstAttacker = this.opponentPokemon;
      firstDefender = this.playerPokemon;
      firstMove = aiMove;
      firstIsPlayer = false;
      secondAttacker = this.playerPokemon;
      secondDefender = this.opponentPokemon;
      secondMove = playerMove;
      secondIsPlayer = true;
    } else {
      // 速度相同，随机决定
      if (Math.random() < 0.5) {
        firstAttacker = this.playerPokemon;
        firstDefender = this.opponentPokemon;
        firstMove = playerMove;
        firstIsPlayer = true;
        secondAttacker = this.opponentPokemon;
        secondDefender = this.playerPokemon;
        secondMove = aiMove;
        secondIsPlayer = false;
      } else {
        firstAttacker = this.opponentPokemon;
        firstDefender = this.playerPokemon;
        firstMove = aiMove;
        firstIsPlayer = false;
        secondAttacker = this.playerPokemon;
        secondDefender = this.opponentPokemon;
        secondMove = playerMove;
        secondIsPlayer = true;
      }
    }

    // 先攻方行动
    await this.executeMoveWithDelay(firstAttacker, firstDefender, firstMove, firstIsPlayer);

    // 检查战斗是否结束
    if (this.checkBattleEnd()) {
      await this.delay(800);
      return this.endBattle();
    }

    // 等待一段时间再让对方行动
    await this.delay(600);

    // 后攻方行动
    await this.executeMoveWithDelay(secondAttacker, secondDefender, secondMove, secondIsPlayer);

    // 再次检查战斗是否结束
    if (this.checkBattleEnd()) {
      await this.delay(800);
      return this.endBattle();
    }

    // 更新UI
    await this.delay(400);
    UI.updateBattleStatus(this.playerPokemon, this.opponentPokemon, this.battleType, this.opponent);
  }

  // ========== 延迟函数 ==========
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ========== 带延迟的技能执行 ==========
  async executeMoveWithDelay(attacker, defender, move, isPlayer) {
    let attackerName;
    if (isPlayer) {
      attackerName = `你的 ${attacker.name}`;
    } else {
      // 根据战斗类型显示不同的名称
      if (this.battleType === 'trainer') {
        attackerName = `${this.opponent.name}的 ${attacker.name}`;
      } else {
        attackerName = `野生的 ${attacker.name}`;
      }
    }

    UI.addBattleLog(`${attackerName} 使用了 ${move.name}！`);

    // 等待技能动画时间
    await this.delay(500);

    if (move.category === 'attack') {
      // 攻击技能
      this.executeAttackMove(attacker, defender, move, isPlayer);
      // 等待伤害显示
      await this.delay(400);
      // 更新HP显示
      UI.updateBattleStatus(this.playerPokemon, this.opponentPokemon, this.battleType, this.opponent);
      await this.delay(300);
    } else if (move.category === 'support') {
      // 辅助技能
      this.executeSupportMove(attacker, defender, move, isPlayer);
      await this.delay(400);
    }
  }

  // ========== 执行单个技能 ==========
  executeMove(attacker, defender, move, isPlayer) {
    let attackerName;
    if (isPlayer) {
      attackerName = `你的 ${attacker.name}`;
    } else {
      if (this.battleType === 'trainer') {
        attackerName = `${this.opponent.name}的 ${attacker.name}`;
      } else {
        attackerName = `野生的 ${attacker.name}`;
      }
    }

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
    let defenderName;
    if (isPlayer) {
      // 玩家攻击，防守方是对手
      if (this.battleType === 'trainer') {
        defenderName = `${this.opponent.name}的 ${defender.name}`;
      } else {
        defenderName = `野生的 ${defender.name}`;
      }
    } else {
      // 对手攻击，防守方是玩家
      defenderName = `你的 ${defender.name}`;
    }
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
    if (this.opponentPokemon.currentHP <= 0) {
      this.winner = 'player';
      return true;
    }

    if (this.playerPokemon.currentHP <= 0) {
      this.winner = 'opponent';
      return true;
    }

    return false;
  }

  // ========== 战斗结束处理 ==========
  endBattle() {
    this.isActive = false;

    if (this.winner === 'player') {
      // 玩家胜利
      if (this.battleType === 'trainer') {
        // 训练家对战胜利
        UI.addBattleLog(`\n${this.opponent.name}的 ${this.opponentPokemon.name} 倒下了！`, 'success');
        UI.addBattleLog(this.opponent.getDefeatMessage());
        UI.addBattleLog(`战斗胜利！`, 'success');

        // 标记训练家为已击败
        this.opponent.markDefeated();

        // 获得奖金
        const prizeMoney = this.opponent.prizeMoney;
        addMoney(prizeMoney);
        UI.addBattleLog(`获得了 ${prizeMoney} 金币！`, 'critical');
        gameState.player.trainerDefeats++;
      } else {
        // 野生宝可梦对战胜利
        UI.addBattleLog(`\n野生的 ${this.opponentPokemon.name} 倒下了！`, 'success');
        UI.addBattleLog(`战斗胜利！`, 'success');
      }

      // 计算经验值
      const expGained = this.opponentPokemon.level * 5;
      UI.addBattleLog(`获得 ${expGained} 点经验！`, 'success');

      // 加经验（可能会升级）
      const levelUpInfo = this.playerPokemon.gainExp(expGained);

      // 显示每次升级的详细信息（包含速度属性）
      if (levelUpInfo.length > 0) {
        for (let info of levelUpInfo) {
          UI.addBattleLog(`\n${this.playerPokemon.name} 升到了 Lv.${info.level}！`, 'success');
          const gains = info.statGains;
          UI.addBattleLog(
            `HP +${gains.hp} (${gains.newMaxHP})，` +
            `攻击 +${gains.attack} (${gains.newAttack})，` +
            `防御 +${gains.defense} (${gains.newDefense})，` +
            `速度 +${gains.speed} (${gains.newSpeed})`,
            'success'
          );
        }
      }

      // 战后自动回血
      this.playerPokemon.currentHP = this.playerPokemon.maxHP;
      UI.addBattleLog(`\n战斗结束！你的 ${this.playerPokemon.name} HP已完全恢复至 ${this.playerPokemon.maxHP}/${this.playerPokemon.maxHP}！`, 'success');

      // 更新战绩
      gameState.player.battlesWon++;
      gameState.player.totalBattles++;

    } else {
      // 玩家失败
      UI.addBattleLog(`\n你的 ${this.playerPokemon.name} 倒下了！`, 'critical');

      if (this.battleType === 'trainer') {
        UI.addBattleLog(`${this.opponent.name}: 再继续努力吧！`);
      }

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
    UI.updateMoney(gameState.player.money);

    // 保存胜负结果到 gameState，供确认按钮使用
    gameState.battle.lastWinner = this.winner;

    // 隐藏技能按钮，显示确认按钮
    document.getElementById('move-buttons').style.display = 'none';
    document.getElementById('battle-end-confirm').style.display = 'block';

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
