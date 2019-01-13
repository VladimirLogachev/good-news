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

export type ApiArticlesDataset = {
  totalResults: number;
  articles: {
    url: string;
    urlToImage: string;
    title: string;
    description: string;
    source: { name: string };
    publishedAt: string;
  }[];
  // and some more fields
};
