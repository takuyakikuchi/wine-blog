import dayjs from 'dayjs';
import { GetStaticProps, GetStaticPaths } from 'next';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { microcms } from '../../libs/microcms';
import styles from '../../styles/Blog.module.scss';
import { Post } from '../index';

interface Blog {
  contents: Post[];
}

export default function BlogId({ blog }: { blog: Post }) {
  if (!blog) {
    <DefaultErrorPage statusCode={404} />;
  }

  const { title, body, publishedAt } = blog;

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
          content={`${process.env.OGP_URL}/**${title}**.png?${process.env.OGP_PARAMS}`}
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
      blog: data,
      ...draftKey,
    },
  };
};
