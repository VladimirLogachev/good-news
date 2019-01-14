import { Dictionary, keys, omit, toDictionaryByProp } from '../../utils/functional';
import { allTypes } from '../actions';
import { getKeysSortedByTimestamp } from './functions';
import { ArticleItem, ArticleKey } from './types';

export type State = {
  articles: Dictionary<ArticleItem>;
  articlesByTimestamp: ArticleKey[];
  articlesAvailable: number;
  error: string;
  hasMore: boolean;
  savedArticles: Dictionary<ArticleItem>;
  savedArticlesByTimestamp: ArticleKey[];
};

const initialState: State = {
  articles: {},
  articlesByTimestamp: [],
  articlesAvailable: Infinity,
  error: '',
  hasMore: true,
  savedArticles: {},
  savedArticlesByTimestamp: []
};

const fetchMoreNews = (state: State) => ({
  ...state,
  error: ''
});

const saveNews = (state: State, { articles, articlesAvailable }) => {
  const newArticles: Dictionary<ArticleItem> = {
    ...state.articles,
    ...toDictionaryByProp('key')(articles)
  };
  const hasMore = keys(newArticles).length < articlesAvailable;
  return {
    ...state,
    articles: newArticles,
    articlesByTimestamp: getKeysSortedByTimestamp(newArticles),
    articlesAvailable,
    error: '',
    hasMore
  };
};

const fetchFail = (state: State, { errorText }) => ({
  ...state,
  error: errorText
});

const saveArticle = (state: State, { articleKey }) => {
  const savedArticles: Dictionary<ArticleItem> = {
    ...state.savedArticles,
    [articleKey]: state.articles[articleKey]
  };
  return {
    ...state,
    savedArticles,
    savedArticlesByTimestamp: getKeysSortedByTimestamp(savedArticles)
  };
};

const forgetArticle = (state: State, { articleKey }) => {
  const savedArticles = omit(articleKey)(state.savedArticles);
  return {
    ...state,
    savedArticles,
    savedArticlesByTimestamp: getKeysSortedByTimestamp(savedArticles)
  };
};

export const reducer = (state: State = initialState, action): State => {
  switch (action.type) {
    case allTypes.FETCH_MORE_NEWS:
      return fetchMoreNews(state);
    case allTypes.SAVE_NEWS:
      return saveNews(state, action);
    case allTypes.FETCH_FAIL:
      return fetchFail(state, action);
    case allTypes.SAVE_ARTICLE:
      return saveArticle(state, action);
    case allTypes.FORGET_ARTICLE:
      return forgetArticle(state, action);
    default:
      return state;
  }
};

export const cleanupOnSave = feedState => ({
  ...feedState,
  articles: {},
  articlesAvailable: 0,
  articlesByTimestamp: []
});

export const cleanupOnLoad = feedState => ({
  ...feedState,
  articles: {},
  articlesAvailable: Infinity,
  articlesByTimestamp: [],
  hasMore: true
});
