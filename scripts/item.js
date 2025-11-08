// item.js - 道具系统
// 定义道具类和道具数据

class Item {
    constructor(id, name, type, effect, price, description) {
        this.id = id;
        this.name = name;
        this.type = type; // "medicine" 或 "pokeball"
        this.effect = effect; // { heal: 20 } 或 { catchRate: 1.0 }
        this.price = price;
        this.description = description;
    }

    /**
     * 使用道具
     * @param {Pokemon} target - 目标宝可梦
     * @returns {Object} 使用结果 { success: boolean, message: string, healAmount?: number }
     */
    use(target) {
        if (this.type === 'medicine') {
            return this.useMedicine(target);
        } else if (this.type === 'pokeball') {
            // 精灵球的使用在战斗系统中处理
            return { success: true, message: `使用了${this.name}！` };
        }
        return { success: false, message: '无法使用该道具' };
    }

    /**
     * 使用药品
     * @param {Pokemon} target - 目标宝可梦
     * @returns {Object} 使用结果
     */
    useMedicine(target) {
        if (!target) {
            return { success: false, message: '没有目标宝可梦' };
        }

        if (target.currentHP >= target.maxHP) {
            return { success: false, message: `${target.name}的HP已经满了！` };
        }

        const healAmount = Math.min(this.effect.heal, target.maxHP - target.currentHP);
        target.currentHP += healAmount;
        target.currentHP = Math.min(target.currentHP, target.maxHP);

        return {
            success: true,
            message: `${target.name}恢复了${healAmount}HP！`,
            healAmount: healAmount
        };
    }
}

// 道具数据库
const ITEM_DATA = {
    // 伤药系列
    "potion": {
        "id": "potion",
        "name": "伤药",
        "type": "medicine",
        "effect": { "heal": 20 },
        "price": 300,
        "description": "恢复20HP的喷雾式药水",
        "icon": "💊"
    },
    "superPotion": {
        "id": "superPotion",
        "name": "好伤药",
        "type": "medicine",
        "effect": { "heal": 50 },
        "price": 700,
        "description": "恢复50HP的喷雾式药水",
        "icon": "💉"
    },
    "hyperPotion": {
        "id": "hyperPotion",
        "name": "超级伤药",
        "type": "medicine",
        "effect": { "heal": 200 },
        "price": 1200,
        "description": "恢复200HP的喷雾式药水",
        "icon": "🏥"
    },
    "maxPotion": {
        "id": "maxPotion",
        "name": "全满药",
        "type": "medicine",
        "effect": { "heal": 9999 },
        "price": 2500,
        "description": "完全恢复HP的喷雾式药水",
        "icon": "✨"
    },

    // 精灵球系列
    "pokeball": {
        "id": "pokeball",
        "name": "精灵球",
        "type": "pokeball",
        "effect": { "catchRate": 1.0 },
        "price": 200,
        "description": "用于捕捉野生宝可梦的球",
        "icon": "⚪"
    },
    "greatball": {
        "id": "greatball",
        "name": "超级球",
        "type": "pokeball",
        "effect": { "catchRate": 1.5 },
        "price": 600,
        "description": "比精灵球更容易捕捉的球",
        "icon": "🔵"
    },
    "ultraball": {
        "id": "ultraball",
        "name": "高级球",
        "type": "pokeball",
        "effect": { "catchRate": 2.0 },
        "price": 1200,
        "description": "性能非常好的球",
        "icon": "🟡"
    },
    "masterball": {
        "id": "masterball",
        "name": "大师球",
        "type": "pokeball",
        "effect": { "catchRate": 255.0 },
        "price": 99999,
        "description": "必定能捕捉到宝可梦的最强的球",
        "icon": "🟣"
    }
};

/**
 * 创建道具实例
 * @param {string} itemId - 道具ID
 * @returns {Item} 道具实例
 */
function createItem(itemId) {
    const data = ITEM_DATA[itemId];
    if (!data) {
        console.error(`未找到道具: ${itemId}`);
        return null;
    }
    return new Item(data.id, data.name, data.type, data.effect, data.price, data.description);
}

/**
 * 获取所有药品
 * @returns {Array} 药品列表
 */
function getMedicineItems() {
    return Object.values(ITEM_DATA).filter(item => item.type === 'medicine');
}

/**
 * 获取所有精灵球
 * @returns {Array} 精灵球列表
 */
function getPokeballItems() {
    return Object.values(ITEM_DATA).filter(item => item.type === 'pokeball');
}

/**
 * 获取所有商店可购买的道具
 * @returns {Array} 商店道具列表
 */
function getShopItems() {
    // 排除大师球（太贵，不在普通商店出售）
    return Object.values(ITEM_DATA).filter(item => item.id !== 'masterball');
}
