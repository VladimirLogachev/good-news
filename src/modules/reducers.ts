import { combineReducers } from 'redux';
import { reducer as feed } from './feed/reducer';

export const reducers = combineReducers({
  feed
});
