import React from 'react';

const BattleScreen = ({ battleState, onMoveSelect, onRunAway }) => {
  const { playerPokemon, opponentPokemon, type, trainer, log, finished } = battleState;

  return (
    <div id="battle-screen" className="screen active h-full flex flex-col">
      <div className="flex-1 grid grid-rows-2 gap-4 p-4 bg-slate-900 text-white">
        <div className="bg-slate-800 rounded-2xl p-4 shadow">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-lg font-semibold">{type === 'trainer' && trainer ? `${trainer.name}的` : '野生的'} {opponentPokemon.name}</div>
              <div className="text-sm text-slate-300">Lv.{opponentPokemon.level}</div>
            </div>
            <div className="text-sm text-slate-300">
              HP {opponentPokemon.currentHP}/{opponentPokemon.maxHP}
            </div>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500" style={{ width: `${Math.floor((opponentPokemon.currentHP / opponentPokemon.maxHP) * 100)}%` }} />
          </div>
        </div>
        <div className="bg-slate-800 rounded-2xl p-4 shadow">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-lg font-semibold">你的 {playerPokemon.name}</div>
              <div className="text-sm text-slate-300">Lv.{playerPokemon.level}</div>
            </div>
            <div className="text-sm text-slate-300">
              HP {playerPokemon.currentHP}/{playerPokemon.maxHP}
            </div>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${Math.floor((playerPokemon.currentHP / playerPokemon.maxHP) * 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">战斗记录</h3>
          <div className="h-48 overflow-y-auto space-y-2">
            {log.map((entry, index) => (
              <div key={index} className="text-sm text-gray-700 bg-white rounded px-2 py-1 shadow-sm">
                {entry}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            {playerPokemon.moves.map((move) => (
              <button
                key={move.id}
                className="move-btn bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow"
                onClick={() => onMoveSelect(move.id)}
                disabled={finished}
              >
                <div className="text-lg">{move.name}</div>
                <div className="text-sm opacity-80">{move.type}系 · {move.category === 'attack' ? `威力 ${move.power}` : '辅助技能'}</div>
              </button>
            ))}
          </div>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl shadow"
            onClick={onRunAway}
          >
            {finished ? '返回冒险' : '逃跑'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BattleScreen;
