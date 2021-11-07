import dayjs from 'dayjs';
dayjs.extend(utc);
dayjs.extend(timezone);
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Card from '@/components/card/Card';
import { Pagination } from '@/components/pagination/Pagination';
import { microcms } from '@/libs/microcms';
import styles from '@/styles/Home.module.scss';
import { Blog, Post } from '@/types/blog';

type Props = {
  blog: Post[];
  currentPage?: number;
  totalCount: number;
};

export default function Home({ blog, currentPage = 1, totalCount }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Wine Blog</title>
        <meta name='description' content='My wine blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Header />

        <div className={styles.grid}>
          {blog && blog.map((post: Post) => <Card key={post.id} post={post} />)}
        </div>

        <Pagination currentPage={currentPage} totalCount={totalCount} />
      </main>

      <Footer />
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
