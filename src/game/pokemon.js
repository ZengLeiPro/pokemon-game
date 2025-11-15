import { POKEMON_DATA, EXP_TABLE } from './data.js';
import Move from './move.js';

export default class Pokemon {
  constructor(speciesId, level) {
    const data = POKEMON_DATA[speciesId];

    if (!data) {
      throw new Error(`宝可梦数据不存在: ${speciesId}`);
    }

    this.speciesId = speciesId;
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;

    this.level = level;
    this.exp = EXP_TABLE[level] || 0;
    this.expToNext = this.calculateExpToNext();

    this.maxHP = data.baseStats.hp + data.statsGrowth.hp * (level - 1);
    this.currentHP = this.maxHP;
    this.attack = data.baseStats.attack + data.statsGrowth.attack * (level - 1);
    this.defense = data.baseStats.defense + data.statsGrowth.defense * (level - 1);
    this.speed = data.baseStats.speed + data.statsGrowth.speed * (level - 1);

    this.moves = this.loadMoves(data.learnset, level);

    this.statModifiers = {
      attack: 0,
      defense: 0,
    };

    this.notifications = [];
  }

  loadMoves(learnset, currentLevel) {
    const moves = [];
    for (const entry of learnset) {
      if (entry.level <= currentLevel) {
        try {
          const move = new Move(entry.move);
          moves.push(move);
        } catch (error) {
          console.error(`加载技能失败: ${entry.move}`, error);
        }
      }
    }
    if (moves.length > 4) {
      return moves.slice(-4);
    }
    return moves;
  }

  gainExp(amount) {
    this.exp += amount;
    const levelUpInfo = [];

    while (this.exp >= (EXP_TABLE[this.level + 1] || Infinity) && this.level < 50) {
      const statGains = this.levelUp();
      levelUpInfo.push({
        level: this.level,
        statGains,
      });
    }

    return levelUpInfo;
  }

  levelUp() {
    const oldMaxHP = this.maxHP;
    const oldAttack = this.attack;
    const oldDefense = this.defense;
    const oldSpeed = this.speed;

    this.level += 1;

    const data = POKEMON_DATA[this.speciesId];
    const growth = data.statsGrowth;

    this.maxHP += growth.hp;
    this.attack += growth.attack;
    this.defense += growth.defense;
    this.speed += growth.speed;

    this.currentHP = this.maxHP;
    this.expToNext = this.calculateExpToNext();

    const statGains = {
      hp: this.maxHP - oldMaxHP,
      attack: this.attack - oldAttack,
      defense: this.defense - oldDefense,
      speed: this.speed - oldSpeed,
      newMaxHP: this.maxHP,
      newAttack: this.attack,
      newDefense: this.defense,
      newSpeed: this.speed,
    };

    this.checkLearnMove();
    this.checkEvolution();

    return statGains;
  }

  checkLearnMove() {
    const data = POKEMON_DATA[this.speciesId];
    const learnset = data.learnset;
    const newMoves = learnset.filter((entry) => entry.level === this.level);

    for (const entry of newMoves) {
      try {
        const move = new Move(entry.move);
        if (this.moves.some((m) => m.id === move.id)) {
          continue;
        }
        if (this.moves.length < 4) {
          this.moves.push(move);
          this.notifications.push(`${this.name} 学会了 ${move.name}！`);
        } else {
          this.notifications.push(`${this.name} 想学习 ${move.name}，但技能槽已满！`);
        }
      } catch (error) {
        console.error(`学习技能失败: ${entry.move}`, error);
      }
    }
  }

  checkEvolution() {
    const data = POKEMON_DATA[this.speciesId];
    if (!data.evolutions || data.evolutions.length === 0) {
      return false;
    }

    for (const evo of data.evolutions) {
      if (this.level === evo.level) {
        this.evolve(evo.evolveInto);
        return true;
      }
    }
    return false;
  }

  evolve(newSpeciesId) {
    const oldName = this.name;

    this.speciesId = newSpeciesId;
    const newData = POKEMON_DATA[newSpeciesId];
    this.name = newData.name;
    this.type = newData.type;
    this.id = newData.id;

    this.maxHP = Math.floor(this.maxHP * 1.2);
    this.attack = Math.floor(this.attack * 1.2);
    this.defense = Math.floor(this.defense * 1.2);
    this.speed = Math.floor(this.speed * 1.2);
    this.currentHP = this.maxHP;

    this.notifications.push(`${oldName} 进化成了 ${this.name}！`);
    this.notifications.push(
      `属性大幅提升！HP: ${this.maxHP}, 攻击: ${this.attack}, 防御: ${this.defense}, 速度: ${this.speed}`,
    );

    this.checkLearnMove();
  }

  calculateExpToNext() {
    if (this.level >= 50) return 999999;
    if (!EXP_TABLE[this.level + 1]) return 999999;
    return EXP_TABLE[this.level + 1] - this.exp;
  }

  fullHeal() {
    this.currentHP = this.maxHP;
  }

  consumeNotifications() {
    const notes = [...this.notifications];
    this.notifications.length = 0;
    return notes;
  }

  clone() {
    const copy = new Pokemon(this.speciesId, this.level);
    copy.exp = this.exp;
    copy.expToNext = this.expToNext;
    copy.maxHP = this.maxHP;
    copy.currentHP = this.currentHP;
    copy.attack = this.attack;
    copy.defense = this.defense;
    copy.speed = this.speed;
    copy.moves = this.moves.map((move) => new Move(move.id));
    copy.statModifiers = { ...this.statModifiers };
    return copy;
  }
}

export { Pokemon };
