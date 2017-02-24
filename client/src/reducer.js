/*jshint esversion: 6 */
import {loadWord,
        next,
        increment,
        toggle_romanisation,
        toggle_meaning,
        play_sound,
        stop_sound,
        set_goal,
        increment_corrects,
        increment_attempts,
        INITIAL_STATE
       } from './core';

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
  case 'STOP_SOUND':
    return stop_sound(state);
  case 'SET_GOAL':
    return set_goal(state, action.goal);
  case 'INCREMENT_CORRECTS':
    return increment_corrects(state);
  case 'INCREMENT_ATTEMPTS':
    return increment_attempts(state);
  }
  return state;
}
