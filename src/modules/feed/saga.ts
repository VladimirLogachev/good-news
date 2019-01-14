import axios, { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { env } from '../../environments/production';
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
      const url = `${env.apiUrl}everything?sources=${env.sourceName}&language=en&page=${targetPage}&apiKey=${
        env.apiKey
      }`;

      const res: AxiosResponse<ApiArticlesDataset> = yield call(axios.get, url);
      const { articles: newArticles, totalResults: articlesAvailable } = apiArticlesDataset.check(res.data); // throws
      const items = newArticles.map(transformArticle);
      yield put(allActions.saveNews(items, articlesAvailable));
    }
  } catch (e) {
    // check if api responded with invalid data
    yield put(allActions.fetchFail(parseError(e)));
  }
}

export const saga = [takeFirst(allTypes.FETCH_MORE_NEWS, fetchMoreNews)];
