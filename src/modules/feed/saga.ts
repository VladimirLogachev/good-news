import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { allActions, allTypes } from '../actions';
import { ReduxState } from '../reducers';
import { DateTime } from 'luxon';

const parseError = error => {
  if (error.response) {
    return error.response.data.message;
  } else if (error.request) {
    return 'There are network issues';
  }
  return error.message;
};

const apiKey = '5220b894cc974ddd9105b4f810a15728'; // store as env variable

function* fetchMoreNews() {
  try {
    const { articles, articlesAvailable } = yield select((x: ReduxState) => x.feed);
    const loadedPages = Math.floor(articles.length / 20);
    const totalPages = Math.ceil(articlesAvailable / 20);
    if (loadedPages < totalPages) {
      const targetPage = loadedPages + 1;
      const res = yield call(
        axios.get,
        `https://newsapi.org/v2/everything?sources=wired&language=en&page=${targetPage}&apiKey=${apiKey}`
      );

      // validate
      const articlesAvailable = res.data.totalResults;
      const items = res.data.articles.map(x => ({
        url: x.url,
        imageUrl: x.urlToImage,
        title: x.title,
        text: x.description,
        sourceName: x.source.name,
        publishedAt: DateTime.fromISO(x.publishedAt).toMillis()
      }));
      if (items.length == 0) throw new Error('there are too few articles');
      yield put(allActions.saveNews(items, articlesAvailable));
    }
  } catch (e) {
    yield put(allActions.fetchFail(parseError(e)));
  }
}

export const saga = [takeLatest(allTypes.FETCH_MORE_NEWS, fetchMoreNews)];
