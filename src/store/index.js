import * as reducers from './reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import * as API from '../js/api';

const reducer = combineReducers(reducers);
const composeEnhancers = composeWithDevTools;

export function configureStore (config) {
  const store = createStore(reducer, config, composeEnhancers(applyMiddleware(reduxThunk.withExtraArgument(API))));
  return store;
};