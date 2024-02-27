import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from '../reducer/reducer';

export const store = createStore(
  combineReducers,
  applyMiddleware(thunk)
);
