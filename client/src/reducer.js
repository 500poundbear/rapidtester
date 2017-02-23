/*jshint esversion: 6 */
import {loadWord, next, increment, INITIAL_STATE} from './core';

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOAD_BANK':
    return loadWord(state, action.word);
  case 'NEXT':
    return next(state);
  case 'INCREMENT':
    return increment(state, action.wid);
  }
  return state;
}
