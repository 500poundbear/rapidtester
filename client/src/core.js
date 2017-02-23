/*jshint esversion: 6 */
import {List, Map, fromJS} from 'immutable';
export function loadWord(state, wordObject) {

  const wordMap = fromJS(wordObject).merge({count: 0});
  const bank = state.get('bank');
  const newBank = bank.push(wordMap);

  return state.set("bank", newBank);
}

export function next(state) {
  // Pick the next question to put into question
  // For now, randomly select
  const bank = state.get("bank");
  const bankSize = bank.size;

  const index = Math.floor(Math.random() * bankSize);
  return state.set("question", bank.get(index).merge({romanisationShow:false}));
}

export function increment(state, wordId) {
  const bank = state.get("bank");
  const newBank = bank.map(word => {
    if (word.get('id') === wordId) {
      const wordCount = word.get('count');
      return word.set('count', wordCount + 1);
    }
    return word;
  });
  return state.set('bank', newBank);
}

export function toggle_romanisation(state) {
  const question = state.get('question');
  if (!question) return state;

  const romanisationState = question.get('romanisationShow') || false;
  const newQuestion = question.set('romanisationShow', !romanisationState);
  return state.set('question', newQuestion);
}

export const INITIAL_STATE = Map({bank: List()});
