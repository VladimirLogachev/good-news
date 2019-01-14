import * as React from 'react';
import './ArticleLoader.css';

export const ArticleLoader = () => {
  return (
    <div className="article-loader">
      <div className="article-image-loader" />
      <div className="article-title-loader" />
      <div className="article-text-loader" />
      <div className="article-meta-loader" />
    </div>
  );
};
