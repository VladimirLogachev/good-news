import { ArticleItem } from './types';

export const types = {
  FETCH_MORE_NEWS: 'FETCH_MORE_NEWS',
  SAVE_NEWS: 'SAVE_NEWS',
  FETCH_FAIL: 'FETCH_FAIL',
  SAVE_ARTICLE: 'SAVE_ARTICLE',
  FORGET_ARTICLE: 'FORGET_ARTICLE'
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

const saveArticle = articleKey => ({
  type: types.SAVE_ARTICLE,
  articleKey
});

const forgetArticle = articleKey => ({
  type: types.FORGET_ARTICLE,
  articleKey
});

export const actions = {
  fetchMoreNews,
  saveNews,
  fetchFail,
  saveArticle,
  forgetArticle
};
