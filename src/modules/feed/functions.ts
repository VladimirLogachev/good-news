/**
 * This module contains `Article`-specific helper functions
 */

import { DateTime } from 'luxon';
import { Dictionary, values } from '../../utils/functional';
import { ArticleItem } from './types';

/**
 * Convert API data to App's own format
 */
export const transformArticle = x => ({
  url: x.url,
  imageUrl: x.urlToImage || '', // fallback, because Api actually can respond with null
  title: x.title,
  text: x.description,
  sourceName: x.source.name,
  publishedAt: DateTime.fromISO(x.publishedAt).toMillis(),
  key: `${x.url}${x.publishedAt}${x.title}` // sometimes articles are repeating
});

/**
 * Specific helper for `Dictionary<ArticleItem>`
 */
export const getKeysSortedByTimestamp = (xs: Dictionary<ArticleItem>): string[] =>
  values(xs)
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .map(x => x.key);
