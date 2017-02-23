/*jshint esversion: 6 */
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {loadWord, next, increment} from '../src/core';

describe('Application Logic', () => {

  describe('loadBank', () => {

    it('adds a word object to the bank', () => {
      const state = Map({'bank': List()});
      const word = {
        'unicode': 'က',
        'romanisation': 'ga1',
        'meaning': 'hi',
        'path': '/clips/a.mp3'
      };
      const nextState = loadWord(state, word);

      expect(nextState).to.equal(Map({
        bank: List.of(
          Map.of('unicode', 'က', 'romanisation', 'ga1', 'meaning', 'hi',
            'path', '/clips/a.mp3', 'count', 0))
      }));
    });

  });

  describe('next', () => {

    it('picks the next question from the bank', () => {
      const state = Map({
        bank: List.of(
          Map.of('unicode', 'က', 'romanisation', 'ga1', 'meaning', 'hi',
            'path', '/clips/a.mp3', 'count', 0))
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        bank: List.of(
          Map.of('unicode', 'က', 'romanisation', 'ga1', 'meaning', 'hi',
            'path', '/clips/a.mp3', 'count', 0)),
        question: Map.of('unicode', 'က', 'romanisation', 'ga1', 'meaning',
          'hi', 'path', '/clips/a.mp3', 'count', 0)
      }));
    });
  });

  describe('increment count', () => {
    it('increments the count of the right word in the bank', () => {
      const state = Map({
        bank: List.of(
          Map.of('id', 1, 'count', 1),
          Map.of('id', 4, 'count', 2),
          Map.of('id', 6, 'count', 3)
        )
      });
      const nextState = increment(state, 4);

      expect(nextState).to.equal(Map({
        bank: List.of(
          Map.of('id', 1, 'count', 1),
          Map.of('id', 4, 'count', 3),
          Map.of('id', 6, 'count', 3)
        )}));
    });
  });
});
