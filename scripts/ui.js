// ========== UI控制模块 ==========
const UI = {

  // ========== 显示指定界面 ==========
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
      screen.classList.add('hidden');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('active');
      targetScreen.classList.remove('hidden');
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

  // ========== 显示消息（已废弃，保留兼容性） ==========
  showMessage(text) {
    // 消息框已移除，仅在控制台输出
    console.log('[消息]', text);
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
    const typeLabel = document.getElementById('opponent-type-label');
    if (typeLabel) {
      if (battleType === 'trainer' && trainer) {
        typeLabel.textContent = `${trainer.trainerClass} ${trainer.name}的`;
      } else {
        typeLabel.textContent = '野生的';
      }
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
  },

  // ========== 切换Tab ==========
  switchTab(tabId) {
    // 隐藏所有Tab面板
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.remove('active');
      panel.classList.add('hidden');
    });

    // 显示目标Tab面板
    const targetPanel = document.getElementById(`${tabId}-tab`);
    if (targetPanel) {
      targetPanel.classList.add('active');
      targetPanel.classList.remove('hidden');
    }

    // 更新导航按钮状态（侧边栏和底部导航都要更新）
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      }
    });

    // 更新游戏状态
    gameState.currentTab = tabId;

    // 如果切换到背包或商店，更新相关UI
    if (tabId === 'bag') {
      this.renderBag();
    } else if (tabId === 'shop') {
      if (typeof renderShop === 'function') {
        renderShop();
      }
    }

    console.log(`切换到Tab: ${tabId}`);
  },

  // ========== 渲染背包 ==========
  renderBag() {
    this.renderBagItems();
    this.renderPokemonTeam();
  },

  // ========== 渲染背包道具 ==========
  renderBagItems() {
    const container = document.getElementById('bag-items-container');
    if (!container) return;

    const bag = gameState.player.bag;
    container.innerHTML = '';

    // 检查是否有道具
    if (Object.keys(bag).length === 0) {
      const emptyDiv = document.createElement('p');
      emptyDiv.className = 'text-center text-gray-400 text-sm mt-4 italic';
      emptyDiv.textContent = '暂无道具，前往商店购买吧！';
      container.appendChild(emptyDiv);
      return;
    }

    // 渲染每个道具
    Object.entries(bag).forEach(([itemId, count]) => {
      const itemData = ITEM_DATA[itemId];
      if (!itemData || count === 0) return;

      const itemDiv = document.createElement('div');
      itemDiv.className = 'grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors';

      // 图标
      const iconSpan = document.createElement('span');
      iconSpan.className = 'text-2xl';
      iconSpan.textContent = itemData.icon || '📦';

      // 信息
      const infoDiv = document.createElement('div');
      const nameSpan = document.createElement('div');
      nameSpan.className = 'font-bold text-gray-800';
      nameSpan.textContent = itemData.name;
      const descSpan = document.createElement('div');
      descSpan.className = 'text-xs text-gray-600';
      descSpan.textContent = itemData.description;
      infoDiv.appendChild(nameSpan);
      infoDiv.appendChild(descSpan);

      // 数量
      const countSpan = document.createElement('span');
      countSpan.className = 'font-bold text-gray-600';
      countSpan.textContent = `x ${count}`;

      // 使用按钮（仅药品在非战斗时可用）
      const useButton = document.createElement('button');
      if (itemData.type === 'medicine' && !gameState.battle.isActive) {
        useButton.className = 'px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded transition-colors';
        useButton.textContent = '使用';
        useButton.onclick = () => this.showPokemonSelectionForItem(itemId);
      } else {
        useButton.className = 'px-3 py-1 bg-gray-300 text-gray-500 text-sm font-bold rounded cursor-not-allowed';
        useButton.textContent = itemData.type === 'pokeball' ? '战斗中使用' : '使用';
        useButton.disabled = true;
      }

      itemDiv.appendChild(iconSpan);
      itemDiv.appendChild(infoDiv);
      itemDiv.appendChild(countSpan);
      itemDiv.appendChild(useButton);

      container.appendChild(itemDiv);
    });
  },

  // ========== 渲染宝可梦队伍 ==========
  renderPokemonTeam() {
    const container = document.getElementById('pokemon-team-container');
    if (!container) return;

    container.innerHTML = '';
    const team = gameState.player.pokemonTeam;

    // 渲染队伍中的宝可梦（最多6只）
    for (let i = 0; i < 6; i++) {
      const pokemon = team[i];
      const slotDiv = document.createElement('div');

      if (pokemon) {
        // 有宝可梦
        const isActive = i === gameState.player.activePokemonIndex;
        slotDiv.className = `${isActive ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-300'} border-2 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform`;

        slotDiv.innerHTML = `
          <div class="text-4xl">${this.getPokemonIcon(pokemon.speciesId)}</div>
          <div class="flex-1">
            <div class="font-bold text-gray-800">${pokemon.name}</div>
            <div class="text-sm text-gray-600">Lv.${pokemon.level}</div>
            <div class="text-xs ${pokemon.currentHP > 0 ? 'text-green-600' : 'text-red-600'}">
              HP: ${pokemon.currentHP}/${pokemon.maxHP}
            </div>
          </div>
          ${isActive ? '<div class="text-sm font-bold text-blue-600">✓ 出战中</div>' : ''}
        `;

        // 点击切换出战宝可梦
        if (!isActive && pokemon.currentHP > 0 && !gameState.battle.isActive) {
          slotDiv.onclick = () => {
            switchActivePokemon(i);
            this.renderPokemonTeam();
            this.updatePlayerStatus(getCurrentPokemon());
            showShopMessage(`切换到 ${pokemon.name}！`, 'success');
          };
        }
      } else {
        // 空位
        slotDiv.className = 'bg-gray-100 border-2 border-gray-300 rounded-xl p-4 flex items-center gap-3 opacity-50';
        slotDiv.innerHTML = `
          <div class="text-4xl">+</div>
          <div class="text-sm text-gray-600">空位</div>
        `;
      }

      container.appendChild(slotDiv);
    }
  },

  // ========== 获取宝可梦图标 ==========
  getPokemonIcon(speciesId) {
    // 简单的图标映射（可以后续扩展）
    const icons = {
      'bulbasaur': '🌱', 'ivysaur': '🌿', 'venusaur': '🌺',
      'charmander': '🔥', 'charmeleon': '🦎', 'charizard': '🐉',
      'squirtle': '💧', 'wartortle': '🐢', 'blastoise': '🌊',
      'pikachu': '⚡', 'raichu': '⚡',
      'caterpie': '🐛', 'metapod': '🥚', 'butterfree': '🦋',
      'weedle': '🐛', 'kakuna': '🥚', 'beedrill': '🐝',
      'pidgey': '🐦', 'pidgeotto': '🐦', 'pidgeot': '🦅',
      'rattata': '🐀', 'raticate': '🐀',
      'spearow': '🐦', 'fearow': '🦅',
      'ekans': '🐍', 'arbok': '🐍',
      'sandshrew': '🦔', 'sandslash': '🦔',
      'nidoran-f': '🐰', 'nidorina': '🐰', 'nidoqueen': '👑',
      'nidoran-m': '🐰', 'nidorino': '🐰', 'nidoking': '👑',
      'zubat': '🦇', 'golbat': '🦇',
      'oddish': '🌱', 'gloom': '🌺', 'vileplume': '🌺',
      'paras': '🍄', 'parasect': '🍄',
      'venonat': '🐛', 'venomoth': '🦋',
      'diglett': '🪨', 'dugtrio': '🪨',
      'meowth': '🐱', 'persian': '🐱',
      'psyduck': '🦆', 'golduck': '🦆',
      'mankey': '🐵', 'primeape': '🦍',
      'growlithe': '🐕', 'arcanine': '🐕',
      'poliwag': '🐸', 'poliwhirl': '🐸', 'poliwrath': '🐸',
      'abra': '🔮', 'kadabra': '🔮', 'alakazam': '🔮',
      'machop': '💪', 'machoke': '💪', 'machamp': '💪',
      'bellsprout': '🌱', 'weepinbell': '🌺', 'victreebel': '🌺',
      'tentacool': '🪼', 'tentacruel': '🪼',
      'geodude': '🪨', 'graveler': '🪨', 'golem': '🪨',
      'ponyta': '🐴', 'rapidash': '🐴',
      'slowpoke': '🦥', 'slowbro': '🦥',
      'magnemite': '🧲', 'magneton': '🧲',
      'farfetchd': '🦆',
      'doduo': '🐦', 'dodrio': '🐦',
      'seel': '🦭', 'dewgong': '🦭',
      'grimer': '💩', 'muk': '💩',
      'shellder': '🐚', 'cloyster': '🐚',
      'gastly': '👻', 'haunter': '👻', 'gengar': '👻',
      'onix': '🪨',
      'drowzee': '🐘', 'hypno': '🐘',
      'krabby': '🦀', 'kingler': '🦀',
      'voltorb': '⚡', 'electrode': '⚡',
      'exeggcute': '🥚', 'exeggutor': '🌴',
      'cubone': '💀', 'marowak': '💀',
      'hitmonlee': '🥋', 'hitmonchan': '🥊',
      'lickitung': '👅',
      'koffing': '💨', 'weezing': '💨',
      'rhyhorn': '🦏', 'rhydon': '🦏',
      'chansey': '🥚',
      'tangela': '🌿',
      'kangaskhan': '🦘',
      'horsea': '🐴', 'seadra': '🐉',
      'goldeen': '🐟', 'seaking': '🐟',
      'staryu': '⭐', 'starmie': '⭐',
      'mr-mime': '🎭',
      'scyther': '🦗',
      'jynx': '💋',
      'electabuzz': '⚡',
      'magmar': '🔥',
      'pinsir': '🪲',
      'tauros': '🐂',
      'magikarp': '🐟', 'gyarados': '🐉',
      'lapras': '🦕',
      'ditto': '💧',
      'eevee': '🦊', 'vaporeon': '💧', 'jolteon': '⚡', 'flareon': '🔥',
      'porygon': '🤖',
      'omanyte': '🐚', 'omastar': '🐚',
      'kabuto': '🦀', 'kabutops': '🦀',
      'aerodactyl': '🦖',
      'snorlax': '😴',
      'articuno': '❄️', 'zapdos': '⚡', 'moltres': '🔥',
      'dratini': '🐉', 'dragonair': '🐉', 'dragonite': '🐉',
      'mewtwo': '🧬',
      'mew': '🎀'
    };
    return icons[speciesId] || '❓';
  },

  // ========== 显示宝可梦选择界面（用于使用道具） ==========
  showPokemonSelectionForItem(itemId) {
    const itemData = ITEM_DATA[itemId];
    if (!itemData) return;

    const team = gameState.player.pokemonTeam;
    if (team.length === 0) {
      showShopMessage('没有宝可梦！', 'error');
      return;
    }

    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.onclick = (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    };

    const content = document.createElement('div');
    content.className = 'bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto';

    const title = document.createElement('h3');
    title.className = 'text-xl font-bold text-gray-800 mb-4';
    title.textContent = `使用 ${itemData.name}`;

    const pokemonList = document.createElement('div');
    pokemonList.className = 'space-y-2';

    team.forEach((pokemon, index) => {
      const pokemonDiv = document.createElement('div');
      pokemonDiv.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors';

      const canUse = itemData.type === 'medicine' && pokemon.currentHP < pokemon.maxHP;
      if (!canUse) {
        pokemonDiv.className += ' opacity-50 cursor-not-allowed';
      }

      pokemonDiv.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="text-3xl">${this.getPokemonIcon(pokemon.speciesId)}</div>
          <div>
            <div class="font-bold text-gray-800">${pokemon.name}</div>
            <div class="text-sm text-gray-600">Lv.${pokemon.level}</div>
            <div class="text-xs ${pokemon.currentHP > 0 ? 'text-green-600' : 'text-red-600'}">
              HP: ${pokemon.currentHP}/${pokemon.maxHP}
            </div>
          </div>
        </div>
        ${canUse ? '<span class="text-blue-600 font-bold">→</span>' : '<span class="text-gray-400">HP已满</span>'}
      `;

      if (canUse) {
        pokemonDiv.onclick = () => {
          const result = useItem(itemId, pokemon);
          if (result.success) {
            showShopMessage(result.message, 'success');
            this.renderBag();
            this.updatePlayerStatus(getCurrentPokemon());
          } else {
            showShopMessage(result.message, 'error');
          }
          document.body.removeChild(modal);
        };
      }

      pokemonList.appendChild(pokemonDiv);
    });

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'w-full mt-4 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors';
    cancelBtn.textContent = '取消';
    cancelBtn.onclick = () => document.body.removeChild(modal);

    content.appendChild(title);
    content.appendChild(pokemonList);
    content.appendChild(cancelBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);
  },

  // ========== 渲染宝可梦盒子 ==========
  renderPokemonBox() {
    const container = document.getElementById('pokemon-box-container');
    const emptyMessage = document.getElementById('box-empty-message');
    const boxCount = document.getElementById('box-count');

    if (!container) return;

    container.innerHTML = '';
    const box = gameState.player.pokemonBox;

    // 更新盒子计数
    if (boxCount) {
      boxCount.textContent = box.length;
    }

    // 检查盒子是否为空
    if (box.length === 0) {
      if (emptyMessage) {
        emptyMessage.classList.remove('hidden');
      }
      return;
    }

    if (emptyMessage) {
      emptyMessage.classList.add('hidden');
    }

    // 渲染盒子中的宝可梦
    box.forEach((pokemon, index) => {
      const pokemonDiv = document.createElement('div');
      pokemonDiv.className = 'bg-gray-50 border-2 border-gray-300 rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer';

      pokemonDiv.innerHTML = `
        <div class="text-center">
          <div class="text-4xl mb-2">${this.getPokemonIcon(pokemon.speciesId)}</div>
          <div class="font-bold text-gray-800">${pokemon.name}</div>
          <div class="text-sm text-gray-600">Lv.${pokemon.level}</div>
          <div class="text-xs ${pokemon.currentHP > 0 ? 'text-green-600' : 'text-red-600'} mt-1">
            HP: ${pokemon.currentHP}/${pokemon.maxHP}
          </div>
        </div>
      `;

      // 点击时显示操作选项
      pokemonDiv.onclick = () => this.showBoxPokemonActions(pokemon, index);

      container.appendChild(pokemonDiv);
    });
  },

  // ========== 显示盒子宝可梦的操作选项 ==========
  showBoxPokemonActions(pokemon, boxIndex) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.onclick = (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    };

    const content = document.createElement('div');
    content.className = 'bg-white rounded-2xl p-6 max-w-md w-full mx-4';

    const title = document.createElement('h3');
    title.className = 'text-xl font-bold text-gray-800 mb-4 text-center';
    title.innerHTML = `
      <div class="text-5xl mb-2">${this.getPokemonIcon(pokemon.speciesId)}</div>
      ${pokemon.name} Lv.${pokemon.level}
    `;

    const info = document.createElement('div');
    info.className = 'mb-4 text-sm text-gray-600';
    info.innerHTML = `
      <div>HP: ${pokemon.currentHP}/${pokemon.maxHP}</div>
      <div>攻击: ${pokemon.attack} | 防御: ${pokemon.defense}</div>
      <div>速度: ${pokemon.speed}</div>
      <div class="mt-2">技能: ${pokemon.moves.map(m => m.name).join(', ')}</div>
    `;

    const actions = document.createElement('div');
    actions.className = 'space-y-2';

    // 加入队伍按钮
    if (gameState.player.pokemonTeam.length < 6) {
      const addToTeamBtn = document.createElement('button');
      addToTeamBtn.className = 'w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors';
      addToTeamBtn.textContent = '加入队伍';
      addToTeamBtn.onclick = () => {
        if (movePokemonToTeam(boxIndex)) {
          showShopMessage(`${pokemon.name} 加入了队伍！`, 'success');
          this.renderPokemonBox();
          this.renderBag();
          document.body.removeChild(modal);
        }
      };
      actions.appendChild(addToTeamBtn);
    } else {
      const fullMessage = document.createElement('p');
      fullMessage.className = 'text-red-600 text-sm text-center';
      fullMessage.textContent = '队伍已满（6只），请先移除队伍中的宝可梦';
      actions.appendChild(fullMessage);
    }

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'w-full px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors';
    cancelBtn.textContent = '取消';
    cancelBtn.onclick = () => document.body.removeChild(modal);

    actions.appendChild(cancelBtn);

    content.appendChild(title);
    content.appendChild(info);
    content.appendChild(actions);
    modal.appendChild(content);
    document.body.appendChild(modal);
  },

  // ========== 渲染战斗道具列表 ==========
  renderBattleItemList() {
    const container = document.getElementById('battle-item-list');
    if (!container) return;

    const bag = gameState.player.bag;
    const battleType = gameState.battle.battleType;
    container.innerHTML = '';

    // 筛选可用道具
    const availableItems = Object.entries(bag).filter(([itemId, count]) => {
      const itemData = ITEM_DATA[itemId];
      if (!itemData || count === 0) return false;

      // 药品总是可用
      if (itemData.type === 'medicine') return true;

      // 精灵球只能在野生战斗中使用
      if (itemData.type === 'pokeball' && battleType === 'wild') return true;

      return false;
    });

    if (availableItems.length === 0) {
      const emptyDiv = document.createElement('p');
      emptyDiv.className = 'text-center text-gray-400 text-sm italic';
      emptyDiv.textContent = '没有可用的道具';
      container.appendChild(emptyDiv);
      return;
    }

    // 渲染道具
    availableItems.forEach(([itemId, count]) => {
      const itemData = ITEM_DATA[itemId];

      const itemDiv = document.createElement('div');
      itemDiv.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors';

      itemDiv.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-2xl">${itemData.icon || '📦'}</span>
          <div>
            <div class="font-bold text-gray-800">${itemData.name}</div>
            <div class="text-xs text-gray-600">${itemData.description}</div>
          </div>
        </div>
        <span class="font-bold text-gray-600">x ${count}</span>
      `;

      itemDiv.onclick = () => UI.useBattleItem(itemId);

      container.appendChild(itemDiv);
    });
  },

  // ========== 在战斗中使用道具 ==========
  async useBattleItem(itemId) {
    const battle = gameState.battle.instance;
    if (!battle || !battle.isActive) return;

    const itemData = ITEM_DATA[itemId];
    if (!itemData) return;

    // 隐藏道具面板
    document.getElementById('battle-item-panel').classList.add('hidden');

    // 禁用技能按钮
    UI.setMoveButtonsEnabled(false);

    if (itemData.type === 'medicine') {
      // 使用伤药
      await battle.useMedicine(itemId);
    } else if (itemData.type === 'pokeball') {
      // 投精灵球
      await battle.throwPokeball(itemId);
    }

    // 重新启用技能按钮（如果战斗还在继续）
    if (battle.isActive) {
      UI.setMoveButtonsEnabled(true);
    }
  }
};
