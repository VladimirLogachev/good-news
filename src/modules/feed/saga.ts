import axios, { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { env } from '../../environments/production';
import { parseError, takeFirst } from '../../utils/saga-utils';
import { allActions, allTypes } from '../actions';
import { ReduxState } from '../reducers';
import { ARTICLES_PER_PAGE } from './constants';
import { isValidDataset, transformArticle } from './functions';
import { ApiArticlesDataset } from './types';

function* fetchMoreNews() {
  try {
    const { articles, hasMore } = yield select((x: ReduxState) => x.feed);
    if (hasMore) {
      const loadedPages = Math.floor(articles.length / ARTICLES_PER_PAGE);
      const targetPage = loadedPages + 1;
      const res: AxiosResponse<ApiArticlesDataset> = yield call(
        axios.get,
        `${env.apiUrl}everything?sources=${env.sourceName}&language=en&page=${targetPage}&apiKey=${
          env.apiKey
        }`
      );
      if (!isValidDataset(res.data)) throw new Error('Api responded with an invalid dataset');
      const articlesAvailable = res.data.totalResults;
      const items = res.data.articles.map(transformArticle);
      yield put(allActions.saveNews(items, articlesAvailable));
    }
  } catch (e) {
    yield put(allActions.fetchFail(parseError(e)));
  }
}

export const saga = [takeFirst(allTypes.FETCH_MORE_NEWS, fetchMoreNews)];
