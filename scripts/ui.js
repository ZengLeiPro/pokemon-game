// ========== UI控制模块 ==========
const UI = {

  // ========== 显示指定界面 ==========
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('active');
    }
  },

  // ========== 更新主界面的玩家状态 ==========
  updatePlayerStatus(pokemon) {
    document.getElementById('player-pokemon-name').textContent = pokemon.name;
    document.getElementById('player-pokemon-level').textContent = `Lv.${pokemon.level}`;

    document.getElementById('player-current-hp').textContent = pokemon.currentHP;
    document.getElementById('player-max-hp').textContent = pokemon.maxHP;

    const hpPercent = (pokemon.currentHP / pokemon.maxHP) * 100;
    document.getElementById('player-hp-fill').style.width = `${hpPercent}%`;

    document.getElementById('player-current-exp').textContent = pokemon.exp;
    document.getElementById('player-exp-next').textContent = EXP_TABLE[pokemon.level + 1] || 999999;

    const expCurrent = pokemon.exp - EXP_TABLE[pokemon.level];
    const expNext = EXP_TABLE[pokemon.level + 1] - EXP_TABLE[pokemon.level];
    const expPercent = (expCurrent / expNext) * 100;
    document.getElementById('player-exp-fill').style.width = `${expPercent}%`;
  },

  // ========== 显示消息（主界面的消息框） ==========
  showMessage(text) {
    document.getElementById('message-text').textContent = text;
  },

  // ========== 添加战斗日志 ==========
  addBattleLog(text, cssClass = '') {
    const logDiv = document.getElementById('battle-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${cssClass}`;
    entry.textContent = text;
    logDiv.appendChild(entry);

    // 自动滚动到最新日志
    logDiv.scrollTop = logDiv.scrollHeight;
  },

  // ========== 清空战斗日志 ==========
  clearBattleLog() {
    document.getElementById('battle-log').innerHTML = '';
  },

  // ========== 更新战斗界面的宝可梦状态 ==========
  updateBattleStatus(playerPokemon, opponentPokemon, battleType = 'wild', trainer = null) {
    // 玩家宝可梦
    document.getElementById('battle-player-name').textContent = playerPokemon.name;
    document.getElementById('battle-player-level').textContent = `Lv.${playerPokemon.level}`;
    document.getElementById('battle-player-current-hp').textContent = playerPokemon.currentHP;
    document.getElementById('battle-player-max-hp').textContent = playerPokemon.maxHP;

    const playerHpPercent = (playerPokemon.currentHP / playerPokemon.maxHP) * 100;
    document.getElementById('battle-player-hp-fill').style.width = `${playerHpPercent}%`;

    // 对手宝可梦
    document.getElementById('opponent-pokemon-name').textContent = opponentPokemon.name;
    document.getElementById('opponent-pokemon-level').textContent = `Lv.${opponentPokemon.level}`;
    document.getElementById('opponent-current-hp').textContent = opponentPokemon.currentHP;
    document.getElementById('opponent-max-hp').textContent = opponentPokemon.maxHP;

    const opponentHpPercent = (opponentPokemon.currentHP / opponentPokemon.maxHP) * 100;
    document.getElementById('opponent-hp-fill').style.width = `${opponentHpPercent}%`;

    // 更新对手标签
    const statusLabel = document.querySelector('#opponent-status .status-label');
    if (battleType === 'trainer' && trainer) {
      statusLabel.textContent = `${trainer.trainerClass} ${trainer.name}的`;
    } else {
      statusLabel.textContent = '野生的';
    }
  },

  // ========== 更新金币显示 ==========
  updateMoney(money) {
    const moneyElement = document.getElementById('player-money');
    if (moneyElement) {
      moneyElement.textContent = money;
    }
  },

  // ========== 生成技能按钮 ==========
  createMoveButtons(moves, onMoveClick) {
    const container = document.getElementById('move-buttons');
    container.innerHTML = '';  // 清空旧按钮

    moves.forEach(move => {
      const btn = document.createElement('button');
      btn.className = 'move-btn';
      btn.onclick = () => onMoveClick(move);

      let powerText = '';
      if (move.category === 'attack') {
        powerText = `威力 ${move.power}`;
      } else {
        powerText = move.description;
      }

      btn.innerHTML = `
        <div class="move-name">${move.name}</div>
        <div class="move-type type-${move.type}">${move.type}系</div>
        <div class="move-power">${powerText}</div>
      `;

      container.appendChild(btn);
    });
  },

  // ========== 禁用/启用技能按钮 ==========
  setMoveButtonsEnabled(enabled) {
    document.querySelectorAll('.move-btn').forEach(btn => {
      btn.disabled = !enabled;
    });
  },

  // ========== 更新战绩 ==========
  updateStats(wins, total) {
    document.getElementById('wins').textContent = wins;
    document.getElementById('total').textContent = total;
  }
};
