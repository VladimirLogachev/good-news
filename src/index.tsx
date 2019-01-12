import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { App } from './components/App/App';
import { reducers } from './modules/reducers';
import { sagas } from './modules/sagas';

import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware);
const store = createStore(reducers, enhancer);
sagaMiddleware.run(sagas);

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
