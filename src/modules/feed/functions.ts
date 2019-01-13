import { DateTime } from 'luxon';
import { ApiArticlesDataset } from './types';

/**
 * Validate Article
 */
const isValidArticle = x => x && typeof x === 'object' && typeof x.url === 'string';

/**
 * Validate API dataset
 */
export const isValidDataset = (data: ApiArticlesDataset) =>
  data &&
  typeof data === 'object' &&
  typeof data.totalResults === 'number' &&
  data.totalResults >= 0 &&
  Array.isArray(data.articles) &&
  data.articles.every(isValidArticle);

/**
 * Convert API data to App's own format
 */
export const transformArticle = x => ({
  url: x.url,
  imageUrl: x.urlToImage,
  title: x.title,
  text: x.description,
  sourceName: x.source.name,
  publishedAt: DateTime.fromISO(x.publishedAt).toMillis()
});
