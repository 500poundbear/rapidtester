import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Main from './components/Main';

import { Router, Route, Link, hashHistory} from 'react-router';

const routes = <Route component={App}>
  <Route path="/app" component={Main} />
</Route>;

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('app')
);

/*
*/
