import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {MainContainer} from './components/Main';

import { Router, Route, Link, hashHistory} from 'react-router';

import {createStore} from 'redux';
import {reducer} from './reducer';
import {Provider} from 'react-redux';

const store = createStore(reducer);
store.dispatch({type: 'LOAD_WORD',
  word: {
    'unicode': 'fက',
    'romanisation': 'ga1',
    'meaning': 'catfish',
    'path': '/clips/a.mp3'
  }
});
store.dispatch({type: 'NEXT'});
console.log(store.getState());
const routes = <Route component={App}>
  <Route path="/app" component={MainContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

/*
*/
