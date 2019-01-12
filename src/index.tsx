import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { App } from './components/App/App';
import { reducers } from './modules/reducers';

const store = createStore(reducers);
const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootElement
);
