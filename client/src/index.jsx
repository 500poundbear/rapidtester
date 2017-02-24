import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Main from './components/Main';

import { Router, Route, Link, hashHistory} from 'react-router';

import {createStore} from 'redux';
import {reducer} from './reducer';
import {Provider} from 'react-redux';

const store = createStore(reducer);
store.dispatch({type: 'LOAD_WORD',
  word: {
    'unicode': 'က',
    'romanisation': 'ga1',
    'meaning': 'hi',
    'path': '/clips/a.mp3'
  }
});

const routes = <Route component={App}>
  <Route path="/app" component={Main} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

/*
*/
