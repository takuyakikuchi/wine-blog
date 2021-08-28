import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { microcms } from '../libs/microcms';

import styles from '../styles/Home.module.scss';

export interface Post {
  aoc?: string;
  blogType: Array<string>;
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

export default function Home({ blog }: { blog: Post[] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Wine Blog</title>
        <meta name='description' content='My wine blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>My Wine Blog</h1>

        <p className={styles.description}>
          I write a blog to record tasting comments and some learnings about wine!
        </p>

        <div className={styles.grid}>
          {blog.map((post: Post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <a className={styles.card}>
                <h2>{post.title}</h2>
                <p>生産者: {post.producer}</p>
                <p>生産国: {post.country}</p>
                <p>原産地呼称: {post.aoc}</p>
                <p>ヴィンテージ: {post.vintage}</p>
                <p>ぶどう品種: {post.grapes}</p>
                <p>投稿日: {dayjs.utc(post.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <span>
          Maintained by
          <a href='https://twitter.com/_takuyakikuchi' target='_blank' rel='noopener noreferrer'>
            <span className={styles.twitterAccount}>@_takuyakikuchi</span>
            <Image src='/twitter.svg' alt='Twitter Logo' width={16} height={16} />
          </a>
        </span>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const data: { contents: Post[] } = await microcms.get({ endpoint: 'blog' });

  return {
    props: {
      blog: data.contents,
    },
  };
};
