import { allTypes } from '../actions';

export type State = {
  isLoading: boolean;
  items: any[];
  error: string;
};

const initialState: State = {
  isLoading: false,
  items: [],
  error: ''
};

const fetchMoreNews = (state: State) => ({
  ...state,
  isLoading: true,
  error: ''
});

const saveNews = (state: State, { items }) => ({
  ...state,
  isLoading: false,
  items: state.items.concat(items),
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
