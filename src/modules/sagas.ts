import { all } from 'redux-saga/effects';

const allSagas = [];

export function* sagas() {
  yield all(allSagas);
}
