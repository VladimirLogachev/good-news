const fetchMoreNews = () => ({
  type: 'FETCH_MORE_NEWS'
});

const saveNews = () => ({
  type: 'SAVE_NEWS'
});

export const actions = {
  fetchMoreNews,
  saveNews
};
