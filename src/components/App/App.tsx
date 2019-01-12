import * as React from 'react';
import './App.css';

export const App = () => (
  <div className="app">
    <h1 className="title">Good News</h1>
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
