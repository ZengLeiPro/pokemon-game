import { MOVE_DATA } from './data.js';

// ========== Move类 ==========
export default class Move {
  constructor(moveId) {
    const data = MOVE_DATA[moveId];

    if (!data) {
      throw new Error(`技能数据不存在: ${moveId}`);
    }

    this.id = moveId;
    this.name = data.name;
    this.nameEn = data.nameEn;
    this.type = data.type;
    this.category = data.category;  // 'attack' 或 'support'
    this.power = data.power || 0;
    this.accuracy = data.accuracy || 100;
    this.pp = data.pp || 999;
    this.description = data.description;

    // 辅助技能专属
    if (this.category === 'support') {
      this.effect = data.effect;
    }
  }

  // 获取技能显示信息
  getDisplayInfo() {
    if (this.category === 'attack') {
      return `${this.name}（${this.type}系，威力${this.power}）`;
    } else {
      return `${this.name}（${this.description}）`;
    }
  }
}

export { Move };
