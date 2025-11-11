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
    let battleCheck = this.checkBattleEnd();
    if (battleCheck === true) {
      await this.delay(800);
      return this.endBattle();
    } else if (battleCheck === 'force_switch') {
      await this.delay(800);
      return this.forceSwitchPokemon();
    }

    // 等待一段时间再让对方行动
    await this.delay(600);

    // 后攻方行动
    await this.executeMoveWithDelay(secondAttacker, secondDefender, secondMove, secondIsPlayer);

    // 再次检查战斗是否结束
    battleCheck = this.checkBattleEnd();
    if (battleCheck === true) {
      await this.delay(800);
      return this.endBattle();
    } else if (battleCheck === 'force_switch') {
      await this.delay(800);
      return this.forceSwitchPokemon();
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
      // 检查是否还有其他可用的宝可梦
      if (hasAlivePokemon()) {
        this.winner = null; // 还没结束
        return 'force_switch'; // 返回特殊值表示需要强制切换
      } else {
        this.winner = 'opponent';
        return true;
      }
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

      // 队伍经验共享：其他队伍成员获得一半经验
      const sharedExp = Math.floor(expGained / 2);
      if (sharedExp > 0 && gameState.player.pokemonTeam.length > 1) {
        UI.addBattleLog(`\n队伍其他成员获得共享经验 ${sharedExp} 点！`, 'info');

        gameState.player.pokemonTeam.forEach((pokemon, index) => {
          // 跳过出战的宝可梦（已经获得全部经验）
          if (index === gameState.player.activePokemonIndex) {
            return;
          }

          // 给其他宝可梦分配一半经验
          const teamLevelUpInfo = pokemon.gainExp(sharedExp);

          // 显示升级信息
          if (teamLevelUpInfo.length > 0) {
            for (let info of teamLevelUpInfo) {
              UI.addBattleLog(`\n${pokemon.name} 升到了 Lv.${info.level}！`, 'success');
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
        });
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

        // 失败时扣除金币
        const prizeMoney = this.opponent.prizeMoney;
        deductMoney(prizeMoney);
        UI.addBattleLog(`支付了 ${prizeMoney} 金币给 ${this.opponent.name}！`, 'critical');
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
    document.getElementById('battle-actions').style.display = 'none';
    document.getElementById('battle-item-panel').classList.add('hidden');
    document.getElementById('battle-end-confirm').style.display = 'block';

    return this.winner;
  }

  // ========== 使用伤药 ==========
  async useMedicine(itemId) {
    const item = createItem(itemId);
    if (!item || item.type !== 'medicine') {
      UI.addBattleLog('无效的道具！');
      return false;
    }

    const result = useItem(itemId, this.playerPokemon);
    if (result.success) {
      UI.addBattleLog(result.message, 'success');
      UI.updateBattleStatus(this.playerPokemon, this.opponentPokemon, this.battleType, this.opponent);

      // 使用道具后，对手行动
      await this.delay(500);
      const aiMove = SimpleAI.chooseMove(this.opponentPokemon);
      await this.executeMoveWithDelay(this.opponentPokemon, this.playerPokemon, aiMove, false);

      // 检查战斗是否结束
      if (this.checkBattleEnd()) {
        this.endBattle();
        return true;
      }

      UI.updateBattleStatus(this.playerPokemon, this.opponentPokemon, this.battleType, this.opponent);
      return true;
    } else {
      UI.addBattleLog(result.message, 'error');
      return false;
    }
  }

  // ========== 投精灵球 ==========
  async throwPokeball(itemId) {
    const item = createItem(itemId);
    if (!item || item.type !== 'pokeball') {
      UI.addBattleLog('无效的道具！');
      return false;
    }

    // 只能在野生战斗中使用
    if (this.battleType !== 'wild') {
      UI.addBattleLog('不能捕捉训练家的宝可梦！', 'error');
      return false;
    }

    // 消耗精灵球
    if (!removeItem(itemId, 1)) {
      UI.addBattleLog('没有精灵球了！', 'error');
      return false;
    }

    UI.addBattleLog(`使用了 ${item.name}！`);
    await this.delay(500);

    // 计算捕捉率
    const catchRate = this.calculateCatchRate(item.effect.catchRate);
    const success = Math.random() < catchRate;

    // 显示摇晃动画
    UI.addBattleLog('精灵球晃动了一下...');
    await this.delay(800);
    UI.addBattleLog('精灵球晃动了两下...');
    await this.delay(800);

    if (success) {
      // 捕捉成功
      UI.addBattleLog('咔哒！捕捉成功！', 'success');
      UI.addBattleLog(`成功捕获了 ${this.opponentPokemon.name}！`, 'critical');

      // 添加到盒子（如果队伍满了）
      if (gameState.player.pokemonTeam.length < 6) {
        addPokemonToTeam(this.opponentPokemon);
        UI.addBattleLog(`${this.opponentPokemon.name} 加入了你的队伍！`, 'success');
      } else {
        addPokemonToBox(this.opponentPokemon);
        UI.addBattleLog(`${this.opponentPokemon.name} 已传送到宝可梦中心！`, 'success');
      }

      // 战斗结束
      this.winner = 'player';
      this.isActive = false;

      // 更新战绩
      gameState.player.battlesWon++;
      gameState.player.totalBattles++;

      // 保存游戏
      saveGame();

      // 更新UI
      UI.updatePlayerStatus(getCurrentPokemon());
      UI.updateStats(gameState.player.battlesWon, gameState.player.totalBattles);

      // 保存胜负结果到 gameState
      gameState.battle.lastWinner = this.winner;

      // 隐藏技能按钮，显示确认按钮
      document.getElementById('battle-actions').style.display = 'none';
      document.getElementById('battle-item-panel').classList.add('hidden');
      document.getElementById('battle-end-confirm').style.display = 'block';

      return true;
    } else {
      // 捕捉失败
      UI.addBattleLog(`哦不！${this.opponentPokemon.name} 挣脱了！`);

      // 对手行动
      await this.delay(500);
      const aiMove = SimpleAI.chooseMove(this.opponentPokemon);
      await this.executeMoveWithDelay(this.opponentPokemon, this.playerPokemon, aiMove, false);

      // 检查战斗是否结束
      if (this.checkBattleEnd()) {
        this.endBattle();
        return true;
      }

      UI.updateBattleStatus(this.playerPokemon, this.opponentPokemon, this.battleType, this.opponent);
      return false;
    }
  }

  // ========== 计算捕捉率 ==========
  calculateCatchRate(ballMultiplier) {
    const wildPokemon = this.opponentPokemon;

    // HP因素：HP越低越容易捕捉
    const hpFactor = (wildPokemon.maxHP * 3 - wildPokemon.currentHP * 2) / (wildPokemon.maxHP * 3);

    // 等级因素：等级越低越容易捕捉
    const levelFactor = Math.max(0, (50 - wildPokemon.level) / 50);

    // 基础捕捉率
    let catchRate = (hpFactor * 0.6 + levelFactor * 0.4) * ballMultiplier;

    // 确保捕捉率在合理范围内
    catchRate = Math.max(0.05, Math.min(0.95, catchRate));

    // 大师球必定成功
    if (ballMultiplier >= 255) {
      catchRate = 1.0;
    }

    console.log(`捕捉率计算: HP=${wildPokemon.currentHP}/${wildPokemon.maxHP}, Lv=${wildPokemon.level}, 球倍率=${ballMultiplier}, 最终捕捉率=${(catchRate * 100).toFixed(1)}%`);

    return catchRate;
  }

  // ========== 逃跑 ==========
  flee() {
    if (this.battleType === 'trainer') {
      UI.addBattleLog('不能从训练家对战中逃跑！', 'error');
      return false;
    }

    UI.addBattleLog('成功逃跑了！');
    this.winner = 'flee';
    this.isActive = false;

    // 更新战绩（逃跑算输）
    gameState.player.totalBattles++;

    // 保存游戏
    saveGame();

    // 更新UI
    UI.updateStats(gameState.player.battlesWon, gameState.player.totalBattles);

    // 隐藏技能按钮，显示确认按钮
    document.getElementById('battle-actions').style.display = 'none';
    document.getElementById('battle-item-panel').classList.add('hidden');
    document.getElementById('battle-switch-panel').classList.add('hidden');
    document.getElementById('battle-end-confirm').style.display = 'block';

    return true;
  }

  // ========== 战斗中切换宝可梦 ==========
  async switchPokemon(newIndex) {
    const oldPokemon = this.playerPokemon;
    const newPokemon = gameState.player.pokemonTeam[newIndex];

    if (!newPokemon) {
      UI.addBattleLog('无效的宝可梦！', 'error');
      return false;
    }

    if (newPokemon.currentHP <= 0) {
      UI.addBattleLog(`${newPokemon.name} 已经倒下了！`, 'error');
      return false;
    }

    // 切换出战宝可梦
    switchActivePokemon(newIndex);
    this.playerPokemon = newPokemon;

    UI.addBattleLog(`\n回来吧，${oldPokemon.name}！`);
    await this.delay(500);
    UI.addBattleLog(`上吧，${newPokemon.name}！`, 'success');
    await this.delay(500);

    // 重置新宝可梦的能力等级变化
    newPokemon.statModifiers = { attack: 0, defense: 0 };

    // 更新战斗界面
    UI.updateBattleStatus(this.playerPokemon, this.opponentPokemon, this.battleType, this.opponent);
    UI.createMoveButtons(newPokemon.moves, (move) => onPlayerMoveSelected(move));

    // 对手行动（切换是一回合的行动）
    await this.delay(500);
    const aiMove = SimpleAI.chooseMove(this.opponentPokemon);
    await this.executeMoveWithDelay(this.opponentPokemon, this.playerPokemon, aiMove, false);

    // 检查战斗是否结束
    const battleCheck = this.checkBattleEnd();
    if (battleCheck === true) {
      await this.delay(800);
      this.endBattle();
      return true;
    } else if (battleCheck === 'force_switch') {
      await this.delay(800);
      return this.forceSwitchPokemon();
    }

    UI.updateBattleStatus(this.playerPokemon, this.opponentPokemon, this.battleType, this.opponent);
    return true;
  }

  // ========== 强制切换宝可梦（当前宝可梦倒下时） ==========
  async forceSwitchPokemon() {
    UI.addBattleLog(`\n你的 ${this.playerPokemon.name} 倒下了！`, 'critical');
    await this.delay(800);
    UI.addBattleLog(`请选择下一只宝可梦！`, 'critical');

    // 禁用技能按钮
    UI.setMoveButtonsEnabled(false);

    // 隐藏战斗操作按钮
    document.getElementById('battle-actions').style.display = 'none';

    // 显示切换面板（只显示可用的宝可梦）
    UI.renderBattleSwitchListForced();
    document.getElementById('battle-switch-panel').classList.remove('hidden');

    // 战斗暂停，等待玩家选择
    return 'waiting_for_switch';
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
