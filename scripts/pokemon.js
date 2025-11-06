// ========== Pokemon类 ==========
class Pokemon {
  constructor(speciesId, level) {
    const data = POKEMON_DATA[speciesId];

    if (!data) {
      throw new Error(`宝可梦数据不存在: ${speciesId}`);
    }

    // 基础信息
    this.speciesId = speciesId;
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;

    // 等级相关
    this.level = level;
    this.exp = EXP_TABLE[level] || 0;
    this.expToNext = this.calculateExpToNext();

    // 计算后的属性（基础值 + 成长值 × (等级-1)）
    this.maxHP = data.baseStats.hp + data.statsGrowth.hp * (level - 1);
    this.currentHP = this.maxHP;
    this.attack = data.baseStats.attack + data.statsGrowth.attack * (level - 1);
    this.defense = data.baseStats.defense + data.statsGrowth.defense * (level - 1);

    // 技能列表（Move对象数组）
    this.moves = this.loadMoves(data.learnset, level);

    // 战斗状态
    this.statModifiers = {
      attack: 0,
      defense: 0
    };
  }

  // ========== 加载技能 ==========
  loadMoves(learnset, currentLevel) {
    const moves = [];

    // 找出当前等级应该会的所有技能
    for (let entry of learnset) {
      if (entry.level <= currentLevel) {
        try {
          const move = new Move(entry.move);
          moves.push(move);
        } catch (error) {
          console.error(`加载技能失败: ${entry.move}`, error);
        }
      }
    }

    // 最多保留4个技能（后学的优先）
    if (moves.length > 4) {
      return moves.slice(-4);
    }

    return moves;
  }

  // ========== 获得经验 ==========
  gainExp(amount) {
    this.exp += amount;
    const levelUpInfo = [];

    // 检查是否升级
    while (this.exp >= EXP_TABLE[this.level + 1] && this.level < 50) {
      const statGains = this.levelUp();
      levelUpInfo.push({
        level: this.level,
        statGains: statGains
      });
    }

    return levelUpInfo;
  }

  // ========== 升级 ==========
  levelUp() {
    // 记录升级前的属性
    const oldMaxHP = this.maxHP;
    const oldAttack = this.attack;
    const oldDefense = this.defense;

    this.level++;

    // 获取成长值
    const data = POKEMON_DATA[this.speciesId];
    const growth = data.statsGrowth;

    // 提升属性
    this.maxHP += growth.hp;
    this.attack += growth.attack;
    this.defense += growth.defense;

    // 升级时HP回满
    this.currentHP = this.maxHP;

    // 重新计算下一级所需经验
    this.expToNext = this.calculateExpToNext();

    // 返回属性提升信息（用于显示）
    const statGains = {
      hp: this.maxHP - oldMaxHP,
      attack: this.attack - oldAttack,
      defense: this.defense - oldDefense,
      newMaxHP: this.maxHP,
      newAttack: this.attack,
      newDefense: this.defense
    };

    // 检查是否学习新技能
    this.checkLearnMove();

    // 检查是否进化
    this.checkEvolution();

    return statGains;
  }

  // ========== 检查学习新技能 ==========
  checkLearnMove() {
    const data = POKEMON_DATA[this.speciesId];
    const learnset = data.learnset;

    // 找到当前等级可以学习的技能
    const newMoves = learnset.filter(entry => entry.level === this.level);

    for (let entry of newMoves) {
      try {
        const move = new Move(entry.move);

        // 如果已经学会了，跳过
        if (this.moves.some(m => m.id === move.id)) {
          continue;
        }

        // 如果技能槽未满（<4个），直接学习
        if (this.moves.length < 4) {
          this.moves.push(move);
          if (typeof UI !== 'undefined') {
            UI.addBattleLog(`${this.name} 学会了 ${move.name}！`, 'success');
          }
        } else {
          // 技能槽已满
          if (typeof UI !== 'undefined') {
            UI.addBattleLog(`${this.name} 想学习 ${move.name}，但技能槽已满！`);
          }
        }
      } catch (error) {
        console.error(`学习技能失败: ${entry.move}`, error);
      }
    }
  }

  // ========== 检查进化 ==========
  checkEvolution() {
    const data = POKEMON_DATA[this.speciesId];

    if (!data.evolutions || data.evolutions.length === 0) {
      return false;
    }

    // 检查是否满足进化条件
    for (let evo of data.evolutions) {
      if (this.level === evo.level) {
        this.evolve(evo.evolveInto);
        return true;
      }
    }

    return false;
  }

  // ========== 进化 ==========
  evolve(newSpeciesId) {
    const oldName = this.name;

    // 更换物种
    this.speciesId = newSpeciesId;
    const newData = POKEMON_DATA[newSpeciesId];

    this.name = newData.name;
    this.type = newData.type;
    this.id = newData.id;

    // 属性提升20%（简化公式）
    this.maxHP = Math.floor(this.maxHP * 1.2);
    this.attack = Math.floor(this.attack * 1.2);
    this.defense = Math.floor(this.defense * 1.2);

    // 进化时HP回满
    this.currentHP = this.maxHP;

    if (typeof UI !== 'undefined') {
      UI.addBattleLog(`\n${oldName} 进化成了 ${this.name}！`, 'critical');
      UI.addBattleLog(`属性大幅提升！HP: ${this.maxHP}, 攻击: ${this.attack}, 防御: ${this.defense}`, 'success');
    }

    // 检查是否学习进化技能
    this.checkLearnMove();
  }

  // ========== 计算升级所需经验 ==========
  calculateExpToNext() {
    if (this.level >= 50) return 999999;
    if (!EXP_TABLE[this.level + 1]) return 999999;
    return EXP_TABLE[this.level + 1] - this.exp;
  }

  // ========== 战斗后回血 ==========
  fullHeal() {
    this.currentHP = this.maxHP;
  }
}
