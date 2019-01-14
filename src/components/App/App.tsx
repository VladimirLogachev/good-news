import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Favorites } from '../Favorites/Favorites';
import { Feed } from '../Feed/Feed';
import { Menu } from '../Menu/Menu';
// import '../../../node_modules/normalize.css/normalize.css';
import '../../utils/btn.css';
import './App.css';

export const App = () => (
  <div className="app">
    <h1 className="title">Good News</h1>
    <Menu />
    <Switch>
      <Route exact path="/feed" component={Feed} />
      <Route exact path="/favorites" component={Favorites} />
      <Redirect to="/feed" />
    </Switch>
    <div className="credits">
      <span className="app-name">Good News</span>
      <span className="author">by Vladimir Logachev</span>
    </div>
    <div className="credits">
      <span className="author">
        Powered by{' '}
        <a className="attribution-link" href="https://newsapi.org" target="_blank">
          News API
        </a>
      </span>
    </div>
  </div>
);
