import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActions } from '../../modules/actions';
import { ReduxState } from '../../modules/reducers';
import { Article } from '../Article/Article';
import * as InfiniteScroll from 'react-infinite-scroller';
import './Feed.css';

type State = {
  fetchMoreNews: Function;
  feed: ReduxState['feed'];
};

class FeedComponent extends React.Component<State> {
  componentWillMount() {
    this.props.fetchMoreNews();
  }

  render() {
    const {
      feed: { articles, error, hasMore },
      fetchMoreNews
    } = this.props;
    const loader = <span>Loading good news...</span>;
    const articlesList = articles.map(x => <Article key={x.url + x.publishedAt} {...x} />);
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
      </div>
    );
  }
}

const mapStateToProps = ({ feed }) => ({ feed });

const mapDispatchToProps = dispatch => {
  const { fetchMoreNews, saveNews } = allActions;
  return bindActionCreators({ fetchMoreNews, saveNews }, dispatch);
};

export const Feed = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedComponent);
