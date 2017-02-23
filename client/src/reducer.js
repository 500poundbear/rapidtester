/*jshint esversion: 6 */
import {loadWord,
        next,
        increment,
        toggle_romanisation,
        toggle_meaning,
        play_sound,
        INITIAL_STATE} from './core';

export function reducer(state = INITIAL_STATE, action){
  switch (action.type) {
  case 'LOAD_BANK':
    return loadWord(state, action.word);
  case 'NEXT':
    return next(state);
  case 'INCREMENT':
    return increment(state, action.wid);
  case 'TOGGLE_ROMANISATION':
    return toggle_romanisation(state);
  case 'TOGGLE_MEANING':
    return toggle_meaning(state);
  case 'PLAY_SOUND':
    return play_sound(state);
  }
  return state;
}
