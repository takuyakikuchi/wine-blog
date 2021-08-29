import { GetStaticProps, GetStaticPaths } from 'next';
import { PER_PAGE } from '@/components/Pagination';
import { microcms } from '@/libs/microcms';
import Home from '@/pages/index';
import { Blog, Post } from '@/types/blog';

type Props = {
  blog: Post[];
  totalCount: number;
};

export default function BlogPageId({ blog, totalCount }: Props) {
  return <Home blog={blog} totalCount={totalCount} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Blog = await microcms.get({ endpoint: 'blog' });

  const pages = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const totalPages = Math.ceil(data.totalCount / PER_PAGE);

  const paths = pages(1, totalPages).map((page) => `/blog/page/${page}`);

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  console.log(params);

  const page = params?.page ? Number(params.page) : 1;

  const data: Blog = await microcms.get({
    endpoint: 'blog',
    queries: { offset: (page - 1) * PER_PAGE },
  });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};
