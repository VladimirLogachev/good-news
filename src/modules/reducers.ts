import { combineReducers } from 'redux';
import { reducer as feed, State as feedState } from './feed/reducer';

export type ReduxState = {
  feed: feedState;
};

export const reducers = combineReducers({
  feed
});
