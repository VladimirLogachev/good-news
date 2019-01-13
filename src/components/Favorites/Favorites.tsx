import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActions } from '../../modules/actions';
import { ReduxState } from '../../modules/reducers';
import { Article } from '../Article/Article';
import './Favorites.css';

import { Link } from 'react-router-dom';

type Props = {
  saveArticle: (string) => void;
  forgetArticle: (string) => void;
  feed: ReduxState['feed'];
};

const FavoritesComponent = ({
  feed: { savedArticles, savedArticlesByTimestamp },
  saveArticle,
  forgetArticle
}: Props) => {
  const articlesList = savedArticlesByTimestamp
    .map(x => savedArticles[x])
    .map(x => (
      <Article
        key={x.key}
        article={x}
        isSaved={savedArticles.hasOwnProperty(x.key)}
        onSave={saveArticle}
        onForget={forgetArticle}
      />
    ));
  const noArticles = (
    <div>
      You don't have saved articles yet. <Link to="/">Pick some</Link>
    </div>
  );
  return <div>{articlesList.length !== 0 ? articlesList : noArticles}</div>;
};

const mapStateToProps = ({ feed }) => ({ feed });

const mapDispatchToProps = dispatch => {
  const { saveArticle, forgetArticle } = allActions;
  return bindActionCreators({ saveArticle, forgetArticle }, dispatch);
};

export const Favorites = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesComponent);
