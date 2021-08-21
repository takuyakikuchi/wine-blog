import dayjs from 'dayjs';
import { client } from '../libs/client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

// Todo: update type
export default function Home({ blog }: any) {
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
          {/* Todo: update type */}
          {blog.map((post: any) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <a className={styles.card}>
                <h2>{post.title}</h2>
                <p>生産者: {post.producer}</p>
                <p>生産国: {post.country}</p>
                <p>原産地呼称: {post.aoc}</p>
                <p>ヴィンテージ: {post.vintage}</p>
                <p>ぶどう品種: {post.grapes}</p>
                <p>投稿日: {dayjs(post.publishedAt).format('YYYY-MM-DD')}</p>
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
  // Todo: type should be changed
  const data: any = await client.get({ endpoint: 'blog' });

  return {
    props: {
      blog: data.contents,
    },
  };
};
