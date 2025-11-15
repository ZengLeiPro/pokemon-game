import React from 'react';
import { POKEMON_DATA, MOVE_DATA } from '../game/data.js';

const StarterSelection = ({ starters, onSelect }) => {
  return (
    <div id="starter-selection" className="screen active h-full overflow-y-auto p-8 flex flex-col items-center justify-center">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8 text-center">选择你的初始宝可梦</h2>
      <div className="starter-grid w-full max-w-lg space-y-4">
        {starters.map((id) => {
          const data = POKEMON_DATA[id];
          const firstMoves = (data.learnset || []).slice(0, 2);
          return (
            <button
              key={id}
              className="starter-btn w-full bg-white border-4 border-blue-500 rounded-2xl p-6 hover:bg-gray-100 hover:border-blue-600 transition-all hover:-translate-y-1 hover:shadow-xl"
              onClick={() => onSelect(id)}
            >
              <div className="text-xl font-bold text-gray-800 mb-2">{data.name}</div>
              <div className="text-sm text-gray-600 mb-3">{data.type.join('/')}</div>
              <div className="space-y-1">
                {firstMoves.map((entry) => {
                  const move = MOVE_DATA[entry.move];
                  return (
                    <span key={entry.move} className="block text-xs bg-gray-100 px-3 py-1 rounded">
                      {entry.level === 1 ? '初始技能' : `Lv.${entry.level}`}：{move ? move.name : entry.move}
                    </span>
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StarterSelection;
