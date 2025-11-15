import React, { useMemo, useState } from 'react';
import StarterSelection from './components/StarterSelection.jsx';
import MainScreen from './components/MainScreen.jsx';
import BattleScreen from './components/BattleScreen.jsx';
import Pokemon from './game/pokemon.js';
import { createWildPokemon, createTrainerBattle } from './game/opponents.js';
import { createBattleState, executePlayerTurn } from './game/battleEngine.js';

const STARTER_IDS = ['bulbasaur', 'charmander', 'squirtle'];

const initialPlayerState = {
  pokemonTeam: [],
  activeIndex: 0,
  bag: {},
  money: 3000,
  battlesWon: 0,
  totalBattles: 0,
};

const App = () => {
  const [phase, setPhase] = useState('start');
  const [player, setPlayer] = useState(initialPlayerState);
  const [messages, setMessages] = useState([]);
  const [battleState, setBattleState] = useState(null);
  const [battleMeta, setBattleMeta] = useState(null);

  const activePokemon = player.pokemonTeam[player.activeIndex] ?? null;

  const addMessages = (newMessages) => {
    if (!newMessages || newMessages.length === 0) {
      return;
    }
    setMessages((prev) => [...newMessages, ...prev].slice(0, 100));
  };

  const handleSelectStarter = (speciesId) => {
    const starter = new Pokemon(speciesId, 5);
    setPlayer({
      pokemonTeam: [starter],
      activeIndex: 0,
      bag: { potion: 5, pokeball: 5 },
      money: 3000,
      battlesWon: 0,
      totalBattles: 0,
    });
    addMessages([`你选择了 ${starter.name}！`, '获得了新手礼包：5个伤药和5个精灵球！']);
    setPhase('main');
  };

  const handleHealAll = () => {
    if (player.pokemonTeam.length === 0) return;
    setPlayer((prev) => ({
      ...prev,
      pokemonTeam: prev.pokemonTeam.map((pokemon) => {
        const healed = pokemon.clone();
        healed.fullHeal();
        return healed;
      }),
    }));
    addMessages(['所有的宝可梦都恢复到了满状态！']);
  };

  const handleSwitchPokemon = (index) => {
    if (index < 0 || index >= player.pokemonTeam.length) {
      return;
    }
    setPlayer((prev) => ({
      ...prev,
      activeIndex: index,
    }));
  };

  const handleStartBattle = (type) => {
    if (!activePokemon) {
      return;
    }

    const playerPokemon = activePokemon;
    let opponentPokemon;
    let trainer = null;

    if (type === 'trainer') {
      const trainerBattle = createTrainerBattle(playerPokemon.level);
      opponentPokemon = trainerBattle.pokemon;
      trainer = trainerBattle.trainer;
      addMessages([`训练家 ${trainer.name} 发起了挑战！`]);
    } else {
      opponentPokemon = createWildPokemon(playerPokemon.level);
      addMessages([`野生的 ${opponentPokemon.name} 出现了！`]);
    }

    const battle = createBattleState({
      playerPokemon,
      opponentPokemon,
      type,
      trainer,
    });

    setBattleMeta({
      type,
      playerIndex: player.activeIndex,
      trainer,
      opponent: opponentPokemon,
      resolved: false,
    });
    setBattleState(battle);
    setPhase('battle');
  };

  const finalizeBattle = (result) => {
    if (!battleMeta || battleMeta.resolved) {
      return;
    }

    let summary = [];
    setPlayer((prev) => {
      if (battleMeta.playerIndex >= prev.pokemonTeam.length) {
        return prev;
      }

      const team = prev.pokemonTeam.map((pokemon, idx) => {
        if (idx !== battleMeta.playerIndex) {
          return pokemon;
        }
        const updated = pokemon.clone();
        updated.currentHP = result.playerPokemon.currentHP;
        updated.statModifiers = { attack: 0, defense: 0 };
        return updated;
      });

      let { money, battlesWon, totalBattles } = prev;
      totalBattles += 1;
      const messagesList = [];
      const updatedActive = team[battleMeta.playerIndex];

      if (result.winner === 'player') {
        battlesWon += 1;
        const rewardMoney = battleMeta.type === 'trainer'
          ? 400 + battleMeta.opponent.level * 20
          : 100 + battleMeta.opponent.level * 10;
        const expGain = battleMeta.type === 'trainer'
          ? 30 + battleMeta.opponent.level * 8
          : 20 + battleMeta.opponent.level * 5;

        money += rewardMoney;
        const levelUps = updatedActive.gainExp(expGain);
        messagesList.push(`战斗胜利！获得了 ${rewardMoney} 金币和 ${expGain} 经验值。`);
        if (levelUps.length > 0) {
          levelUps.forEach((info) => {
            messagesList.push(`${updatedActive.name} 达到了 Lv.${info.level}！`);
          });
        }
        messagesList.push(...updatedActive.consumeNotifications());
      } else {
        messagesList.push('战斗失败了，再接再厉吧。');
      }

      summary = messagesList;
      return {
        ...prev,
        pokemonTeam: team,
        money,
        battlesWon,
        totalBattles,
      };
    });

    if (summary.length > 0) {
      addMessages(summary);
      setBattleState((prev) => (prev ? { ...prev, log: [...prev.log, ...summary] } : prev));
    }

    setBattleMeta((prevMeta) => (prevMeta ? { ...prevMeta, resolved: true } : prevMeta));
  };

  const handleMoveSelect = (moveId) => {
    setBattleState((prev) => {
      if (!prev) return prev;
      const next = executePlayerTurn(prev, moveId);
      if (next.finished && !prev.finished) {
        finalizeBattle(next);
      }
      return next;
    });
  };

  const handleRunAway = () => {
    if (!battleState) {
      return;
    }

    if (!battleState.finished) {
      let summary = [];
      setPlayer((prev) => {
        summary = ['你成功地逃离了战斗。'];
        return {
          ...prev,
          totalBattles: prev.totalBattles + 1,
        };
      });
      if (summary.length > 0) {
        addMessages(summary);
      }
    }

    setBattleState(null);
    setBattleMeta(null);
    setPhase('main');
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.confirm('确定要重置游戏吗？所有进度将被清除。')) {
      setPlayer(initialPlayerState);
      setMessages([]);
      setBattleState(null);
      setBattleMeta(null);
      setPhase('start');
    }
  };

  const mainContent = useMemo(() => {
    if (phase === 'start') {
      return <StarterSelection starters={STARTER_IDS} onSelect={handleSelectStarter} />;
    }
    if (phase === 'battle' && battleState) {
      return <BattleScreen battleState={battleState} onMoveSelect={handleMoveSelect} onRunAway={handleRunAway} />;
    }
    if (phase === 'main' && activePokemon) {
      return (
        <MainScreen
          player={player}
          activePokemon={activePokemon}
          onStartBattle={handleStartBattle}
          onHealAll={handleHealAll}
          onSwitchPokemon={handleSwitchPokemon}
          messages={messages}
        />
      );
    }
    return (
      <div className="flex-1 flex items-center justify-center text-white text-lg">
        还没有宝可梦，先去选择一个伙伴吧！
      </div>
    );
  }, [phase, battleState, player, activePokemon, messages]);

  return (
    <div id="game-container" className="h-screen w-screen flex flex-col bg-pokemon-bg overflow-hidden">
      <header className="bg-gray-800 text-white flex items-center justify-center relative shadow-lg flex-shrink-0 h-16 lg:h-20">
        <h1 className="text-lg lg:text-2xl font-bold">关都文字对战：初始冒险</h1>
        <button
          onClick={handleReset}
          className="absolute right-4 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-xl flex items-center justify-center transition-transform hover:scale-110"
          title="重置游戏"
        >
          ×
        </button>
      </header>
      <main id="game-main" className="flex-1 overflow-hidden relative">
        {mainContent}
      </main>
    </div>
  );
};

export default App;
