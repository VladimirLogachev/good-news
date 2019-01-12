import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components/App/App';

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

render(
      <App />,
  rootElement
);
