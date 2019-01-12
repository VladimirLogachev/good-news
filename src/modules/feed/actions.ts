import { ArticleItem } from './types';

export const types = {
  FETCH_MORE_NEWS: 'FETCH_MORE_NEWS',
  SAVE_NEWS: 'SAVE_NEWS',
  FETCH_FAIL: 'FETCH_FAIL'
};

const fetchMoreNews = () => ({
  type: types.FETCH_MORE_NEWS
});

const saveNews = (articles: ArticleItem[], articlesAvailable: number) => ({
  type: types.SAVE_NEWS,
  articles,
  articlesAvailable
});

const fetchFail = errorText => ({
  type: types.FETCH_FAIL,
  errorText
});

export const actions = {
  fetchMoreNews,
  saveNews,
  fetchFail
};
