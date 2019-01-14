import { Array, Null, Number, Record, Static, String } from 'runtypes';

/**
 * Api types and validations, should be validated
 */

const apiSingleArticle = Record({
  url: String,
  urlToImage: String.Or(Null),
  title: String,
  description: String,
  source: Record({ name: String }),
  publishedAt: String
});

export const apiArticlesDataset = Record({
  totalResults: Number.withConstraint(x => x >= 0),
  articles: Array(apiSingleArticle)
});

export type ApiArticlesDataset = Static<typeof apiArticlesDataset>;

/**
 * App internal types, should not be validated
 */

type Miliseconds = number;

export type ArticleKey = string;

export type ArticleItem = {
  url: string;
  imageUrl: string;
  title: string;
  text: string;
  sourceName: string;
  publishedAt: Miliseconds;
  key: ArticleKey; // could be a hash, but for now it's just url
};
