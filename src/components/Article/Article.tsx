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
  const saveBtn = <button onClick={() => onSave(key)}>save</button>;
  const forgetBtn = <button onClick={() => onForget(key)}>forget</button>;
  return (
    <div>
      <a href={url} target="_blank">
        <h3>{title}</h3>
      </a>
      <p>
        {sourceName}, {DateTime.fromMillis(publishedAt).toFormat('dd.LL.yyyy')}{' '}
        {isSaved ? forgetBtn : saveBtn}
      </p>
      <a href={url} target="_blank">
        <img src={imageUrl} className="article-img" />
      </a>
      <p>{text}</p>
    </div>
  );
};
