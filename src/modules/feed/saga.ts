import axios, { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { env } from '../../environments/production';
import { keys } from '../../utils/functional';
import { parseError, takeFirst } from '../../utils/saga-utils';
import { allActions, allTypes } from '../actions';
import { ReduxState } from '../reducers';
import { ARTICLES_PER_PAGE } from './constants';
import { parseDataset, transformArticle } from './functions';
import { ApiArticlesDataset } from './types';

function* fetchMoreNews() {
  try {
    const { articles, hasMore } = yield select((x: ReduxState) => x.feed);
    if (hasMore) {
      const loadedPages = Math.floor(keys(articles).length / ARTICLES_PER_PAGE);
      const targetPage = loadedPages + 1;
      const res: AxiosResponse<ApiArticlesDataset> = yield call(
        axios.get,
        `${env.apiUrl}everything?sources=${env.sourceName}&language=en&page=${targetPage}&apiKey=${
          env.apiKey
        }`
      );
      const validDataset = parseDataset(res.data); // throws
      const articlesAvailable = validDataset.totalResults;
      const items = validDataset.articles.map(transformArticle);
      yield put(allActions.saveNews(items, articlesAvailable));
    }
  } catch (e) {
    yield put(allActions.fetchFail(parseError(e)));
  }
}

export const saga = [takeFirst(allTypes.FETCH_MORE_NEWS, fetchMoreNews)];
