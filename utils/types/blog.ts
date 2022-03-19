export interface Blog {
  contents: Post[];
  totalCount: number;
}

export interface Post {
  aoc?: string;
  body: string;
  country?: Array<string>;
  createdAt: Date;
  grapes?: Array<string>;
  id: string;
  producer?: string;
  publishedAt: Date;
  revisedAt: Date;
  title: string;
  updatedAt: Date;
  vintage?: number;
  wineType?: Array<string>;
}
