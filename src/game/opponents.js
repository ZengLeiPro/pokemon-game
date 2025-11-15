import Pokemon from './pokemon.js';
import { POKEMON_DATA } from './data.js';

const SPECIES_IDS = Object.keys(POKEMON_DATA);

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function createWildPokemon(playerLevel) {
  const candidate = randomChoice(SPECIES_IDS);
  const variance = Math.max(1, Math.floor(playerLevel * 0.2));
  const level = Math.max(2, playerLevel + Math.floor(Math.random() * (variance * 2 + 1)) - variance);
  return new Pokemon(candidate, Math.min(level, 50));
}

const TRAINER_CLASSES = ['短裤小子', '登山男', '捉虫少年', '空手道王'];
const TRAINER_NAMES = ['小刚', '小霞', '小蓝', '小绿', '阿笔'];

export function createTrainerBattle(playerLevel) {
  const trainer = {
    name: randomChoice(TRAINER_NAMES),
    trainerClass: randomChoice(TRAINER_CLASSES),
  };
  const pokemon = createWildPokemon(playerLevel + 1);
  return { trainer, pokemon };
}
