import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';
import { App } from './components/App/App';
import { configureStore } from './modules/store';

const { store, persistor } = configureStore();

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  rootElement
);
