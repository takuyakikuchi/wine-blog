import dayjs from 'dayjs';
dayjs.extend(utc);
dayjs.extend(timezone);
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Pagination } from '../components/Pagination';
import { microcms } from '../libs/microcms';
import styles from '../styles/Home.module.scss';
import { Blog, Post } from '../types/blog';

type Props = {
  blog: Post[];
  totalCount: number;
};

export default function Home({ blog, totalCount }: Props) {
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

        <Pagination totalCount={totalCount} />
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

export const getStaticProps: GetStaticProps = async () => {
  const data: Blog = await microcms.get({ endpoint: 'blog' });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};
