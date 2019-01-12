import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { allActions, allTypes } from '../actions';
import { ReduxState } from '../reducers';

const parseError = error => {
  if (error.response) {
    return error.response.data.message;
  } else if (error.request) {
    return 'Network issues';
  }
  return error.message;
};

function* fetchMoreNews() {
  try {
    const itemsCount = yield select((x: ReduxState) => x.feed.items.length);
    console.log({ itemsCount });
    const res = yield call(
      axios.get,
      'https://newsapi.org/v2/everything?q=moscow&page=3&apiKey=5220b894cc974ddd9105b4f810a15728'
    );

    // validate
    // transform
    const totalResults = res.data.totalResults;
    const items = res.data.articles.map(x => x);
    if (items.length == 0) throw new Error('there are too few articles');
    yield put(allActions.saveNews(items));
  } catch (e) {
    yield put(allActions.fetchFail(parseError(e)));
  }
}

export const saga = [takeLatest(allTypes.FETCH_MORE_NEWS, fetchMoreNews)];
