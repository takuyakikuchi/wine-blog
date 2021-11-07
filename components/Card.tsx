import dayjs from 'dayjs';
dayjs.extend(utc);
dayjs.extend(timezone);
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Link from 'next/link';
import styles from '@/styles/Home.module.scss';
import { Post } from '@/types/blog';

export default function Card({ post }: { post: Post }) {
  const tastingContents = (
    <>
      <p>生産者: {post.producer}</p>
      <p>生産国: {post.country}</p>
      <p>原産地呼称: {post.aoc}</p>
      <p>ヴィンテージ: {post.vintage}</p>
      <p>ぶどう品種: {post.grapes ? post.grapes.join(', ') : ''}</p>
    </>
  );

  return (
    <Link href={`/blog/${post.id}`}>
      <a className={styles.card}>
        <h2>{post.title}</h2>
        {post.blogType.includes('テイスティング') && tastingContents}
        <p>投稿日: {dayjs.utc(post.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</p>
      </a>
    </Link>
  );
}
