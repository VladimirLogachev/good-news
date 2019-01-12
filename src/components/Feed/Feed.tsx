import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Feed.css';
import { allActions } from '../../modules/actions';

class FeedComponent extends React.Component<any, any> {
  componentWillMount() {
    const { fetchMoreNews } = this.props;
    fetchMoreNews();
  }

  render() {
    const {
      feed: { isLoading, items, error },
      fetchMoreNews,
      saveNews
    } = this.props;
    const loader = <span>Loading more good news...</span>;
    const itemsList = items.map(JSON.stringify);
    return (
      <div>
        {isLoading ? loader : itemsList}
        {error.length && `Sorry, ${error}`}
        <a onClick={() => fetchMoreNews()}>fetchMoreNews</a>
        <a onClick={() => saveNews()}>saveNews</a>
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
