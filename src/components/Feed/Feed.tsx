import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActions } from '../../modules/actions';
import { ReduxState } from '../../modules/reducers';
import { Article } from '../Article/Article';
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
      feed: { isLoading, articles, error },
      fetchMoreNews
    } = this.props;
    const loader = <span>Loading more good news...</span>;
    const articlesList = articles.map(x => <Article key={x.url} {...x} />);
    const fetchBtn = <button onClick={e => fetchMoreNews()}>fetchMoreNews</button>;
    return (
      <div>
        {isLoading ? loader : articlesList}
        {error.length !== 0 && `Sorry, ${error}`}
        {isLoading || fetchBtn}
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
