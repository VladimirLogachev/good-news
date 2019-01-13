type Miliseconds = number;

export type ArticleItem = {
  url: string;
  imageUrl: string;
  title: string;
  text: string;
  sourceName: string;
  publishedAt: Miliseconds;
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
