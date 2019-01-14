import { call, fork, take } from 'redux-saga/effects';
import { env } from '../environments/production';

/**
 * Performs any other tasks only after existing one is finished
 */
export function* takeFirst(pattern, saga, ...args) {
  function* takeFirstInternal() {
    while (true) {
      const action = yield take(pattern);
      yield call(saga, [...args.concat(action)]);
    }
  }
  return yield fork(takeFirstInternal);
}

/**
 * Specific error handling for Axios
 */
export const parseError = error => {
  if (error.response) {
    return error.response.data.message;
  } else if (error.request) {
    return 'There are network issues';
  }
  return error.message;
};

/**
 * Specific error handling for Axios
 */
export const logger = (...args) => {
  // TODO: there could also be remote logging
  if (env.allowConsoleOutput) {
    console.log(...args);
  }
};
