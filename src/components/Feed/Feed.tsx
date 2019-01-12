import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Feed.css';
import { allActions } from '../../modules/actions';

const FeedComponent = ({ feed, fetchMoreNews, saveNews }) => (
  <div>
    {JSON.stringify(feed)}
    <a onClick={() => fetchMoreNews()}>fetchMoreNews</a>
    <a onClick={() => saveNews()}>saveNews</a>
  </div>
);

const mapStateToProps = ({ feed }) => ({ feed });

const mapDispatchToProps = dispatch => {
  const { fetchMoreNews, saveNews } = allActions;
  return bindActionCreators({ fetchMoreNews, saveNews }, dispatch);
};

export const Feed = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedComponent);
