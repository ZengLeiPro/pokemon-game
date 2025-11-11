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
    if (!pokemon) {
      console.warn('updatePlayerStatus: pokemon is null');
      return;
    }

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
      if (battleType === 'gymLeader' && trainer) {
        // 显示道馆馆长信息和剩余宝可梦数量
        const remainingCount = trainer.pokemonTeam.length - trainer.currentPokemonIndex;
        typeLabel.textContent = `${trainer.gymType}道馆馆长 ${trainer.name}的 (剩余: ${remainingCount})`;
      } else if (battleType === 'trainer' && trainer) {
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
        useButton.onclick = () => UI.showPokemonSelectionForItem(itemId);
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
        slotDiv.className = `${isActive ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-300'} border-2 rounded-xl p-4 flex flex-col gap-2`;

        slotDiv.innerHTML = `
          <div class="flex items-center gap-3">
            <div class="text-4xl">${this.getPokemonIcon(pokemon.speciesId)}</div>
            <div class="flex-1">
              <div class="font-bold text-gray-800">${pokemon.name}</div>
              <div class="text-sm text-gray-600">Lv.${pokemon.level}</div>
              <div class="text-xs ${pokemon.currentHP > 0 ? 'text-green-600' : 'text-red-600'}">
                HP: ${pokemon.currentHP}/${pokemon.maxHP}
              </div>
            </div>
            ${isActive ? '<div class="text-sm font-bold text-blue-600">✓ 出战中</div>' : ''}
          </div>
        `;

        // 添加操作按钮
        if (!gameState.battle.isActive) {
          const btnContainer = document.createElement('div');
          btnContainer.className = 'flex gap-2';

          // 切换出战按钮
          if (!isActive && pokemon.currentHP > 0) {
            const switchBtn = document.createElement('button');
            switchBtn.className = 'flex-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded transition-colors';
            switchBtn.textContent = '设为出战';
            switchBtn.onclick = (e) => {
              e.stopPropagation();
              switchActivePokemon(i);
              UI.renderPokemonTeam();
              UI.updatePlayerStatus(getCurrentPokemon());
              showShopMessage(`切换到 ${pokemon.name}！`, 'success');
            };
            btnContainer.appendChild(switchBtn);
          }

          // 移到盒子按钮（不能移除最后一只宝可梦）
          if (team.length > 1) {
            const removeBtn = document.createElement('button');
            removeBtn.className = 'flex-1 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded transition-colors';
            removeBtn.textContent = '移至盒子';
            removeBtn.onclick = (e) => {
              e.stopPropagation();
              UI.showRemovePokemonConfirm(pokemon, i);
            };
            btnContainer.appendChild(removeBtn);
          }

          slotDiv.appendChild(btnContainer);
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

  // ========== 显示移除宝可梦确认对话框 ==========
  showRemovePokemonConfirm(pokemon, teamIndex) {
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
      将 ${pokemon.name} 移至盒子？
    `;

    const info = document.createElement('p');
    info.className = 'text-sm text-gray-600 mb-4 text-center';
    info.textContent = '宝可梦会从队伍中移除，并存放到宝可梦盒子中。你可以随时在服务页面的盒子里将它加回队伍。';

    const actions = document.createElement('div');
    actions.className = 'flex gap-3';

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors';
    confirmBtn.textContent = '确认移除';
    confirmBtn.onclick = () => {
      if (removePokemonFromTeam(teamIndex)) {
        showShopMessage(`${pokemon.name} 已移至盒子`, 'success');
        UI.renderBag();
        UI.updatePlayerStatus(getCurrentPokemon());
      }
      document.body.removeChild(modal);
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'flex-1 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors';
    cancelBtn.textContent = '取消';
    cancelBtn.onclick = () => document.body.removeChild(modal);

    actions.appendChild(confirmBtn);
    actions.appendChild(cancelBtn);

    content.appendChild(title);
    content.appendChild(info);
    content.appendChild(actions);
    modal.appendChild(content);
    document.body.appendChild(modal);
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
            UI.renderBag();
            UI.updatePlayerStatus(getCurrentPokemon());
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
      pokemonDiv.onclick = () => UI.showBoxPokemonActions(pokemon, index);

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
          UI.renderPokemonBox();
          UI.renderBag();
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
  },

  // ========== 渲染战斗中的宝可梦切换列表 ==========
  renderBattleSwitchList() {
    const container = document.getElementById('battle-switch-list');
    if (!container) return;

    const team = gameState.player.pokemonTeam;
    const currentIndex = gameState.player.activePokemonIndex;
    container.innerHTML = '';

    // 筛选可用宝可梦（不是当前出战且HP > 0）
    const availablePokemon = team.map((pokemon, index) => ({ pokemon, index }))
      .filter(({ pokemon, index }) => index !== currentIndex && pokemon.currentHP > 0);

    if (availablePokemon.length === 0) {
      const emptyDiv = document.createElement('p');
      emptyDiv.className = 'text-center text-gray-400 text-sm italic';
      emptyDiv.textContent = '没有可以切换的宝可梦';
      container.appendChild(emptyDiv);
      return;
    }

    // 渲染宝可梦
    availablePokemon.forEach(({ pokemon, index }) => {
      const pokemonDiv = document.createElement('div');
      pokemonDiv.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors';

      pokemonDiv.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-3xl">${this.getPokemonIcon(pokemon.speciesId)}</span>
          <div>
            <div class="font-bold text-gray-800">${pokemon.name}</div>
            <div class="text-sm text-gray-600">Lv.${pokemon.level}</div>
            <div class="text-xs text-green-600">
              HP: ${pokemon.currentHP}/${pokemon.maxHP}
            </div>
          </div>
        </div>
        <span class="text-green-600 font-bold">→</span>
      `;

      pokemonDiv.onclick = async () => {
        console.log('点击切换宝可梦，索引:', index);
        try {
          await UI.switchPokemonInBattle(index);
        } catch (error) {
          console.error('切换宝可梦时出错:', error);
          UI.addBattleLog('切换失败！', 'error');
        }
      };

      container.appendChild(pokemonDiv);
    });
  },

  // ========== 战斗中切换宝可梦 ==========
  async switchPokemonInBattle(newIndex) {
    console.log('switchPokemonInBattle 被调用，索引:', newIndex);
    const battle = gameState.battle.instance;
    console.log('battle 实例:', battle, 'isActive:', battle?.isActive);

    if (!battle || !battle.isActive) {
      console.warn('战斗未激活，无法切换');
      return;
    }

    // 隐藏切换面板
    document.getElementById('battle-switch-panel').classList.add('hidden');

    // 禁用技能按钮
    UI.setMoveButtonsEnabled(false);

    // 调用战斗中的切换方法
    console.log('调用 battle.switchPokemon');
    await battle.switchPokemon(newIndex);

    // 重新启用技能按钮（如果战斗还在继续）
    if (battle.isActive) {
      UI.setMoveButtonsEnabled(true);
    }
    console.log('switchPokemonInBattle 完成');
  },

  // ========== 渲染强制切换宝可梦列表（当前宝可梦倒下时） ==========
  renderBattleSwitchListForced() {
    const container = document.getElementById('battle-switch-list');
    if (!container) return;

    const team = gameState.player.pokemonTeam;
    const currentIndex = gameState.player.activePokemonIndex;
    container.innerHTML = '';

    // 筛选可用宝可梦（不是当前出战且HP > 0）
    const availablePokemon = team.map((pokemon, index) => ({ pokemon, index }))
      .filter(({ pokemon, index }) => index !== currentIndex && pokemon.currentHP > 0);

    if (availablePokemon.length === 0) {
      const emptyDiv = document.createElement('p');
      emptyDiv.className = 'text-center text-red-600 font-bold text-sm italic';
      emptyDiv.textContent = '没有可以切换的宝可梦了！';
      container.appendChild(emptyDiv);
      return;
    }

    // 添加提示信息
    const hintDiv = document.createElement('p');
    hintDiv.className = 'text-center text-red-600 font-bold text-sm mb-3';
    hintDiv.textContent = '必须选择一只宝可梦继续战斗！';
    container.appendChild(hintDiv);

    // 渲染宝可梦
    availablePokemon.forEach(({ pokemon, index }) => {
      const pokemonDiv = document.createElement('div');
      pokemonDiv.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-green-100 cursor-pointer transition-colors border-2 border-green-500';

      pokemonDiv.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-3xl">${this.getPokemonIcon(pokemon.speciesId)}</span>
          <div>
            <div class="font-bold text-gray-800">${pokemon.name}</div>
            <div class="text-sm text-gray-600">Lv.${pokemon.level}</div>
            <div class="text-xs text-green-600">
              HP: ${pokemon.currentHP}/${pokemon.maxHP}
            </div>
          </div>
        </div>
        <span class="text-green-600 font-bold text-xl">→</span>
      `;

      pokemonDiv.onclick = () => UI.forcedSwitchPokemon(index);

      container.appendChild(pokemonDiv);
    });
  },

  // ========== 强制切换宝可梦（不让对手行动） ==========
  async forcedSwitchPokemon(newIndex) {
    const battle = gameState.battle.instance;
    if (!battle || !battle.isActive) return;

    const oldPokemon = battle.playerPokemon;
    const newPokemon = gameState.player.pokemonTeam[newIndex];

    if (!newPokemon || newPokemon.currentHP <= 0) {
      return;
    }

    // 隐藏切换面板
    document.getElementById('battle-switch-panel').classList.add('hidden');

    // 切换出战宝可梦
    switchActivePokemon(newIndex);
    battle.playerPokemon = newPokemon;

    UI.addBattleLog(`\n上吧，${newPokemon.name}！`, 'success');
    await battle.delay(500);

    // 重置新宝可梦的能力等级变化
    newPokemon.statModifiers = { attack: 0, defense: 0 };

    // 更新战斗界面
    UI.updateBattleStatus(battle.playerPokemon, battle.opponentPokemon, battle.battleType, battle.opponent);
    UI.createMoveButtons(newPokemon.moves, (move) => onPlayerMoveSelected(move));

    // 显示战斗操作按钮
    document.getElementById('battle-actions').style.display = 'block';

    // 重新启用技能按钮
    UI.setMoveButtonsEnabled(true);
  },

  // ========== 道馆系统UI ==========

  /**
   * 渲染道馆列表
   */
  renderGymList() {
    const container = document.getElementById('gym-list-container');
    if (!container) return;

    const gyms = getAllGyms();
    container.innerHTML = '';

    gyms.forEach(gym => {
      const hasBadge = gameState.player.badges && gameState.player.badges.includes(gym.badge.id);

      const gymCard = document.createElement('div');
      gymCard.className = `bg-white rounded-2xl p-5 shadow-lg grid grid-cols-[80px_1fr_auto] gap-4 items-center hover:-translate-y-1 transition-transform ${hasBadge ? 'opacity-75' : ''}`;

      gymCard.innerHTML = `
        <div class="text-6xl">${gym.badge.icon}</div>
        <div>
          <div class="flex items-center gap-2 mb-1">
            <h3 class="text-lg font-bold text-gray-800">${gym.location} - ${gym.type}道馆</h3>
            ${hasBadge ? `<span class="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">已获得勋章</span>` : ''}
          </div>
          <p class="text-sm text-gray-600 mb-1">馆长：${gym.name} - ${gym.description}</p>
          <div class="flex items-center gap-3 text-xs">
            <span class="text-gray-500">推荐等级：Lv.${gym.recommendedLevel}</span>
            <span class="px-2 py-1 bg-blue-100 text-blue-600 rounded">${gym.type}属性</span>
          </div>
        </div>
        <button
          class="gym-challenge-btn px-6 py-3 ${hasBadge ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'} text-white font-bold rounded-xl transition-all ${!hasBadge ? 'hover:scale-105' : ''} whitespace-nowrap"
          data-gym-id="${gym.id}"
          ${hasBadge ? 'disabled' : ''}
        >
          ${hasBadge ? '已完成 ✓' : '挑战 →'}
        </button>
      `;

      container.appendChild(gymCard);
    });

    // 绑定挑战按钮事件
    container.querySelectorAll('.gym-challenge-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const gymId = btn.getAttribute('data-gym-id');
        this.startGymChallenge(gymId);
      });
    });

    // 更新勋章计数
    this.updateBadgeDisplay();
  },

  /**
   * 开始道馆挑战
   */
  startGymChallenge(gymId) {
    const gymLeader = createGymLeader(gymId);
    if (!gymLeader) {
      alert('道馆数据加载失败！');
      return;
    }

    // 检查玩家是否有可战斗的宝可梦
    if (!hasAlivePokemon()) {
      alert('你的宝可梦都失去了战斗能力！请先去宝可梦中心恢复。');
      return;
    }

    // 显示挑战确认
    const gymData = GYM_DATA[gymId];
    const confirmed = confirm(
      `你确定要挑战 ${gymData.location} 的 ${gymData.type}属性道馆吗？\n\n` +
      `馆长：${gymData.name}\n` +
      `推荐等级：Lv.${gymData.recommendedLevel}\n\n` +
      `提示：道馆馆长拥有6只${gymData.type}属性的宝可梦！`
    );

    if (!confirmed) return;

    // 开始道馆挑战战斗
    gameState.battle.isActive = true;
    gameState.battle.opponent = gymLeader;
    gameState.battle.battleType = 'gymLeader';

    // 初始化道馆馆长的当前宝可梦
    gymLeader.currentPokemonIndex = 0;

    // 创建Battle实例
    const battle = new Battle(getCurrentPokemon(), gymLeader.pokemonTeam[0], 'gymLeader', gymLeader);
    gameState.battle.instance = battle;

    // 切换到战斗界面
    UI.showScreen('battle-screen');
    UI.updateBattleStatus(battle.playerPokemon, battle.opponentPokemon, 'gymLeader', gymLeader);
    UI.createMoveButtons(battle.playerPokemon.moves, (move) => {
      // 这里需要在main.js中实现战斗逻辑
    });

    // 显示挑战开始信息
    document.getElementById('battle-log').innerHTML = '';
    UI.addBattleLog(`你向 ${gymData.type}属性道馆馆长 ${gymData.name} 发起了挑战！`, 'info');
    UI.addBattleLog(`${gymData.name}: ${gymData.description}`, 'opponent');
    UI.addBattleLog(`\n${gymData.name} 派出了 ${gymLeader.pokemonTeam[0].name}！`, 'opponent');
  },

  /**
   * 更新勋章显示
   */
  updateBadgeDisplay() {
    const badgeCount = gameState.player.badges ? gameState.player.badges.length : 0;

    // 更新各处的勋章数量显示
    const badgeCountElements = [
      'badge-count',
      'gym-badge-count',
      'gym-progress'
    ];

    badgeCountElements.forEach(id => {
      const elem = document.getElementById(id);
      if (elem) elem.textContent = badgeCount;
    });

    // 更新勋章进度条
    const badgeProgress = document.getElementById('badge-progress');
    if (badgeProgress) {
      const percentage = (badgeCount / 8) * 100;
      badgeProgress.style.width = `${percentage}%`;
    }

    // 渲染勋章展示
    this.renderBadges();
  },

  /**
   * 渲染勋章展示（在图鉴页面）
   */
  renderBadges() {
    const container = document.getElementById('badges-container');
    if (!container) return;

    container.innerHTML = '';
    const allBadges = Object.values(BADGES);

    allBadges.forEach(badge => {
      const hasBadge = gameState.player.badges && gameState.player.badges.includes(badge.id);

      const badgeCard = document.createElement('div');
      badgeCard.className = `${hasBadge ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-100 opacity-50'} rounded-xl p-3 text-center transition-all ${hasBadge ? 'hover:scale-105 cursor-pointer' : ''}`;
      badgeCard.title = badge.description;

      badgeCard.innerHTML = `
        <div class="text-3xl mb-1">${hasBadge ? badge.icon : '❓'}</div>
        <div class="text-xs font-bold text-gray-800">${hasBadge ? badge.name : '???'}</div>
        <div class="text-xs text-gray-600">${hasBadge ? badge.type : '未获得'}</div>
      `;

      container.appendChild(badgeCard);
    });
  }
};
