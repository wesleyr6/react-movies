/* global window */
/* eslint-disable no-underscore-dangle */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';
import { env } from '../config/variables';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function getStore() {
  if (env.REACT_APP_ENV !== 'production') {
    return createStore(reducers, composeEnhancers(applyMiddleware(thunk, logger)));
  }

  return createStore(reducers, compose(applyMiddleware(thunk)));
}

export const store = getStore();

export default store;