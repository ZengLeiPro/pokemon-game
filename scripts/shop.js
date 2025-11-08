// shop.js - 商店系统

/**
 * 渲染商店界面
 */
function renderShop() {
  renderMedicineItems();
  renderPokeballItems();
  updateShopMoney();
}

/**
 * 渲染药品列表
 */
function renderMedicineItems() {
  const container = document.getElementById('medicine-items-container');
  if (!container) return;

  const medicines = getMedicineItems();
  container.innerHTML = '';

  medicines.forEach(itemData => {
    const itemDiv = createShopItemElement(itemData);
    container.appendChild(itemDiv);
  });
}

/**
 * 渲染精灵球列表
 */
function renderPokeballItems() {
  const container = document.getElementById('pokeball-items-container');
  if (!container) return;

  const pokeballs = getPokeballItems();
  container.innerHTML = '';

  pokeballs.forEach(itemData => {
    const itemDiv = createShopItemElement(itemData);
    container.appendChild(itemDiv);
  });
}

/**
 * 创建商品元素
 */
function createShopItemElement(itemData) {
  const div = document.createElement('div');
  div.className = 'grid grid-cols-[auto_1fr_auto] gap-4 items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors';

  // 图标
  const iconDiv = document.createElement('div');
  iconDiv.className = 'text-3xl';
  iconDiv.textContent = itemData.icon || '📦';

  // 信息
  const infoDiv = document.createElement('div');
  const nameDiv = document.createElement('div');
  nameDiv.className = 'font-bold text-gray-800';
  nameDiv.textContent = itemData.name;

  const descDiv = document.createElement('div');
  descDiv.className = 'text-xs text-gray-600';
  descDiv.textContent = itemData.description;

  // 显示已拥有数量
  const ownedDiv = document.createElement('div');
  ownedDiv.className = 'text-xs text-blue-600 mt-1';
  const ownedCount = getItemCount(itemData.id);
  ownedDiv.textContent = ownedCount > 0 ? `已拥有: ${ownedCount}` : '';
  ownedDiv.id = `owned-count-${itemData.id}`;

  infoDiv.appendChild(nameDiv);
  infoDiv.appendChild(descDiv);
  infoDiv.appendChild(ownedDiv);

  // 购买部分
  const buyDiv = document.createElement('div');
  buyDiv.className = 'flex flex-col items-end gap-2';

  const priceDiv = document.createElement('div');
  priceDiv.className = 'text-sm font-bold text-yellow-600';
  priceDiv.textContent = `💰 ${itemData.price}`;

  const buyButton = document.createElement('button');
  buyButton.className = 'px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg text-sm transition-colors';
  buyButton.textContent = '购买';
  buyButton.onclick = () => buyItem(itemData.id);

  buyDiv.appendChild(priceDiv);
  buyDiv.appendChild(buyButton);

  div.appendChild(iconDiv);
  div.appendChild(infoDiv);
  div.appendChild(buyDiv);

  return div;
}

/**
 * 购买道具
 */
function buyItem(itemId) {
  const itemData = ITEM_DATA[itemId];
  if (!itemData) {
    showShopMessage('道具不存在', 'error');
    return;
  }

  const currentMoney = getMoney();
  if (currentMoney < itemData.price) {
    showShopMessage('💰 金币不足！', 'error');
    return;
  }

  // 扣除金币
  if (deductMoney(itemData.price)) {
    // 添加道具
    addItem(itemId, 1);

    // 更新UI
    updateShopMoney();
    updatePlayerMoney();

    // 更新该道具的已拥有数量显示
    const ownedDiv = document.getElementById(`owned-count-${itemId}`);
    if (ownedDiv) {
      const ownedCount = getItemCount(itemId);
      ownedDiv.textContent = `已拥有: ${ownedCount}`;
    }

    showShopMessage(`✅ 购买成功！获得了 ${itemData.name}`, 'success');
  } else {
    showShopMessage('购买失败', 'error');
  }
}

/**
 * 更新商店的金币显示
 */
function updateShopMoney() {
  const moneyElement = document.getElementById('shop-money');
  if (moneyElement) {
    moneyElement.textContent = getMoney();
  }
}

/**
 * 更新主界面的金币显示
 */
function updatePlayerMoney() {
  const moneyElement = document.getElementById('player-money');
  if (moneyElement) {
    moneyElement.textContent = getMoney();
  }
}

/**
 * 显示商店消息
 */
function showShopMessage(message, type = 'info') {
  // 创建消息元素
  const messageDiv = document.createElement('div');
  messageDiv.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg font-bold text-white animate-fade-in';

  if (type === 'success') {
    messageDiv.className += ' bg-green-500';
  } else if (type === 'error') {
    messageDiv.className += ' bg-red-500';
  } else {
    messageDiv.className += ' bg-blue-500';
  }

  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);

  // 3秒后移除
  setTimeout(() => {
    messageDiv.style.opacity = '0';
    messageDiv.style.transition = 'opacity 0.5s';
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 500);
  }, 3000);
}

/**
 * 批量购买道具
 */
function buyItemBulk(itemId, quantity) {
  const itemData = ITEM_DATA[itemId];
  if (!itemData) {
    showShopMessage('道具不存在', 'error');
    return;
  }

  const totalCost = itemData.price * quantity;
  const currentMoney = getMoney();

  if (currentMoney < totalCost) {
    showShopMessage('💰 金币不足！', 'error');
    return;
  }

  if (deductMoney(totalCost)) {
    addItem(itemId, quantity);
    updateShopMoney();
    updatePlayerMoney();

    const ownedDiv = document.getElementById(`owned-count-${itemId}`);
    if (ownedDiv) {
      const ownedCount = getItemCount(itemId);
      ownedDiv.textContent = `已拥有: ${ownedCount}`;
    }

    showShopMessage(`✅ 购买成功！获得了 ${quantity} 个 ${itemData.name}`, 'success');
  } else {
    showShopMessage('购买失败', 'error');
  }
}
