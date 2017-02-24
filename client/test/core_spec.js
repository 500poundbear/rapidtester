/*jshint esversion: 6 */
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {loadWord,
        next,
        increment,
        toggle_romanisation,
        toggle_meaning,
        play_sound,
        stop_sound,
        set_goal,
        increment_corrects
        } from '../src/core';

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
        question: Map.of(
          'unicode', 'က',
          'romanisation', 'ga1',
          'meaning', 'hi',
          'path', '/clips/a.mp3',
          'count', 0,
          'romanisationShow', false)
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

  describe('toggles romanisation', () => {
    it('from off to on', () => {
      const state = Map({
        question: Map.of('romanisationShow', false)
      });

      const nextState = toggle_romanisation(state);

      expect(nextState).to.equal(Map({
        question: Map.of(
            'romanisationShow', true)
        }));
    });

    it('from on to off', () => {
      const state = Map({
        question: Map.of('romanisationShow', true)
      });

      const nextState = toggle_romanisation(state);

      expect(nextState).to.equal(Map({
        question: Map.of(
            'romanisationShow', false)
        }));
    });

    it('does nothing if there is no current question', () => {
      const state = Map({
        bank: List.of(
          Map.of('id', 1, 'count', 1),
          Map.of('id', 4, 'count', 2),
          Map.of('id', 6, 'count', 3)
        )
      });

      const nextState = toggle_romanisation(state);

      expect(nextState).to.equal(Map({
        bank: List.of(
          Map.of('id', 1, 'count', 1),
          Map.of('id', 4, 'count', 2),
          Map.of('id', 6, 'count', 3)
        )
      }));
    });
  });

  describe('configuration', () => {
    it('increases global correct count when config is not present', () => {
      const state = Map();
      const nextState = increment_corrects(state);
      expect(nextState).to.equal(Map({
        config: Map({'corrects': 1})
      }));
    });

    it('increases global correct count when config is present', () => {
      const state = Map({'config': Map({'corrects': 31})});
      const nextState = increment_corrects(state);
      expect(nextState).to.equal(Map({
        config: Map({'corrects': 32})
      }));
    });

    it('sets the number of goals when config is not present', () => {
      const state = Map();

      const nextState = set_goal(state, 382);

      expect(nextState).to.equal(Map({
        config: Map({goal: 382})
      }));
    });

    it('sets the number of goals when config is present', () => {
      const state = Map({config: Map()});

      const nextState = set_goal(state, 593);

      expect(nextState).to.equal(Map({
        config: Map({goal: 593})
      }));
    });
  });

  describe('signals clip playing status', () => {
    it('by reflecting that it is playing', () => {
      const state = Map({
        question: Map.of('playingClip', false)
      });

      const nextState = play_sound(state);

      expect(nextState).to.equal(Map({
        question: Map.of(
            'playingClip', true)
        }));
    });

    it('by reflecting that clip has stopped playing', () => {
      const state = Map({
        question: Map.of('playingClip', true)
      });

      const nextState = stop_sound(state);

      expect(nextState).to.equal(Map({
        question: Map.of(
            'playingClip', false)
        }));
    });


  });
  describe('toggles meaning', () => {
    it('from off to on', () => {
      const state = Map({
        question: Map.of('meaningShow', false)
      });

      const nextState = toggle_meaning(state);

      expect(nextState).to.equal(Map({
        question: Map.of(
            'meaningShow', true)
        }));
    });

    it('from on to off', () => {
      const state = Map({
        question: Map.of('meaningShow', true)
      });

      const nextState = toggle_meaning(state);

      expect(nextState).to.equal(Map({
        question: Map.of(
            'meaningShow', false)
        }));
    });

    it('does nothing if there is no current question', () => {
      const state = Map({
        bank: List.of(
          Map.of('id', 1, 'count', 1),
          Map.of('id', 4, 'count', 2),
          Map.of('id', 6, 'count', 3)
        )
      });

      const nextState = toggle_meaning(state);

      expect(nextState).to.equal(Map({
        bank: List.of(
          Map.of('id', 1, 'count', 1),
          Map.of('id', 4, 'count', 2),
          Map.of('id', 6, 'count', 3)
        )
      }));
    });
  });
});
