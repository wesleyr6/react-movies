/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Routers from './routers';
import './assets/styles/main.sass';

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,

  document.getElementById('root'),
);
