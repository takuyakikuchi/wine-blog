import dayjs from 'dayjs';
import { GetStaticProps, GetStaticPaths } from 'next';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { microcms } from '@/libs/microcms';
import styles from '@/styles/Blog.module.scss';
import { Post, Blog } from '@/types/blog';

const OGP_URL = 'https://og-image-takuyakikuchi.vercel.app';
const OGP_IMAGE_URL =
  'https://images.unsplash.com/photo-1548025396-689d647d00c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1734&q=80';

export default function BlogId({ post }: { post: Post }) {
  if (!post) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const { title, body, publishedAt } = post;

  return (
    <div className={styles.container}>
      <Head>
        <title>{title || 'タイトルなし'}</title>
        <meta name='description' content='Blog post' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@_takuyakikuchi' />
        <meta property='og:title' content='My Wine Blog' />
        <meta
          property='og:description'
          content={`${title}(${dayjs(publishedAt).format('YYYY-MM-DD')})`}
        />
        <meta
          property='twitter:image'
          content={`${OGP_URL}/**${title}**.png?theme=dark&md=1&fontSize=100px&background=${OGP_IMAGE_URL}`}
        />
      </Head>
      <main className={styles.main}>
        <h1>{title || 'タイトルなし'}</h1>
        {publishedAt && <p>{dayjs(publishedAt).format('YYYY-MM-DD')}</p>}
        <div
          dangerouslySetInnerHTML={{
            __html: `${body}`,
          }}
        />
      </main>
      <footer className={styles.footer}>
        <Link href='/'>Back to home</Link>
      </footer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Blog = await microcms.get({ endpoint: 'blog' });
  const paths = data.contents.map((post: Post) => `/blog/${post.id}`);
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params, previewData } = context;

  if (!params?.id) {
    throw new Error('Error: ID not found');
  }
  const id = params.id.toString();

  const isPreview = (item: any): item is { draftKey: string } => {
    return !!(item?.draftKey && typeof item.draftKey === 'string');
  };

  const draftKey = isPreview(previewData) ? { draftKey: previewData.draftKey } : {};

  const data = await microcms.get({ endpoint: 'blog', contentId: id, queries: draftKey });
  return {
    props: {
      post: data,
      ...draftKey,
    },
  };
};
