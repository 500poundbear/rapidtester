/*jshint esversion: 6 */
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {reducer} from '../src/reducer';

describe('Reducer', () => {

  it('appears to reduce correctly', () => {
    const actions = [
      {type: 'LOAD_BANK',
       word: {
          'unicode': 'က',
          'romanisation': 'ga1',
          'meaning': 'hi',
          'path': '/clips/a.mp3'
        }
      },
      {type: 'NEXT'},
      {type: 'INCREMENT', wid: 1},
      {type: 'NEXT'}
    ];

    const finalState = actions.reduce(reducer, Map({bank: List()}));

  });
});
