import { TYPE_CHART } from './data.js';

const STAT_LABEL = {
  attack: '攻击',
  defense: '防御',
};

function stageMultiplier(stage) {
  if (stage >= 0) {
    return (2 + stage) / 2;
  }
  return 2 / (2 - stage);
}

function getTypeModifier(moveType, defenderTypes) {
  if (!defenderTypes || defenderTypes.length === 0) {
    return 1;
  }
  const chart = TYPE_CHART[moveType];
  if (!chart) {
    return 1;
  }
  return defenderTypes.reduce((multiplier, type) => multiplier * (chart[type] ?? 1), 1);
}

function calculateDamage(attacker, defender, move) {
  const attackStage = attacker.statModifiers?.attack ?? 0;
  const defenseStage = defender.statModifiers?.defense ?? 0;
  const attackStat = Math.max(1, attacker.attack * stageMultiplier(attackStage));
  const defenseStat = Math.max(1, defender.defense * stageMultiplier(defenseStage));

  const basePower = move.power ?? 0;
  if (basePower <= 0) {
    return { damage: 0, modifier: 1 };
  }

  const typeModifier = getTypeModifier(move.type, defender.type);
  if (typeModifier === 0) {
    return { damage: 0, modifier: 0 };
  }

  const randomFactor = 0.85 + Math.random() * 0.15;
  const rawDamage = ((attackStat / defenseStat) * basePower * randomFactor) / 10;
  const damage = Math.max(1, Math.floor(rawDamage * typeModifier));

  return { damage, modifier: typeModifier };
}

function clampStage(stage) {
  return Math.max(-6, Math.min(6, stage));
}

function performSupportMove(attacker, defender, move, isPlayer) {
  const messages = [];
  const label = isPlayer ? `你的 ${attacker.name}` : `对手的 ${attacker.name}`;

  if (!move.effect) {
    messages.push(`${label} 使用了 ${move.name}，但似乎没有发生什么。`);
    return messages;
  }

  const target = move.effect.target === 'self' ? attacker : defender;
  const targetLabel = target === attacker ? label : isPlayer ? `对手的 ${defender.name}` : `你的 ${defender.name}`;

  const statKey = move.effect.stat;
  const currentStage = target.statModifiers?.[statKey] ?? 0;
  const nextStage = clampStage(currentStage + move.effect.modifier);
  if (target.statModifiers) {
    target.statModifiers[statKey] = nextStage;
  }

  let descriptor = '发生了变化';
  if (move.effect.modifier > 0) {
    descriptor = '上升了！';
  } else if (move.effect.modifier < 0) {
    descriptor = '下降了！';
  }

  const statLabel = STAT_LABEL[statKey] ?? statKey;
  messages.push(`${label} 使用了 ${move.name}！`);
  messages.push(`${targetLabel} 的${statLabel}${descriptor}`);
  return messages;
}

function performAttackMove(attacker, defender, move, isPlayer) {
  const messages = [];
  const label = isPlayer ? `你的 ${attacker.name}` : `对手的 ${attacker.name}`;
  messages.push(`${label} 使用了 ${move.name}！`);

  const accuracy = move.accuracy ?? 100;
  if (Math.random() * 100 >= accuracy) {
    messages.push('但是没有击中！');
    return { messages, fainted: false };
  }

  const { damage, modifier } = calculateDamage(attacker, defender, move);
  if (modifier === 0) {
    messages.push('但是完全没有效果！');
    return { messages, fainted: false };
  }

  defender.currentHP = Math.max(0, defender.currentHP - damage);
  messages.push(`造成了 ${damage} 点伤害！`);

  if (modifier > 1.5) {
    messages.push('效果拔群！');
  } else if (modifier < 1 && modifier > 0) {
    messages.push('效果不太理想。');
  }

  return { messages, fainted: defender.currentHP <= 0 };
}

function performMove(attacker, defender, move, isPlayer) {
  if (move.category === 'support') {
    return { messages: performSupportMove(attacker, defender, move, isPlayer), fainted: false };
  }
  return performAttackMove(attacker, defender, move, isPlayer);
}

function clonePokemon(pokemon) {
  const copy = pokemon.clone();
  copy.notifications.length = 0;
  return copy;
}

export function createBattleState({
  playerPokemon,
  opponentPokemon,
  type = 'wild',
  trainer = null,
}) {
  return {
    type,
    playerPokemon: clonePokemon(playerPokemon),
    opponentPokemon: clonePokemon(opponentPokemon),
    trainer,
    turn: 1,
    log: initialLog(type, opponentPokemon, trainer),
    finished: false,
    winner: null,
  };
}

function initialLog(type, opponentPokemon, trainer) {
  const log = [];
  if (type === 'trainer' && trainer) {
    log.push(`${trainer.trainerClass} ${trainer.name} 发起了挑战！`);
    log.push(`${trainer.name} 派出了 ${opponentPokemon.name}！`);
  } else if (type === 'wild') {
    log.push(`野生的 ${opponentPokemon.name} 出现了！`);
  }
  return log;
}

function chooseAiMove(opponentPokemon) {
  if (!opponentPokemon.moves || opponentPokemon.moves.length === 0) {
    return null;
  }
  return opponentPokemon.moves[Math.floor(Math.random() * opponentPokemon.moves.length)];
}

export function executePlayerTurn(state, moveId) {
  if (state.finished) {
    return state;
  }

  const move = state.playerPokemon.moves.find((m) => m.id === moveId);
  if (!move) {
    return {
      ...state,
      log: [...state.log, '无法使用该招式。'],
    };
  }

  const playerPokemon = clonePokemon(state.playerPokemon);
  const opponentPokemon = clonePokemon(state.opponentPokemon);
  const log = [...state.log, `--- 第 ${state.turn} 回合 ---`];

  const result = performMove(playerPokemon, opponentPokemon, move, true);
  log.push(...result.messages);

  if (result.fainted) {
    log.push(`${opponentPokemon.name} 倒下了！`);
    return {
      ...state,
      playerPokemon,
      opponentPokemon,
      log,
      finished: true,
      winner: 'player',
    };
  }

  const aiMove = chooseAiMove(opponentPokemon);
  if (!aiMove) {
    log.push(`${opponentPokemon.name} 无法行动。`);
    return {
      ...state,
      playerPokemon,
      opponentPokemon,
      log,
      turn: state.turn + 1,
    };
  }

  const aiResult = performMove(opponentPokemon, playerPokemon, aiMove, false);
  log.push(...aiResult.messages);

  if (aiResult.fainted) {
    log.push(`${playerPokemon.name} 倒下了！`);
    return {
      ...state,
      playerPokemon,
      opponentPokemon,
      log,
      finished: true,
      winner: 'opponent',
    };
  }

  return {
    ...state,
    playerPokemon,
    opponentPokemon,
    log,
    turn: state.turn + 1,
  };
}
