import axios, { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { env } from '../../environments/env';
import { keys } from '../../utils/functional';
import { logger, parseError, takeFirst } from '../../utils/saga-utils';
import { allActions, allTypes } from '../actions';
import { ReduxState } from '../reducers';
import { ARTICLES_PER_PAGE } from './constants';
import { transformArticle } from './functions';
import { ApiArticlesDataset, apiArticlesDataset } from './types';

function* fetchMoreNews() {
  try {
    const { articles, hasMore } = yield select((x: ReduxState) => x.feed);
    if (hasMore) {
      const loadedPages = Math.ceil(keys(articles).length / ARTICLES_PER_PAGE);
      const targetPage = loadedPages + 1;
      logger('targetPage', targetPage);
      const url = `${env.API_URL}everything?sources=${
        env.SOURCE_NAME
      }&language=en&page=${targetPage}&apiKey=${env.API_KEY}`;

      const res: AxiosResponse<ApiArticlesDataset> = yield call(axios.get, url);
      const { articles: newArticles, totalResults: articlesAvailable } = apiArticlesDataset.check(res.data); // throws
      const items = newArticles.map(transformArticle);
      yield put(allActions.saveNews(items, articlesAvailable));
    }
  } catch (e) {
    // if api responded with an invalid data, tell about it in a human-readable way
    yield put(allActions.fetchFail(parseError(e)));
  }
}

export const saga = [takeFirst(allTypes.FETCH_MORE_NEWS, fetchMoreNews)];
