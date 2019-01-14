/**
 * This module contains `Article`-specific helper functions
 */

import { DateTime } from 'luxon';
import { Dictionary, values } from '../../utils/functional';
import { ApiArticlesDataset, ArticleItem } from './types';

/**
 * Validate Article
 */
const isValidArticle = x =>
  x &&
  typeof x === 'object' &&
  typeof x.url === 'string' &&
  typeof x.urlToImage === 'string' &&
  typeof x.title === 'string' &&
  typeof x.description === 'string' &&
  typeof x.source === 'object' &&
  typeof x.source.name === 'string' &&
  typeof x.publishedAt === 'string';

/**
 * Validate API dataset (shallow)
 */
export const isValidDataset = (data: ApiArticlesDataset) =>
  data &&
  typeof data === 'object' &&
  typeof data.totalResults === 'number' &&
  data.totalResults >= 0 &&
  Array.isArray(data.articles);

/**
 * Parse/Filter API dataset. Throws an error!!! // TODO: refactor to Either monad
 */
export const parseDataset = (data: ApiArticlesDataset): ApiArticlesDataset => {
  if (isValidDataset(data)) {
    const newdata = { ...data, articles: data.articles.filter(isValidArticle) };
    // TODO: log: filter(x => !isValidArticle(x))
    if (newdata.articles.length === 0) throw new Error('Api responded with an invalid dataset');
    return newdata;
  } else {
    throw new Error('Api responded with an invalid dataset');
  }
};

/**
 * Convert API data to App's own format
 */
export const transformArticle = x => ({
  url: x.url,
  imageUrl: x.urlToImage,
  title: x.title,
  text: x.description,
  sourceName: x.source.name,
  publishedAt: DateTime.fromISO(x.publishedAt).toMillis(),
  key: x.url
});

/**
 * Specific helper for `Dictionary<ArticleItem>`
 */
export const getKeysSortedByTimestamp = (xs: Dictionary<ArticleItem>): string[] =>
  values(xs)
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .map(x => x.key);
