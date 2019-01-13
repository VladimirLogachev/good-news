import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActions } from '../../modules/actions';
import { ReduxState } from '../../modules/reducers';
import { Article } from '../Article/Article';
import * as InfiniteScroll from 'react-infinite-scroller';
import './Feed.css';

type Props = {
  fetchMoreNews: () => void;
  saveArticle: (string) => void;
  forgetArticle: (string) => void;
  feed: ReduxState['feed'];
};

class FeedComponent extends React.Component<Props> {
  componentWillMount() {
    this.props.fetchMoreNews();
  }

  render() {
    const {
      feed: { articles, articlesByTimestamp, error, hasMore, savedArticles },
      fetchMoreNews,
      saveArticle,
      forgetArticle
    } = this.props;
    const loader = <span>Loading good news...</span>;
    const feedEnd = <h3>The End</h3>;
    const articlesList = articlesByTimestamp
      .map(x => articles[x])
      .map(x => (
        <Article
          key={x.key}
          article={x}
          isSaved={savedArticles.hasOwnProperty(x.key)}
          onSave={saveArticle}
          onForget={forgetArticle}
        />
      ));
    return (
      <div>
        <InfiniteScroll
          loadMore={() => fetchMoreNews()}
          initialLoad={false}
          hasMore={hasMore}
          loader={loader}
        >
          {articlesList}
        </InfiniteScroll>
        {error.length !== 0 && `Sorry, ${error}`}
        {hasMore || feedEnd}
      </div>
    );
  }
}

const mapStateToProps = ({ feed }) => ({ feed });

const mapDispatchToProps = dispatch => {
  const { fetchMoreNews, saveArticle, forgetArticle } = allActions;
  return bindActionCreators({ fetchMoreNews, saveArticle, forgetArticle }, dispatch);
};

export const Feed = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedComponent);
