import { allTypes } from '../actions';
import { ArticleItem } from './types';

export type State = {
  isLoading: boolean;
  articles: ArticleItem[];
  articlesAvailable: number;
  error: string;
};

const initialState: State = {
  isLoading: false,
  articles: [],
  articlesAvailable: Infinity,
  error: ''
};

const fetchMoreNews = (state: State) => ({
  ...state,
  isLoading: true,
  error: ''
});

const saveNews = (state: State, { articles, articlesAvailable }) => ({
  ...state,
  isLoading: false,
  articles: state.articles.concat(articles),
  articlesAvailable,
  error: ''
});

const fetchFail = (state: State, { errorText }) => ({
  ...state,
  isLoading: false,
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
