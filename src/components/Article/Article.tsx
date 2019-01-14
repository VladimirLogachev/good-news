import { DateTime } from 'luxon';
import * as React from 'react';
import { ArticleItem } from '../../modules/feed/types';
import './Article.css';

type Props = {
  article: ArticleItem;
  isSaved: boolean;
  onSave: (string) => void;
  onForget: (string) => void;
};

export const Article = ({
  article: { url, imageUrl, title, text, sourceName, publishedAt, key },
  isSaved,
  onSave,
  onForget
}: Props) => {
  const saveBtn = (
    <button className="btn btn-ok" onClick={() => onSave(key)}>
      Save
    </button>
  );
  const forgetBtn = (
    <button className="btn btn-neutral" onClick={() => onForget(key)}>
      Forget
    </button>
  );
  return (
    <div className="article">
      <a href={url} target="_blank">
        <img src={imageUrl} className="article-img" />
        <h3 className="article-title">{title}</h3>
        <p className="article-text">{text}</p>
      </a>
      <div>
        <span className="article-meta">
          {sourceName}, {DateTime.fromMillis(publishedAt).toFormat('dd.LL.yyyy')}
        </span>
        {isSaved ? forgetBtn : saveBtn}
      </div>
    </div>
  );
};
