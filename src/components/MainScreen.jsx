import React from 'react';
import { EXP_TABLE } from '../game/data.js';

const MainScreen = ({
  player,
  activePokemon,
  onStartBattle,
  onHealAll,
  onSwitchPokemon,
  messages,
}) => {
  const hpPercent = Math.floor((activePokemon.currentHP / activePokemon.maxHP) * 100);
  const expCurrent = activePokemon.exp - (EXP_TABLE[activePokemon.level] || 0);
  const expNext = (EXP_TABLE[activePokemon.level + 1] || activePokemon.exp + 1) - (EXP_TABLE[activePokemon.level] || 0);
  const expPercent = Math.min(100, Math.floor((expCurrent / expNext) * 100));

  return (
    <div id="main-screen" className="screen active h-full flex flex-col">
      <div className="bg-white border-b-2 border-gray-800 shadow-md flex-shrink-0">
        <div className="p-3 lg:p-4 grid grid-cols-1 lg:grid-cols-3 gap-3 items-center">
          <div className="flex flex-col">
            <span className="text-base lg:text-lg font-bold text-gray-800">{activePokemon.name}</span>
            <span className="text-xs lg:text-sm text-gray-600">Lv.{activePokemon.level}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500" style={{ width: `${hpPercent}%` }} />
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">
                {activePokemon.currentHP}/{activePokemon.maxHP}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500" style={{ width: `${expPercent}%` }} />
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">
                {expCurrent}/{expNext}
              </span>
            </div>
          </div>
          <div className="flex lg:flex-col gap-2 lg:items-end">
            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-yellow-300 font-bold text-sm shadow">
              <span>💰</span>
              <span>{player.money}</span>
            </div>
            <div className="text-xs text-gray-600">
              {player.battlesWon}/{player.totalBattles}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
        <section className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">背包</h3>
          {Object.keys(player.bag).length === 0 ? (
            <p className="text-sm text-gray-500">背包里暂时没有道具。</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(player.bag).map(([itemId, count]) => (
                <li key={itemId} className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{itemId}</span>
                  <span className="text-sm text-gray-500">×{count}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">冒险</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow" onClick={() => onStartBattle('wild')}>
              遭遇野生宝可梦
            </button>
            <button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl shadow" onClick={() => onStartBattle('trainer')}>
              挑战训练家
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow" onClick={onHealAll}>
              宝可梦中心治疗
            </button>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">队伍</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {player.pokemonTeam.map((pokemon, index) => {
              const hp = Math.floor((pokemon.currentHP / pokemon.maxHP) * 100);
              return (
                <button
                  key={`${pokemon.speciesId}-${index}`}
                  className={`text-left p-3 rounded-xl border-2 transition ${index === player.activeIndex ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:border-blue-300'}`}
                  onClick={() => onSwitchPokemon(index)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{pokemon.name}</span>
                    <span className="text-sm text-gray-500">Lv.{pokemon.level}</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${hp}%` }} />
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    HP {pokemon.currentHP}/{pokemon.maxHP}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">消息</h3>
          {messages.length === 0 ? (
            <p className="text-sm text-gray-500">目前没有新的消息。</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {messages.map((msg, idx) => (
                <li key={idx} className="text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded">
                  {msg}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default MainScreen;
