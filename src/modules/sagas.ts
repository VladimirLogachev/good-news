import { all } from 'redux-saga/effects';
import { saga as feed } from './feed/saga';

const allSagas = [...feed];

export function* sagas() {
  yield all(allSagas);
}
