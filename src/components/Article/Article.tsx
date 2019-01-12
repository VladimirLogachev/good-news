import { DateTime } from 'luxon';
import * as React from 'react';
import { ArticleItem } from '../../modules/feed/types';
import './Article.css';

export const Article = ({ url, imageUrl, title, text, sourceName, publishedAt }: ArticleItem) => (
  <div>
    <a href={url} target="_blank">
      <h3>{title}</h3>
    </a>
    <p>
      {sourceName}, {DateTime.fromMillis(publishedAt).toFormat('dd.LL.yyyy')} <button>save</button>
    </p>
    <a href={url} target="_blank">
      <img src={imageUrl} className="article-img" />
    </a>
    <p>{text}</p>
  </div>
);
