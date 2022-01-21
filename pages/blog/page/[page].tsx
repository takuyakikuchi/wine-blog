import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { microcms } from '@/libs/microcms';
import Home from '@/pages/index';
import { Blog, Post } from '@/types/blog';
import { PER_PAGE } from '@/utils/constants';

const parsePageParams = (page: string | string[] | undefined) => {
  if (typeof page === 'string') {
    return parseInt(page, 10);
  }
  return 1;
};

type Props = {
  blog: Post[];
  totalCount: number;
};

export default function BlogPageId({ blog, totalCount }: Props) {
  const router = useRouter();
  const { page } = router.query;
  return <Home blog={blog} totalCount={totalCount} currentPage={parsePageParams(page)} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Blog = await microcms.get({ endpoint: 'blog' });

  const pages = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const totalPages = Math.ceil(data.totalCount / PER_PAGE) || 1;

  const paths = pages(1, totalPages).map((page) => `/blog/page/${page}`);

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

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
