import { allTypes } from '../actions';
import { ArticleItem } from './types';
import { ARTICLES_PER_PAGE } from './constants';

export type State = {
  articles: ArticleItem[];
  articlesAvailable: number;
  error: string;
  hasMore: boolean;
};

const initialState: State = {
  articles: [],
  articlesAvailable: Infinity,
  error: '',
  hasMore: true
};

const fetchMoreNews = (state: State) => ({
  ...state,
  error: ''
});

const saveNews = (state: State, { articles, articlesAvailable }) => {
  const loadedPages = Math.floor(state.articles.length / ARTICLES_PER_PAGE);
  const totalPages = Math.ceil(articlesAvailable / ARTICLES_PER_PAGE);
  const hasMore = loadedPages < totalPages;
  return {
    ...state,
    articles: state.articles.concat(articles),
    articlesAvailable,
    error: '',
    hasMore
  };
};

const fetchFail = (state: State, { errorText }) => ({
  ...state,
  error: errorText
});

export const reducer = (state: State = initialState, action) => {
  switch (action.type) {
    case allTypes.FETCH_MORE_NEWS:
      return fetchMoreNews(state);
    case allTypes.SAVE_NEWS:
      return saveNews(state, action);
    case allTypes.FETCH_FAIL:
      return fetchFail(state, action);
    default:
      return state;
  }
};
